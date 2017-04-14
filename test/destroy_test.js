const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let rohit;

  // Create database before delete any user
  beforeEach((done) => {
    rohit = new User({ name: 'Rohit' });
    rohit.save()
      .then(() => { done(); });
  });

  it('model instance remove', (done) => {
    rohit.remove()
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', (done) => {
    // Remove a bunch of record with some given criteria
    User.remove({ name: 'Rohit' })
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Rohit' })
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', () => {

  });
});
