const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('postLength returns number of posts', (done) => {
    const rohit = new User({
      name: 'Rohit',
      posts: [{ title: 'New Title' }]
    });
    rohit.save()
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        assert(user.postLength === 1);
        done();
      });
  });
});
