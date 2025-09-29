
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  appliedAt: { type: Date, default: Date.now },
  source: { type: String, enum: ['internal', 'external'], default: 'internal' }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
