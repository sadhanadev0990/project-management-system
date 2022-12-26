const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'A project must have a title'],
  },
  description: {
    type: String,
    required: [true, 'A project must have a description'],
  },
  stage: {
    type: String,
    required: [true, 'A project must have a stage'],
  },
  status: {
    type: String,
    required: [true, 'A project must have a status'],
  },
  teamCount: {
    type: Number,
    required: [true, 'A project must have a team count'],
  },
  dueDate: {
    type: Date,
    required: [true, 'A project must have a due date'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
