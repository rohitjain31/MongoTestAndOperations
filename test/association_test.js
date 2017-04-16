const assert = require('assert');
// const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let rohit, blogPost, comment;

  beforeEach((done) => {
    rohit = new User({ name: 'Rohit' });
    blogPost = new BlogPost({
      title: 'JS is great',
      content: 'Yeah!! it really is.'
    });
    comment = new Comment({ content: 'Congrats on great post' });

    //Associate related model
    // here mongo stores Id of that particular document even we are passing complete model.
    // Stores id means, stores reference for that document.
    rohit.blogPosts.push(blogPost); // has-many relationship
    blogPost.comments.push(comment); // has-many relationship
    comment.user = rohit // has-one relationship

    // It will go in then callback when all three promises resolve successfully.
    Promise.all([
      rohit.save(),
      blogPost.save(),
      comment.save()
    ]).then(() => done());
  });

  it('saves a reation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Rohit' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Rohit' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Rohit');
        assert(user.blogPosts[0].title === 'JS is great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Rohit');
        done();
      });
  });
});
