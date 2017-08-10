const { errorHandlers } = require('../../app/middleware');

describe('middleware.ErrorHandlers', () => {
  /**
   * Mocked Express Request object.
   */
  let req;

  /**
   * Mocked Express Response object.
   */
  let res;

  /**
   * Mocked Express Next function.
   */
  const next = jest.fn();

  /**
   * Reset the `req` and `res` object before each test is ran.
   */
  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      data: null,
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      json(payload) {
        this.data = JSON.stringify(payload);
      },
    };

    next.mockClear();
  });

  test('.catchErrors() should catch any async errors', () => {
    // If no error is thrown then we know it works.
    errorHandlers.catchErrors(() => { throw new Error(); });
  });

  test('.invalidRoute() should catch any invalid routes', () => {
    errorHandlers.invalidRoute(req, res, next);
    expect(next.mock.instances.length).toBe(1);
  });

  test('.validationErrors() should handle validation errors', () => {
    // Should call `next` if `errors` property doesn't exist.
    const error = new Error();
    errorHandlers.validationErrors(error, req, res, next);

    // `next` should've been called.
    expect(next.mock.instances.length).toBe(1);

    error.errors = {
      example: {
        properties: {},
      },
    };

    errorHandlers.validationErrors(error, req, res, next);

    expect(typeof res.data).toBe('string');
    const response = JSON.parse(res.data);

    expect(response.status).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.example).toBeDefined();
    expect(response.error.example.properties).not.toBeDefined();

    // Should clear the error strack
    process.env.NODE_ENV = 'production';
    error.stack = {};
    errorHandlers.validationErrors(error, req, res, next);

    // Should check error stack exists
    process.env.NODE_ENV = 'testing';
    error.stack = {};
    errorHandlers.validationErrors(error, req, res, next);
  });

  test('.displayErrors() should handle displaying errors to client', () => {
    const error = new Error();
    errorHandlers.displayErrors(error, req, res);

    expect(typeof res.data).toBe('string');
    const response = JSON.parse(res.data);

    expect(response.status).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toBeDefined();
  });
});
