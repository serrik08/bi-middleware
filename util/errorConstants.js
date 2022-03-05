module.exports = {
  codeError: 'ERR1000',
  desError: 'Error en el enrutador, no existe recurso para el servicio',

  codeValidationError: 'ERR1001',

  ERR1002: {
    codeError: 'ERR1002',
    desError: 'Acceso denegado, usuario o password incorrectos',
  },

  ERR1003: {
    codeError: 'ERR1003',
    desError: 'Error del servicio externo: ',
  },

  //Cuando el servicio no cuente con el endpoint solicitado
  noservice_codeError: 'MSJ1001',
  noservice_desError: 'El recurso solicitado no se encuentra implementado por el servicio externo',

  codeDBConnectionError: 'ERR5000',
  desDBConnectionError: 'No se pudo establecer conexion con la base de datos',

  codeCriteriaError: 'ERR1003',
  desCriteriaError: 'identificador no valido',

  codeCriteriaLabelError: 'ERR1004',
  desCriteriaLabelError: 'etiqueta no valida',

  codeCriteriaLengthError: 'ERR1005',
  desCriteriaLengthError: 'Los longitud de los filtros respecto a los criterios de busqueda no son igualitarios',
};