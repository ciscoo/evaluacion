const { contactController } = require('../../app/controllers');

describe('controllers.Contact', () => {
  /**
   * Mocked Express Request object.
   */
  let req;

  /**
   * Mocked Express Response object.
   */
  let res;

  /**
   * Contact object from `store` action.
   */
  let contact;

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
  });

  test('.store() should create a new contact', async () => {
    req.body = {
      name: 'Jon',
      phone: '2629950000',
    };

    await contactController.store(req, res);

    expect(res.data).toBeDefined();
    expect(typeof res.data).toBe('string');

    const response = JSON.parse(res.data);

    expect(response.status).toBeDefined();
    expect(response.status).toBe(201);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);

    contact = response.data;

    expect(contact.name).toBe(req.body.name);
    expect(contact.phone).toBe(req.body.phone);
  });

  test('.show() should retrieve a contact by ID', async () => {
    // eslint-disable-next-line no-underscore-dangle
    req.params.id = contact._id;

    await contactController.show(req, res);

    expect(res.data).toBeDefined();
    expect(typeof res.data).toBe('string');

    const response = JSON.parse(res.data);

    expect(response.status).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);

    const kontact = response.data;

    expect(kontact).toEqual(contact);
  });

  test('.update() should update a contact by ID', async () => {
    // eslint-disable-next-line no-underscore-dangle
    req.params.id = contact._id;

    req.body = {
      name: 'Francisco Mateo',
      phone: '4142621234',
    };

    await contactController.update(req, res);

    expect(res.data).toBeDefined();
    expect(typeof res.data).toBe('string');

    const response = JSON.parse(res.data);

    expect(response.status).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data).toBeInstanceOf(Object);

    const kontact = response.data;

    expect(kontact.name).toEqual(req.body.name);
    expect(kontact.phone).toEqual(req.body.phone);
  });

  test('.update() should remove `deletedAt` from `req.body` if it exists', async () => {
    // eslint-disable-next-line no-underscore-dangle
    req.params.id = contact._id;

    req.body = {
      name: 'Cisco Mateo',
      phone: '1234567890',
      deletedAt: 'should be removed',
    };

    await contactController.update(req, res);

    expect(req.body.deletedAt).not.toBeDefined();
  });

  test('.index() should retrieve a list of contacts', async () => {
    await contactController.index(req, res);

    expect(res.data).toBeDefined();
    expect(typeof res.data).toBe('string');

    const response = JSON.parse(res.data);

    expect(response.status).toBeDefined();
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBeTruthy();
    expect(response.data.length).toBe(1);
  });

  test('.destroy() should soft delete a contact by ID', async () => {
    // eslint-disable-next-line no-underscore-dangle
    req.params.id = contact._id;

    await contactController.destroy(req, res);

    expect(res.data).not.toBeDefined();
    expect(res.code).toBe(204);
  });

  test('.show() should not show deleted contacts', async () => {
    // eslint-disable-next-line no-underscore-dangle
    req.params.id = contact._id;
    try {
      await contactController.show(req, res);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.status).toBe(404);
    }
  });
});
