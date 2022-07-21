const MongoClient = require("mongodb").MongoClient;
const errorConstants = require("../util/errorConstants");
const config = require("../util/config");

exports.saveMultiDocument = async (mongo_collection, data) => {
  try {
    const client = MongoClient(config.mongo_url, { useUnifiedTopology: true });
    await client.connect();
    const db = await client.db(config.mongo_db_name);
    const collection = db.collection(mongo_collection);
    await collection.insertMany(data);
    await client.close();
  } catch (e) {
    throw new Error(e);;
  }
};

exports.getDocumentsIds = async (mongo_collection) => {
  let listIds = [];
  try {
    const client = MongoClient(config.mongo_url, { useUnifiedTopology: true });
    await client.connect();
    const db = await client.db(config.mongo_db_name);
    const collection = db.collection(mongo_collection);

    const doQuery = new Promise((resolve, reject) => {
      collection
        .find({ id: { $gt: 0 } }, { projection: { _id: 0, id: 1 } })
        .toArray(function (err, result) {
          //listIds = result;
          //const array = [];
          const propertyValues = Object.values(result);

          console.log(propertyValues);
          Object.entries(result).forEach((value) => {
            listIds.push(value[1].id);
          });
          console.log(listIds);
          resolve();
        });
    });

    await doQuery;
    await client.close();
    return listIds;
  } catch (err) {
    return err;
  }
};

exports.saveDocument = async (mongo_collection, data) => {
  try {
    const client = MongoClient(config.mongo_url, { useUnifiedTopology: true });
    await client.connect();
    const db = await client.db(config.mongo_db_name);
    const collection = db.collection(mongo_collection);
    await collection.insertOne(data);
    await client.close();
    return {
      errCode: "",
      errMsg: "",
      data: {
        success: true,
      },
    };
  } catch (e) {
    return {
      errCode: "MONGO",
      errMsg: e,
      data: null,
    };
  } finally {
    //    await client.close();
  }
};

exports.clearData = async (mongo_collection) => {
  try {
    const client = MongoClient(config.mongo_url, { useUnifiedTopology: true });
    await client.connect();
    const db = await client.db(config.mongo_db_name);
    const collection = db.collection(mongo_collection);
    await collection.deleteMany({});
    await client.close();
  } catch (e) {
    throw new Error(e);
  }
};

exports.getDocument = async (
  mongo_uri,
  mongo_db,
  mongo_collection,
  mongo_query,
  mongo_options
) => {
  let documentResult = {
    errCode: "",
    errMsg: "",
    data: [],
  };
  try {
    const client = new MongoClient(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 2000,
      serverSelectionTimeoutMS: 2000,
    });
    await client.connect();
    const db = await client.db(mongo_db);
    const collection = db.collection(mongo_collection);

    const doQuery = new Promise((resolve, reject) => {
      collection
        .find(mongo_query, mongo_options)
        .toArray(function (err, result) {
          documentResult.data = result;

          resolve();
        });
    });

    await doQuery;
    await client.close();
  } catch (e) {
    documentResult.errCode = "MONGO";
    documentResult.errMsg = e;
  } finally {
    return documentResult;
  }
};

exports.getTranslateDocument = async (
  mongo_uri,
  mongo_db,
  mongo_collection,
  mongo_query,
  mongo_options
) => {
  let documentResult = {
    errCode: "",
    errMsg: "",
    data: [],
  };
  const client = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 2000,
    serverSelectionTimeoutMS: 2000,
  });
  try {
    // const client = new MongoClient(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 2000, serverSelectionTimeoutMS: 2000});
    await client.connect();
    const db = await client.db(mongo_db, (err) => {
      if (err)
        throw new SyntaxError(
          "No se pudo establecer conexion con la base de datos"
        );
    });
    const collection = await db.collection(mongo_collection, (err) => {
      if (err)
        throw new SyntaxError(
          "No se pudo establecer conexion con la collection"
        );
    });

    const informacion = await collection
      .find(mongo_query, mongo_options)
      .toArray();
    documentResult.data = informacion;
  } catch (error) {
    documentResult.errCode = codeDBConnectionError;
    documentResult.errMsg = desDBConnectionError;
  } finally {
    await client.close();
    return documentResult;
  }
};

exports.getConnection = async (mongo_uri, mongo_db) => {
  let documentResult = {
    errCode: "",
    errMsg: "",
    data: [],
  };
  const client = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 2000,
    serverSelectionTimeoutMS: 2000,
  });
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
