const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Executed only one time befor all the test suite
before((done) => {
  mongoose.connect('mongodb://localhost/user_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});


// Executed befor each and every test case
// we cannot drop multiple collection in mongo at same time so sequential approach
// MongoDB normalizes each collection name by lower casing entire collection name
// So blogPost -> blogposts
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
})
