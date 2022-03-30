const config = require('../../util/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);
const url= `http://localhost:8080/api/v1`;

describe('COMTECO Search Criteria: ',()=>{
  it('post documents', (done) => {
    chai.request(url)
      .post('/criteriosbusquedas')
      .send(
        {
          paquete: "0",
          codModulo: 161,
          data: "",
          metadata: {
            codUsuario: "Top1",
            codSucursal: 70,
            codAplicacion: 1
          }
        }
      )
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('COMTECO Customers: ',()=>{
  it('post documents', (done) => {
    chai.request(url)
      .post('/clientes')
      .send(
        {
          data: {
            serviceId: 628,
            filtro: [
              {
                identificador: 1,
                alias: "DEP1",
                valor: "922403"
              }
            ]
          },
          metadata: {
            codUsuario: "TOP1",
            codSucursal: 70,
            codAplicacion: 1
          }
        }
      )
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
});