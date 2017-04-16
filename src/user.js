const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer then 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogpost'
  }]
});

// Add virtual type to user schema
UserSchema.virtual('postLength').get(function() {
  // here this will refer to instance of the model
  return this.posts.length;
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
