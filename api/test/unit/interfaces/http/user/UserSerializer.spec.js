const { expect } = require('chai');
const UserSerializer = require('src/interfaces/http/user/UserSerializer');
const User = require('src/domain/user/User');

describe('HTTP :: User :: UserSerializer', () => {
  it('serializes correctly', () => {
    const user = new User({
      id: 3,
      username: 'theuser',
      email: 'the@user.com',
      password: '123123123',
      growls: [
        { id: 1, text: 'Growl!' }
      ]
    });

    expect(UserSerializer.serialize(user)).to.eql({
      data: {
        type: 'users',
        id: '3',
        attributes: {
          id: 3,
          username: 'theuser',
          email: 'the@user.com'
        }
      }
    });
  });
});
