const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    default: "Untitled Job"
  },
  company: { 
    type: String, 
    required: true,
    default: "Not specified"
  },
  description: { 
    type: String, 
    required: true,
    default: "No description available"
  },
  location: { 
    type: String, 
    default: "Remote"
  },
  url: { 
    type: String 
  },
  source: { 
    type: String,
    default: 'internal' 
  },
  created: { 
    type: Date,
    default: Date.now
  },
  appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  externalId: { 
    type: String, 
    unique: true,
    sparse: true 
  }
});

module.exports = mongoose.model('Job', jobSchema);
