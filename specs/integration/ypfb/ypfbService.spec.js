const config = require('../../../util/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);
const url= `http://localhsot:8080`;

describe('YPFB Search Criteria: ',()=>{
    it('post searchCriteria', (done) => {
        chai.request(url)
        .post('/criteriosbusquedas')
        .send(
        {
            data: {
                serviceid: 622,
                type: "B"
            },
            metadata: {
                codUsuario: "JBK",
                codSucursal: 70,
                codAplicacion: 1
            }
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('YPFB customers: ',()=>{
    it('post customers', (done) => {
    chai.request(url)
      .post('/clientes')
      .send(
        {
            data: {
                serviceId: 622,
                filtro: [
                    {
                        identificador: 1,
                        alias: "codDepartamento",
                        valor: "1"
                    },
                    {
                        identificador: 2,
                        alias: "codCriterio",
                        valor: "1"
                    },
                    {
                        identificador: 3,
                        alias: "codigo",
                        valor: "132125"
                    },
                    {
                        identificador: 4,
                        alias: "codSesion",
                        valor: "123456789"
                    }
                ]
            },
            metadata: {
                codUsuario: "JBK",
                codSucursal: 70,
                codAplicacion: 1
            }
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
  });
});

describe('YPFB debts: ',()=>{
    it('post debts', (done) => {
    chai.request(url)
      .post('/deudas')
      .send(
        {
            data: {
                serviceId: 622,
                filtro: [
                    {
                        label: "codDepartamento",
                        value: "1",
                        mandatory: true,
                        editable: "N",
                        grupo: "filtro",
                        description: "Codigo de departamento",
                        code: "codDepartamento"
                    },
                    {
                        label: "codCriterio",
                        value: "1",
                        mandatory: false,
                        editable: "N",
                        grupo: "filtro",
                        description: "Codigo criterio",
                        code: "codCriterio"
                    },
                    {
                        label: "codigo",
                        value: "125651",
                        mandatory: true,
                        editable: "N",
                        grupo: "filtro",
                        description: "codigo de usuario",
                        code: "codigo"
                    },
                    {
                        label: "codSesion",
                        value: "123456789",
                        mandatory: true,
                        editable: "N",
                        grupo: "filtro",
                        description: "Codigo sesion",
                        code: "codSesion"
                    }
                ]
            },
            metadata: {
                codUsuario: "JBK",
                codSucursal: 70,
                codAplicacion: 1
            }
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
  });
});