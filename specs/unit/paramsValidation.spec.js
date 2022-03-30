const expect = require('chai').expect;
const {validateSchemaJson} = require('../../middlewares/validateFields')
const httpMocks = require('node-mocks-http');


describe('validateSchemaJson() Test', () => {

    it('should return an error of format validation', async () => {

      var request  = httpMocks.createRequest({
          method: 'POST',
          url: '/test',
          body:{
            paquete: 'test'
          }
      });

      validateSchemaJson(request);
      
    });
});
  
