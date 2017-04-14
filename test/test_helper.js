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
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test!
    done();
  });
})
