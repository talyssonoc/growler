const { Serializer } = require('jsonapi-serializer');

const UserSerializer = new Serializer('users', {
  attributes: ['id', 'username', 'email']
});

module.exports = UserSerializer;
