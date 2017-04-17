const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of database', () => {
  let rohit, neha, anchal, parul;

  // First insert user in the database
  beforeEach((done) => {
    neha = new User({ name: 'Neha' });
    anchal = new User({ name: 'Anchal' });
    parul = new User({ name: 'Parul' });
    rohit = new User({ name: 'Rohit' });

    Promise.all([
      neha.save(),
      anchal.save(),
      parul.save(),
      rohit.save()
    ])
      .then(() => done());
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

  it('can skip and limit the result set', (done) => {
    // neha, anchal, parul, rohit
    // we are sorting here with sort() query modifier
    // 1 means ascending order and -1 meand descending order
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        // console.log(users);
        assert(users.length === 2);
        assert(users[0].name === 'Neha');
        assert(users[1].name === 'Parul');
        done();
      })
  });
});
