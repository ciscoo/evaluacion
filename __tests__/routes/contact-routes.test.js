const { contactRoutes } = require('../../app/routes');

describe('routes.Contact', () => {
  /**
   * An array of HTTP methods defined the router.
   *
   * It's safe to assume there will be no more than one HTTP method
   * per route that's defined.
   */
  const methods = contactRoutes.stack
    .map(stack => stack.route)
    .map(route => route.stack)
    .map(layer => layer[0].method);

  test('should have five routes defined', () => {
    expect(contactRoutes.stack.length).toBe(5);
  });

  test('should have only two GET routes defined', () => {
    expect(methods.filter(method => method === 'get').length).toBe(2);
  });

  test('should have only one POST route defined', () => {
    expect(methods.filter(method => method === 'post').length).toBe(1);
  });

  test('should have only one PATCH route defined', () => {
    expect(methods.filter(method => method === 'patch').length).toBe(1);
  });

  test('should have only one DELETE route defined', () => {
    expect(methods.filter(method => method === 'delete').length).toBe(1);
  });

  test('each route should have a handle', () => {
    const handlers = contactRoutes.stack
      .map(stack => stack.route)
      .map(route => route.stack)
      .map(layer => layer[0].handle);
    expect(handlers.length).toBe(5);
  });
});
