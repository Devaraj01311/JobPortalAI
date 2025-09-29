const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Job = require("../models/jobs");
const User = require('../models/user');
const JobApplication = require('../models/jobApplication'); 
const { parseResume } = require('../helpers/resumeParser');
const { sendAutoApplyReportEmail, sendJobApplicationEmail } = require('../helpers/jobsEmail');

const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;
const ADZUNA_BASE_URL = process.env.ADZUNA_BASE_URL;

// Utility: delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Retry handler
const fetchWithRetry = async (url, params, retries = 3, delayMs = 1000) => {
  try {
    const response = await axios.get(url, { params });
    return response.data.results;
  } catch (err) {
    if (err.response && err.response.status === 429 && retries > 0) {
      console.warn(`Rate limit hit. Retrying after ${delayMs} ms...`);
      await delay(delayMs);
      return fetchWithRetry(url, params, retries - 1, delayMs * 2);
    }
    console.error(`Error fetching data: ${err.message}`);
    return [];
  }
};

// Extract skills
const extractSkillsFromResume = (resumeText) => {
  if (!resumeText) return [];
  const skillsList = ['node.js', 'express', 'react', 'mongodb', 'python', 'java', 'html', 'css'];
  const lowerText = resumeText.toLowerCase();
  return skillsList.filter(skill => lowerText.includes(skill));
};

// GET jobs
const getJobs = async (req, res) => {
  try {
    const user = req.user;
    const internalJobs = await Job.find();
    let externalJobs = [];

    if (user.resume) {
      const resumeText = await parseResume(user.resume); 
      const skills = extractSkillsFromResume(resumeText);
      const results = [];

      for (const skill of skills) {
        for (const page of [1,2]) {
          const params = { app_id: ADZUNA_APP_ID, app_key: ADZUNA_APP_KEY, what: skill };
          const jobsData = await fetchWithRetry(`${ADZUNA_BASE_URL}/search/${page}`, params);

          const jobs = await Promise.all(jobsData.map(async jobData => {
            let job = await Job.findOne({ externalId: jobData.id });
            if (!job) {
              job = await new Job({
                externalId: jobData.id,
                title: jobData.title || "Untitled Job",
                company: jobData.company?.display_name || "Not specified",
                description: jobData.description || "No description",
                location: jobData.location?.display_name || "Remote",
                url: jobData.redirect_url,
                source: "external",
                created: jobData.created,
                appliedUsers: []
              }).save();
            }
            return {
              externalId: job.externalId,
              title: job.title,
              company: job.company,
              location: job.location || jobData.location?.display_name || "Remote",
              description: job.description,
              url: job.url || jobData.redirect_url,
              source: "external",
              created: job.created || jobData.created
            };
          }));

          results.push(...jobs);
          await delay(1000);
        }
      }

      // Remove duplicates
      const seen = new Set();
      externalJobs = results.filter(job => {
        if (seen.has(job.externalId)) return false;
        seen.add(job.externalId);
        return true;
      });
    }

    const allJobs = [
      ...internalJobs.map(job => ({ ...job.toObject(), source: 'internal' })),
      ...externalJobs
    ];

    allJobs.sort((a, b) => new Date(b.created || b.createdAt) - new Date(a.created || a.createdAt));
    res.json(allJobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// APPLY to job
const applyJob = async (req, res) => {
  try {
    const jobId = req.params.jobId.trim();
    let job;

    if (mongoose.Types.ObjectId.isValid(jobId)) job = await Job.findById(jobId);
    if (!job) job = await Job.findOne({ externalId: jobId });
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (!job.appliedUsers.includes(req.user._id)) {
      job.appliedUsers.push(req.user._id);
      await job.save();
      await JobApplication.create({ user: req.user._id, job: job._id });
      await sendJobApplicationEmail(req.user, job);
    }

    res.json({ message: `Applied to ${job.title}` });
  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// AUTO-APPLY jobs
const autoApplyJobs = async (user) => {
  try {
    if (!user.resume) return;
    const resumeText = await parseResume(user.resume);
    const skills = extractSkillsFromResume(resumeText);
    if (skills.length === 0) return;

    const appliedJobsList = [];

    for (const skill of skills) {
      for (const page of [1,2]) {
        const params = { app_id: ADZUNA_APP_ID, app_key: ADZUNA_APP_KEY, what: skill };
        const jobsData = await fetchWithRetry(`${ADZUNA_BASE_URL}/search/${page}`, params);

        for (const jobData of jobsData) {
          const jobObj = {
            externalId: jobData.id,
            title: jobData.title || "Untitled Job",
            company: jobData.company?.display_name || "Not specified",
            location: jobData.location?.display_name || "Remote",
            description: jobData.description || "No description",
            url: jobData.redirect_url,
            source: "external",
            created: jobData.created
          };

          let job = await Job.findOne({ externalId: jobObj.externalId });
          if (!job) {
            job = new Job({ ...jobObj, appliedUsers: [user._id] });
            await job.save();
            appliedJobsList.push(jobObj);
            await JobApplication.create({ user: user._id, job: job._id });
          } else if (!job.appliedUsers.includes(user._id)) {
            job.appliedUsers.push(user._id);
            await job.save();
            appliedJobsList.push(jobObj);
            await JobApplication.create({ user: user._id, job: job._id });
          }
        }

        await delay(1000);
      }
    }

    if (appliedJobsList.length > 0) {
      await sendAutoApplyReportEmail(user, appliedJobsList);
    }
  } catch (err) {
    console.error("Error in autoApplyJobs:", err);
  }
};


// Get all applications (manual + auto-applied)
const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ user: req.user._id })
      .populate("job");

    // Map applications to include job info + application source
    const jobs = applications
      .map(app => {
        if (!app.job) return null;
        return {
          _id: app.job._id,
          title: app.job.title,
          company: app.job.company,
          location: app.job.location,
          description: app.job.description,
          url: app.job.url,
          source: app.source,   
          appliedAt: app.appliedAt,
        };
      })
      .filter(j => j !== null);

    // Sort by applied date descending
    jobs.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

    res.json(jobs);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getJobs, applyJob, autoApplyJobs, getApplications };


