const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database', () => {
  let rohit;

  // First insert user in the database
  beforeEach((done) => {
    rohit = new User({ name: 'Rohit' });
    rohit.save()
      .then(() => { done(); });
  });

  it('finds all users with the name of rohit', (done) => {
    User.find({ name: 'Rohit' })
      .then((users) => {
        // console.log(users);
        // console.log(users[0]._id);  type of this id is Object
        // console.log(rohit._id);  type of this id is object
        assert(users[0]._id.toString() === rohit._id.toString());
        done();
      });
  });

  it('find a user with a perticular id', (done) => {
    User.findOne({ _id: rohit._id })
      .then((user) => {
        assert(user.name === 'Rohit');
        done();
      });
  });
});
