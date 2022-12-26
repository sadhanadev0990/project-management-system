const Project = require('../models/ProjectModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing project name',
    });
  }
  next();
};

exports.createProject = catchAsync(async (req, res, next) => {
    const newProject = await Project.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        project: newProject,
      },
    });
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
  const resultPerPage = req.query.limit;
  const projectsCount = await Project.countDocuments();

  const apiFeature = new APIFeatures(Project.find(), req.query)
  .filter()
  .sort()
  .pagination(resultPerPage);
  // .limitFields();

  const projects = await apiFeature.query;

  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects,
      projectsCount,
      resultPerPage
    },
  });  
});

exports.getProject = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
});

exports.updateProject = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      project,
    },
  });
});

exports.deleteProject = catchAsync(async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
