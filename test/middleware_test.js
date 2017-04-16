const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let rohit, blogPost;

  beforeEach((done) => {
    rohit = new User({ name: 'Rohit' });
    blogPost = new BlogPost({
      title: 'JS is great',
      content: 'Yeah!! it really is.'
    });

    //Associate related model
    // here mongo stores Id of that particular document even we are passing complete model.
    // Stores id means, stores reference for that document.
    rohit.blogPosts.push(blogPost); // has-many relationship

    // It will go in then callback when all three promises resolve successfully.
    Promise.all([
      rohit.save(),
      blogPost.save(),
    ]).then(() => done());
  });

  it('users clean up dangling blogposts on remove', (done) => {
    rohit.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      })
  });
});
