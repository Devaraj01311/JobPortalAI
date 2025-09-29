
const { sendMail } = require('./Email')

const sendJobApplicationEmail = async (user, job) => {
  try {
    const html = `<h3>Job Application Confirmation</h3>
                  <p>Hello ${user.name},</p>
                  <p>You have successfully applied to the following job:</p>
                  <p><strong>${job.title}</strong> at <strong>${job.company}</strong></p>
                  <p><a href="${job.url || '#'}" target="_blank">View Job Details</a></p>`;
    await sendMail(user.email, 'Job Application Confirmation', html);
    console.log(`Email sent to ${user.email} for job ${job.title}`);
  } catch (error) {
    console.error(`Failed to send email to ${user.email}:`, error.message);
  }
};

const sendAutoApplyReportEmail = async (user, appliedJobsList) => {
  try {
    const jobLinks = appliedJobsList.map(j => `<li><a href="${j.url}" target="_blank">${j.title} at ${j.company}</a></li>`).join('');
    const html = `<h3>Auto-applied Jobs Report</h3>
                  <p>Hello ${user.name},</p>
                  <p>Your account auto-applied to the following jobs today:</p>
                  <ul>${jobLinks}</ul>`;
    await sendMail(user.email, 'Daily Auto-Apply Jobs Report', html);
    console.log(`Auto-apply report sent to ${user.email}`);
  } catch (error) {
    console.error(`Failed to send auto-apply report to ${user.email}:`, error.message);
  }
};

module.exports = { sendJobApplicationEmail, sendAutoApplyReportEmail };
