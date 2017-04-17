const { expect } = require('chai');
const request = require('test/support/request');
const factory = require('test/support/factory');

describe('API :: POST /api/users/:id/growls', () => {
  context('when data is valid', () => {
    context('when user exists', () => {
      let userId;

      beforeEach(() => {
        return factory
          .create('user')
          .then((u) => userId = u.id);
      });

      it('creates and return the growl with status 201', () => {
        return request()
          .post(`/api/users/${userId}/growls`)
          .send(growlData())
          .expect(201)
          .then(({ body }) => {
            const { attributes, relationships: { user } } = body.data;

            expect(attributes.id).to.not.be.undefined();
            expect(attributes.text).to.equal('I am not sure what is happening');
            expect(user.data).to.eql({
              type: 'users',
              id: String(userId)
            });
            expect(user.links.self).to.equal(`/api/users/${userId}`);
          });
      });
    });

    context('when user does not exist', () => {
      it('does not create and return status 400', () => {
        return request()
          .post(`/api/users/0/growls`)
          .send(growlData())
          .expect(400)
          .then(({ body }) => {
            const details = body.errors[0].meta.details;

            expect(details).to.equal('Could not find user with id 0');
          });
      });
    });

    function growlData() {
      return {
        data: {
          type: 'growls',
          attributes: {
            text: 'I am not sure what is happening'
          }
        }
      };
    }
  });

  context('when data is invalid', () => {
    let userId;

    beforeEach(() => {
      return factory
        .create('user')
        .then((u) => userId = u.id);
    });

    it.only('does not create and return status 400', () => {
      return request()
        .post(`/api/users/${userId}/growls`)
        .send({
          data: {
            type: 'growls',
            attributes: {
              text: ''
            }
          }
        })
        .expect(400)
        .then(({ body }) => {
          console.log(body);
        });
    });
  });
});
