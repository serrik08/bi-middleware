const MongoClient = require('mongodb').MongoClient;
const errorConstants = require('../util/errorConstants');

exports.saveDocument = async (qrModel, mongo_url, mongo_db, mongo_collection) => {

  try {
    const client = MongoClient(mongo_url, { useUnifiedTopology: true });
    await client.connect()
    const db = await client.db(mongo_db);
    const collection = db.collection(mongo_collection);
    await collection.insertOne(qrModel);
    await client.close();
    return {
      errCode: '',
      errMsg: '',
      data: {
        success: true
      }
    }
  } catch (e) {

    return {
      errCode: 'MONGO',
      errMsg: e,
      data: null
    }
  } finally {
    //    await client.close();
  }
}
exports.getDocument = async (mongo_uri, mongo_db, mongo_collection, mongo_query, mongo_options) => {

  let documentResult = {
    errCode: '',
    errMsg: '',
    data: []
  }
  try {
    const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 2000, serverSelectionTimeoutMS: 2000 });
    await client.connect();
    const db = await client.db(mongo_db);
    const collection = db.collection(mongo_collection);

    const doQuery = new Promise((resolve, reject) => {
      collection.find(mongo_query, mongo_options).toArray(function (err, result) {
        documentResult.data = result;

        resolve();
      });
    })

    await doQuery;
    await client.close();

  } catch (e) {
    documentResult.errCode = 'MONGO';
    documentResult.errMsg = e;
  } finally {
    return documentResult;
  }
}

exports.getTranslateDocument = async (mongo_uri, mongo_db, mongo_collection, mongo_query, mongo_options) => {

  let documentResult = {
    errCode: '',
    errMsg: '',
    data: []
  }
  const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 2000, serverSelectionTimeoutMS: 2000 });
  try {
    // const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 2000, serverSelectionTimeoutMS: 2000});
    await client.connect();
    const db = await client.db(mongo_db, (err) => {
      if (err) throw new SyntaxError('No se pudo establecer conexion con la base de datos');
    });
    const collection = await db.collection(mongo_collection, (err) => {
      if (err) throw new SyntaxError('No se pudo establecer conexion con la collection');
    });

    const informacion = await collection.find(mongo_query, mongo_options).toArray();
    documentResult.data = informacion;
  } catch (error) {
    documentResult.errCode = codeDBConnectionError;
    documentResult.errMsg = desDBConnectionError;
  } finally {
    await client.close();
    return documentResult;
  }
}

exports.getConnection = async (mongo_uri, mongo_db) => {
  let documentResult = {
    errCode: '',
    errMsg: '',
    data: []
  }
  const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 2000, serverSelectionTimeoutMS: 2000 });
  try {
    await client.connect();
    const db = await client.db(mongo_db);
  } catch (e) {
    documentResult.errCode = errorConstants.codeDBConnectionError;
    documentResult.errMsg = errorConstants.desDBConnectionError;
  } finally {
    await client.close();
    return documentResult;
  }
};