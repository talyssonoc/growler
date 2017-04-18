const { Serializer } = require('jsonapi-serializer');

const GrowlSerializer = new Serializer('growls', {
  attributes: ['id', 'text', 'user'],
  user: {
    ref: 'id',
    included: false,
    ignoreRelationshipData: true,
    relationshipLinks: {
      self(growl) {
        return `/api/users/${growl.userId}`;
      }
    }
  }
});

module.exports = GrowlSerializer;
