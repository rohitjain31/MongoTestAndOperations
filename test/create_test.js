const assert = require('assert');
const User = require('../src/user');

describe('Creating Records', () => {
  it('saves a user', (done) => {
    const rohit = new User({ name: 'Rohit' });

    rohit.save()
      .then(() => {
        // Has Rohit saved successfully to database
        assert(!rohit.isNew);
        done();
      });
  });
});
