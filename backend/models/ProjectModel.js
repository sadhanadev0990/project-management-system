const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A project must have a name'],
    unique: true,
  },
  title: {
    type: String,
    require: [true, 'A project must have a title'],
  },
  description: {
    type: String,
    require: [true, 'A project must have a description'],
  },
  stage: {
    type: String,
    require: [true, 'A project must have a stage'],
  },
  status: {
    type: String,
    require: [true, 'A project must have a status'],
  },
  startDate: {
    type: Date,
    require: [true, 'A project must have a start date'],
  },
  endDate: {
    type: Date,
    require: [true, 'A project must have a end date'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;