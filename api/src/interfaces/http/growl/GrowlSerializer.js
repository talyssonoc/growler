const { Serializer } = require('jsonapi-serializer');

const GrowlSerializer = new Serializer('growls', {
  attributes: ['id', 'text', 'user'],
  user: {
    ref: 'id',
    included: false,
    relationshipLinks: {
      self(growl, user) {
        return `/api/users/${user.id}`;
      }
    }
  }
});

module.exports = GrowlSerializer;
