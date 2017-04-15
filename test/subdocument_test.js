const assert = require('assert');
const User = require('../src/user');

describe('Sub documents', () => {
  it('Can create a subdocument', (done) => {
    const rohit = new User({
      name: 'Rohit',
      posts: [{ title: 'PostTitle' }]
    });

    rohit.save()
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can add subdocuments to an existing record', (done) => {
    const rohit = new User({
      name: 'Rohit',
      posts: []
    });

    rohit.save()
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Rohit' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });
});
