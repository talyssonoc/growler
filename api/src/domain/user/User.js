const { attributes } = require('structure');

const User = attributes({
  id: Number,
  username: {
    type: String,
    required: true,
    minLength: 1,
    alphanumeric: true
  },
  email: {
    type: String,
    required: true,
    email: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  }
})(class User {

});

module.exports = User;
