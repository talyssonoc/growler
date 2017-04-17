const { attributes } = require('structure');

const Growl = attributes({
  id: Number,
  text: {
    type: String,
    required: true,
    maxLength: 140
  },
  userId: Number,
  user: 'User'
}, {
  dynamics: {
    User: () => require('src/domain/user/User')
  }
})(class Growl {

});

module.exports = Growl;
