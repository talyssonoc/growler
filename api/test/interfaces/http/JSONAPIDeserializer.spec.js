const JSONAPIDeserializer = require('src/interfaces/http/JSONAPIDeserializer');

describe('JSONAPIDeserializer', () => {
  context('when nothing is passed', () => {
    it('does not break', () => {
      return JSONAPIDeserializer.deserialize();
    });
  });

  context('when passed data does not have "data" key', () => {
    it('does not break', () => {
      return JSONAPIDeserializer.deserialize({});
    });
  });
});
