const httpMocks = require('node-mocks-http');
const app = require('../../app');
const ErrorController = require('../ErrorController');
const UserModal = require('../../models/UserModal');

UserModal.create = jest.fn((res) => { res.getJWTToken = jest.fn()});

let req, res, next;
beforeEach(() => {
    err = { statusCode: '500',
status: 'error'};
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
})

describe('Auth Controller ', () => {
    test('Should call errorcontroller load function', async () => {
        app.use(ErrorController)
        // ErrorController(err, req, res, next);
        //expect(res.statusCode).toBe()
      })
});