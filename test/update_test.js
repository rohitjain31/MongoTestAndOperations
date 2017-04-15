const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let rohit;

  // Create a record before update that
  beforeEach((done) => {
    rohit = new User({ name: 'Rohit', postCount: 0 });
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
    rohit.set('name', 'Jain');
    assertName(rohit.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(rohit.update({ name: 'Jain' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Rohit' }, { name: 'Jain' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Rohit' }, { name: 'Jain' }),
      done
    );
  });

  it('A model class can find a record with Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(rohit._id, { name: 'Jain' }),
      done
    );
  });

  it('A user can have their postCount incremented by 1', (done) => {
    User.update({ name: 'Rohit' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
