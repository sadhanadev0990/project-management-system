const httpMocks = require('node-mocks-http');
const AuthController = require('../AuthController');
const UserModal = require('../../models/UserModal');

UserModal.create = jest.fn((res) => { res.getJWTToken = jest.fn()});
UserModal.findOne = jest.fn((res) => { res.select = jest.fn()});
UserModal.findById = jest.fn();
// UserModal.getJWTToken = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

describe('Auth Controller ', () => {
    
    test('Should call login function - to handle error', async () => {
        req.body = {
            "email": "test@gmail.com",
            "password": ""
        }
        UserModal.findOne.mockReturnValue('Please provide email and password!');
        await AuthController.login(req, res, next);
        expect(res.statusCode).toBe(200)
      })

      test('Should call login function', async () => {
        req.body = {
            "email": "test@gmail.com",
            "password": "test1234"
        }
        const response = {
            "status": true,
            "user": {
                "_id": "637d998f70165c656a7788b6",
                "name": "testuser",
                "email": "testuser@gmail.com",
                "role": "lead",
                "password": "$2b$12$y7zDth2jxPLYB/q.xJ9xwujyyahloiMhdSyRZOQ3T1nJ2ZQ.Emp8K",
                "__v": 0
            },
            "token": "mocktoken"
        }
        UserModal.findOne.mockReturnValue(response);
        await AuthController.login(req, res, next);
        expect(res.statusCode).toBe(200)
      })

      test('Should call logout function', async () => {
        await AuthController.logout(req, res, next);
        expect(res.statusCode).toBe(200)
      })

      test('Should call protect function with token', async () => {
        req.headers.authorization = "Bearer kajsdjasdkajsdjajsdkha"
         await AuthController.protect(req, res, next);
         expect(res.statusCode).toBe(200)
       })

       test('Should call protect function without token', async () => {
         res.statusCode = 401
         req.headers.authorization = "Bearer "
         await AuthController.protect(req, res, next);
         expect(res.statusCode).toBe(401)
       })

       test('Should call restricto function', async () => {
        req.user = {
            role : 'manager'
        }
        req.roles = ['admin', 'lead']
        await AuthController.restrictTo(req, res, next);
      })
});  