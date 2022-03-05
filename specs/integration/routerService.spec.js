const config = require('../../util/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);
const url= `${config.localhost}:${config.port}`;

describe('ELFEC Sample Unit Testing: ',()=>{
  it('post documents', (done) => {
    chai.request(url)
      .post('/facturas')
      .send(
        {
        paquete: "elfecController",
        codModulo: 0,
        data: {
            codigo: "119920464",
            username: "COGANADE",
            password: "Elfec19"
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

describe('YPFB Sample Unit Testing: ',()=>{
  it('post affiliations', (done) => {
    chai.request(url)
      .post('/clientes')
      .send({
        paquete: "ypfbController",
        codModulo: 0,
        data: {
          codDepartamento: 1,
          codCriterio: 1,
          codigo: 5231,
          codSesion: "123456789"
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
  it('post debts', (done) => {
    chai.request(url)
      .post('/deudas')
      .send({
        paquete: "ypfbController",
        codModulo: 0,
        data: {
            codDepartamento: 1,
            codigo: 5231,
            codSesion: "123456789"
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
  it('post payments', (done) => {
    chai.request(url)
      .post('/pagos')
      .send({
        paquete: "ypfbController",
        codModulo: 0,
        data: {
            codDepartamento: 1,
            codigo: 5231,
            codSesion: "123456789",
            total: 1002,
            periodo: "2021",
            codCategoria: "I"
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
  it('post validate payments', (done) => {
    chai.request(url)
      .post('/pagos/validar')
      .send({
        paquete: "ypfbController",
        codModulo: 0,
        data: {
            codDepartamento: 1,
            codigo: 5231,
            codSesion: "123456789",
            periodo: "2021"
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

describe('TIGO Sample Unit Testing: ',()=>{
  it('post test', (done) => {
    chai.request(url)
    .post('/test')
    .send({
      paquete: "tigoController",
      codModulo: 0,
      data: {
        username: "admin",
        password: "admin"
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
  
  it('post test', (done) => {
    chai.request(url)
    .post('/clientes')
    .send({
      paquete: "tigoController",
      codModulo: 0,
      data: {
        codigo: "1760566",
        canal: "BGA",
        codTipoServicio: "HOME",
        nroFiltro: 1
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
  
  it('post test', (done) => {
    chai.request(url)
    .post('/clientes')
    .send({
      paquete: "tigoController",
      codModulo: 0,
      data: {
        codigo: "1760566",
        canal: "BGA",
        codTipoServicio: "HOME",
        nroFiltro: 2
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
    
describe('PAGO EXPRESS Sample Unit Testing: ',()=>{
  it('post test', (done) => {
    chai.request(url)
      .post('/servicios')
      .set('Content-Type', 'application/json')
      .send({
        paquete: "pexpressController",
        codModulo: 0,
        data: {
          servicio: 122
        },
        metadata: {
          codUsuario: "1",
          codSucursal: 70,
          codAplicacion: 1
        }
      })
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
  
  it('post test', (done) => {
    chai.request(url)
      .post('/criteriosbusquedas')
      .set('Content-Type', 'application/json')
      .send({
        paquete: "pexpressController",
        codModulo: 0,
        data: {
          servicio: 122
        },
        metadata: {
          codUsuario: "1",
          codSucursal: 70,
          codAplicacion: 1
        }
      })
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
  
  it('post test', (done) => {
    chai.request(url)
      .post('/clientes')
      .set('Content-Type', 'application/json')
      .send({
        paquete: "pexpressController",
        codModulo: 0,
        data: {
          servicio: 122,
          campos: {
            3230: "12345",
            3235: "12345"
          }
        },
        metadata: {
          codUsuario: "1",
          codSucursal: 70,
          codAplicacion: 1
        }
      })
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
  
  it('post test', (done) => {
    chai.request(url)
      .post('/deudas')
      .set('Content-Type', 'application/json')
      .send({
        paquete: "pexpressController",
        codModulo: 0,
        data: {
          servicio: 122,
          campos: {
            3230: "1234",
            3235: "12345"
          }
        },
        metadata: {
          codUsuario: "1",
          codSucursal: 70,
          codAplicacion: 1
        }
      })
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
  
  it('post test', (done) => {
    chai.request(url)
      .post('/pagos')
      .set('Content-Type', 'application/json')
      .send({
        paquete: "pexpressController",
        codModulo: 0,
        data: {
          servicio: 122,
          secuencia: 1,
          ticket: "444455",
          campos: {
            0: "749",
            1: "1",
            2: "1",
            3231: "PREPAGO 1-BUNDTOP7 202008. PE\\\\00D1ARANDA ROMERO IVAN RAFAEL LUIS",
            3232: "12345",
            3233: "12345",
            3234: "1-BUNDTOP7",
            3236: "a:/.-+5Tik",
            3237: "12345",
            3238: "202008",
            3239: "a:/.-+5Tik",
            3240: "2",
            3251: "",
            3252: "0",
            3266: "PE\\\\00D1ARANDA ROMERO IVAN RAFAEL LUIS"
          }
        },
        metadata: {
          codUsuario: "1",
          codSucursal: 70,
          codAplicacion: 1
        }
      })
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
  
  it('post test', (done) => {
    chai.request(url)
      .post('/documentos')
      .set('Content-Type', 'application/json')
      .send({
        paquete: "pexpressController",
        codModulo: 0,
        data: {
          id: "008205000050007"
        },
        metadata: {
          codUsuario: "1",
          codSucursal: 70,
          codAplicacion: 1
        }
      })
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
  
  it('post test', (done) => {
    chai.request(url)
      .post('/transacciones')
      .set('Content-Type', 'application/json')
      .send({
        paquete: "pexpressController",
        codModulo: 0,
        data: {
          fecha_desde: "20210427010000",
          fecha_hasta: "20210427230000",
          id: "",
          ticket: "444456"
        },
        metadata: {
          codUsuario: "1",
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

describe('Validaciones de servicio DeLaPaz: ', () => {
  describe('Pruebas con criterios de busqueda: ', () => {
    it('post criteriosBusqueda', (done) => {
      chai.request(url)
        .post('/criteriosbusquedas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {},
          metadata: {
              codUsuario: "1",
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

  describe('Validacion de data endpoint clientes: ', () => {
    it('invalid grupo', (done) => {
      chai.request(url)
        .post('/clientes')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: "1",
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "grupo debe ser de tipo entero"});
          done();
        });
    });
    
    it('invalid campos', (done) => {
      chai.request(url)
        .post('/clientes')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: 12
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "campos debe ser de tipo array"});
          done();
        });
    });
    
    it('invalid nroFiltro', (done) => {
      chai.request(url)
        .post('/clientes')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: "1",
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "nroFiltro debe ser de tipo entero"});
          done();
        });
    });

    it('invalid grupo required', (done) => {
      chai.request(url)
        .post('/clientes')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo grupo es requerido"});
          done();
        });
    });

    it('invalid campos array', (done) => {
      chai.request(url)
        .post('/clientes')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el array campos es requerido"});
          done();
        });
    });
    
    it('invalid nroFiltro required', (done) => {
      chai.request(url)
        .post('/clientes')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo nroFiltro es requerido"});
          done();
        });
    });
    
    it('invalid campo required', (done) => {
      chai.request(url)
        .post('/clientes')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo valor es requerido"});
          done();
        });
    });
  });

  describe('Validacion de data endpoint deudas: ', () => {
    it('invalid grupo', (done) => {
      chai.request(url)
        .post('/deudas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: "1",
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "grupo debe ser de tipo entero"});
          done();
        });
    });
    
    it('invalid campos array', (done) => {
      chai.request(url)
        .post('/deudas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: 12
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "campos debe ser de tipo array"});
          done();
        });
    });
    
    it('invalid nroFiltro', (done) => {
      chai.request(url)
        .post('/deudas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: "1",
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "nroFiltro debe ser de tipo entero"});
          done();
        });
    });

    it('invalid grupo required', (done) => {
      chai.request(url)
        .post('/deudas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo grupo es requerido"});
          done();
        });
    });

    it('invalid campos array', (done) => {
      chai.request(url)
        .post('/deudas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el array campos es requerido"});
          done();
        });
    });
    
    it('invalid nroFiltro required', (done) => {
      chai.request(url)
        .post('/deudas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo nroFiltro es requerido"});
          done();
        });
    });
    
    it('invalid valor required', (done) => {
      chai.request(url)
        .post('/deudas')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            }
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo valor es requerido"});
          done();
        });
    });
  });

  describe('Validacion de data endpoint pagos: ', () => {
    it('invalid grupo type', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: "1",
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "grupo debe ser de tipo entero"});
          done();
        });
    });
    
    it('invalid campos array', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: 123123
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "campos debe ser de tipo array"});
          done();
        });
    });
    
    it('invalid nroFiltro type', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: "1",
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "nroFiltro debe ser de tipo entero"});
          done();
        });
    });

    it('invalid campo required', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo grupo es requerido"});
          done();
        });
    });

    it('invalid campos required', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el array campos es requerido"});
          done();
        });
    });
    
    it('invalid nroFiltro required', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo nroFiltro es requerido"});
          done();
        });
    });
    
    it('invalid valor required', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo valor es requerido"});
          done();
        });
    });
    
    it('invalid montoDeudas required', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el campo montoDeudas es requerido"});
          done();
        });
    });
    
    it('invalid montoDeudas type', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: "504",
            deudas: [
              {
                deuda: "hash|2021-10-15|104|orden"
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "montoDeudas debe ser de tipo entero"});
          done();
        });
    });
    
    it('invalid deudas array required', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "el array deudas es un campo requerido"});
          done();
        });
    });
    
    it('invalid deuda type', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: [
              {
                deuda: 123123
              },
              {
                deuda: "hash|2021-10-15|400|orden"
              }
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "deuda debe ser de tipo cadena"});
          done();
        });
    });
    
    it('invalid deuda length', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: [
            ]
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "deudas debe tener al menos 1 elemento de consulta"});
          done();
        });
    });
    
    it('invalid deuda type array', (done) => {
      chai.request(url)
        .post('/pagos')
        .send({
          paquete: "delapazController",
          codModulo: 0,
          data: {
            criterio: {
              grupo: 1,
              campos: [
                {
                  nroFiltro: 1,
                  valor: "156620"
                },
                {
                  nroFiltro: 2,
                  valor: "156620"
                }
              ]
            },
            montoDeudas: 504,
            deudas: 123123
          },
          metadata: {
              codUsuario: "1",
              codSucursal: 70,
              codAplicacion: 1
          }
        })
        .end( function(err,res){
          expect(res).to.have.status(200);
          expect(JSON.parse(res.req.res.text)).to.include({errMsg: "deudas debe ser de tipo array"});
          done();
        });
    });
  });
});