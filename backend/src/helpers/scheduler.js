const cron = require('node-cron');
const User = require('../models/user');
const { autoApplyJobs } = require('../controllers/jobController');

cron.schedule('0 8 * * *', async () => { 
  try {
    const users = await User.find();
    for (const user of users) {
      await autoApplyJobs(user);
    }
    console.log('Daily auto-apply completed for all users');
  } catch (err) {
    console.error('Error in daily auto-apply:', err);
  }
});
