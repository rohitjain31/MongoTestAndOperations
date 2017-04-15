const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('Requires a user name', (done) => {
    const user = new User({ nme: undefined });
    // user.validate(); returns callback
    // const validationResult = user.validateSync();  return an object that contains all the validation    // result.

    // Difference between validate and validateSync is that validateSync is synchronous validation
    // process. so we get the result from validateSync in the same line. But in validate it doesnot
    // return result instead we can pass a callback with validation result.

    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
    done();
  });

  it('Requires a user\'s name longer then 2 characters', (done) => {
    const user = new User({ name: 'Ne' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer then 2 characters.');
    done();
  });

  it('Disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Ne' });
    user.save()
      .then()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer then 2 characters.');
        done();
      })
  });
});
