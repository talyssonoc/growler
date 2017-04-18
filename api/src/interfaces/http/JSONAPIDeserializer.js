const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

const Deserializer = new JSONAPIDeserializer();

module.exports = {
  deserialize(rawData) {
    if(!rawData) {
      rawData = { data: {}};
    } else if(!rawData.data) {
      rawData = Object.assign({ data: {} }, rawData);
    }

    return Deserializer.deserialize(rawData);
  }
};
