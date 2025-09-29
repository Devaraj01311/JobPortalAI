const express = require('express');
const router = express.Router();
const { getJobs, applyJob ,getApplications } = require('../controllers/jobController');
const authenticate = require('../middleware/authMiddleware');


// Get all jobs (internal + external)
router.get('/', authenticate, getJobs);

//  Apply for a job (manual)
router.post('/apply/:jobId', authenticate, applyJob);

// Get ALL applications (manual + auto-applied)
router.get('/applications', authenticate, getApplications );
module.exports = router;
