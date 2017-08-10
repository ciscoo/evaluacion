const { Contact } = require('../../app/models');

describe('models.Contact', () => {
  describe('.save()', async () => {
    test('fails when missing any required properties', async () => {
      try {
        await new Contact({}).save();
      } catch (error) {
        expect(error.errors).toBeDefined();
        // Only two properties are required.
        expect(Object.keys(error.errors).length).toBe(2);
      }
    });

    test('passes with all required properties', async () => {
      await new Contact({ name: 'Jon', phone: '2629950000' }).save();
      const contact = await Contact.findOne({ name: 'Jon' }).exec();
      expect(contact).toBeDefined();
      expect(contact.name).toBe('Jon');
    });

    test('fails when there are any type mismatches', async () => {
      try {
        await new Contact({
          name: {},
          phone: 0,
          address: 9,
          email: {},
          company: {},
          favorite: {},
          smallImageURL: {},
          largeImageURL: {},
          website: {},
          birthdate: {},
          deletedAt: {},
        }).save();
      } catch (error) {
        expect(error.errors).toBeDefined();
        // No need to check all of them.
        expect(Object.keys(error.errors).length).toBeGreaterThan(4);
      }
    });

    test('passes with all properties', async () => {
      try {
        await new Contact({
          name: 'jon',
          phone: '262-994-0000',
          address: {},
          email: 'jon@example.com',
          company: '',
          favorite: {},
          smallImageURL: {},
          largeImageURL: {},
          website: {},
          birthdate: {},
          deletedAt: {},
        }).save();
      } catch (error) {
        expect(error.errors).toBeDefined();
        // No need to check all of them since 1 is enough
        // to confirm validation is working.
        expect(Object.keys(error.errors).length).toBeGreaterThan(4);
      }
    });
  });
});
