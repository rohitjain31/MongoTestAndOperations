const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let rohit;

  // Create a record before update that
  beforeEach((done) => {
    rohit = new User({ name: 'Rohit' });
    rohit.save()
      .then(() => done());
  });

  // Helper function
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Jain');
        done();
      });
  }

  it('instance type using set and save', (done) => {
    // console.log(rohit);
    rohit.set('name', 'Jain');
    // console.log(rohit);
    assertName(rohit.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(rohit.update({ name: 'Jain' }), done);
  });
});
