const httpMocks = require('node-mocks-http');
const ProjectController = require('../ProjectController');
const ProjectModel = require('../../models/ProjectModel');
const Projects = require('./mock-data/Projects.json');
const APIFeatures = require('../../utils/apiFeatures');


ProjectModel.create = jest.fn();
ProjectModel.find = jest.fn();
ProjectModel.findById = jest.fn();
ProjectModel.findByIdAndUpdate = jest.fn();
ProjectModel.findByIdAndDelete = jest.fn();

APIFeatures.find = jest.fn();
APIFeatures.sort = jest.fn();
APIFeatures.paginate = jest.fn();


let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
})

describe('Project Controller ', () => {
  test('Should call checkbody function', async () => {
    res.body = {  
      "description": "test description",
      "dueDate": "12/12/2022",
      "stage": "Planning",
      "status": "In progress",    
      "teamCount": 10,
      "title": "IT"
    };
    await ProjectController.checkBody(req, res, next);
    const resData = res._getJSONData();
    expect(resData.message).toBe("Missing project name")
  })

  test('Should call ProjectController createProject', async () => {
    res.body = Projects;
    ProjectModel.create.mockReturnValue(Projects)
    await ProjectController.createProject(req, res, next);
    const resData = res._getJSONData();
    
    expect(resData.data.project).toStrictEqual(Projects)    
  })

  // test('Should call ProjectController getAllProjects', async () => {
  //   req.query = {
  //    page: 1
  //   };
  //   new APIFeatures(ProjectModel.find.mockReturnValue(Projects));
  //   await ProjectController.getAllProjects(req, res, next);
  //   const resData = res._getJSONData();
 
  //   // expect(resData.data.project).toStrictEqual(Projects);
  //  })

  test('Should call ProjectController getProject', async () => {
   req.params = {
    id: '639c5d5e21bc0c9a6cdda8c4'
   };
   ProjectModel.findById.mockReturnValue(Projects);
   await ProjectController.getProject(req, res, next);
   const resData = res._getJSONData();

   expect(resData.data.project[0]).toStrictEqual(Projects[0]);
  })

  test('Should call ProjectController updateProject', async () => {
    req.body = Projects[0];
    req.params = {
     id: '639c5d5e21bc0c9a6cdda8c4'
    };
    ProjectModel.findByIdAndUpdate.mockReturnValue(Projects);
    await ProjectController.updateProject(req, res, next);
    const resData = res._getJSONData();
    expect(resData.data.project[0]).toStrictEqual(Projects[0]);
   })

   test('Error controller', async () => {
    req.body = {
      "_id": "",
      "description": "",
      "dueDate": "12/12/2022",
      "name": "",
      "stage": "Planning",
      "status": "In progress",    
      "teamCount": 10,
      "title": "IT"
    };
    req.params = {
     id: '639c5d5e21bc0c9a6cdda8c4'
    };
    ProjectModel.findByIdAndUpdate.mockReturnValue(Projects);
    await ProjectController.updateProject(req, res, next);
    const resData = res._getJSONData();
    expect(resData.data.project[0]).toStrictEqual(Projects[0]);
   })

   test('Should call ProjectController deleteProject', async () => {
    req.params = {
     id: '639c5d5e21bc0c9a6cdda8c4'
    };
    ProjectModel.findByIdAndDelete.mockReturnValue('success');
    await ProjectController.deleteProject(req, res, next);
    const resData = res._getJSONData();
    expect(resData.data).toStrictEqual(null);
   })

 
});