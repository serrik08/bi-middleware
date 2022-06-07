const { getConnection } = require('../dataAccess/mongoConnection');
const { mongo_url, mongo_db_name } = require('../util/config');

const validateConnection = async(req, res) => {
    const stateConnection = await getConnection(mongo_url, mongo_db_name);
    if (stateConnection.errCode !== '' && stateConnection.errMsg !== '') {
        res.send(stateConnection);
    }
};

module.exports = {
    validateConnection
};