const httpMocks = require('node-mocks-http');
const UserController = require('../UserController');
const UserModal = require('../../models/UserModal');
const Users = require('./mock-data/Users.json');

UserModal.find = jest.fn();
UserModal.findById = jest.fn();
UserModal.findByIdAndUpdate = jest.fn();
UserModal.remove = UserModal.findById();


let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
})

describe('User Controller ', () => {
 

  test('Should call UserController getAllUsers', async () => {
    res.body = Users;
    UserModal.find.mockReturnValue(Users)
    await UserController.getAllUsers(req, res, next);
    const resData = res._getJSONData();
    
    expect(resData.users).toStrictEqual(Users);
  })

  test('Should call UserController getUser with correct ID', async () => {
   req.params = {
    id: '637d998f70165c656a7788b6'
   };
   UserModal.findById.mockReturnValue(Users[0]);
   await UserController.getUser(req, res, next);
   const resData = res._getJSONData();
   
   expect(resData.user).toStrictEqual(Users[0]);
  })

  test('Should call UserController getUser with wrong ID', async () => {
    req.params = {
     id: '1'
    };
    UserModal.findById.mockReturnValue({});
    await UserController.getUser(req, res, next);
    const resData = res._getJSONData();
    expect(resData.user).toStrictEqual({});
   })

  test('Should call UserController updateUser', async () => {
    req.body = Users[0];
    req.params = {
     id: '637d998f70165c656a7788b6'
    };
    UserModal.findByIdAndUpdate.mockReturnValue(Users[0]);
    await UserController.updateUser(req, res, next);
    const resData = res._getJSONData();
    expect(resData.success).toStrictEqual(true);
   })

//    test('Should call UserController deleteUser', async () => {
//     req.params = {
//      id: '1'
//     };
//     UserModal.findById.mockReturnValue('User Deleted Successfully');
//     await UserController.deleteUser(req, res, next);
//     const resData = res._getJSONData();
//     expect(resData.message).toStrictEqual('User Deleted Successfully');
//    })
 
});