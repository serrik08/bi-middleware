const connection = require('../dataAccess/mongoConnection');
const config = require('../config');

exports.findDocument = async (servicio,grupo,order) => {
    let result = {};
    let query = {
        SERVICIO: servicio,
        GRUPO: grupo
    }
    let param={
        orden:order
    }
    await connection.getDocument(config.MONGO_URL, config.MONGO_DB_NAME, config.MONGO_COLLECTION, query, param)
        .then((data) => {
            result = data;
        });
        
    return result;
}

exports.findCriteria = async (servicio, codigo_operacion, order) => {
    let result = {};
    let query = {
        SERVICIO: servicio,
        CODIGO_OPERACION: codigo_operacion
    }
    let param={
        ORDEN:order
    }
    await connection.getDocument(config.MONGO_URL, config.MONGO_DB_NAME, config.MONGO_COLLECTION, query, param)
        .then((data) => {
            result = data;
        });
        
    return result;
}