const { expect } = require('chai');
const GrowlSerializer = require('src/interfaces/http/growl/GrowlSerializer');
const Growl = require('src/domain/growl/Growl');

describe('HTTP :: Growl :: GrowlSerializer', () => {
  it('serializes correctly', () => {
    const growl = new Growl({
      id: 2,
      text: 'This is the text',
      userId: 123
    });

    expect(GrowlSerializer.serialize(growl)).to.eql({
      data: {
        type: 'growls',
        id: '2',
        attributes: {
          id: 2,
          text: 'This is the text'
        },
        relationships: {
          user: {
            links: {
              self: '/api/users/123'
            }
          }
        }
      }
    });
  });
});
