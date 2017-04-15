const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('Requires a user name', () => {
    const user = new User({ nme: undefined });
    // user.validate(); returns callback
    // const validationResult = user.validateSync();  return an object that contains all the validation    // result.

    // Difference between validate and validateSync is that validateSync is synchronous validation
    // process. so we get the result from validateSync in the same line. But in validate it doesnot
    // return result instead we can pass a callback with validation result.

    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });
});
