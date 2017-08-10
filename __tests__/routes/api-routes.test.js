const { apiRoutes } = require('../../app/routes');

describe('routes.Api', () => {
  test('should have contact router attached', () => {
    expect(apiRoutes.stack.length).toBe(1);
    expect(apiRoutes.stack[0].name).toBe('router');
  });
});
