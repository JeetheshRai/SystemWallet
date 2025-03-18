require('dotenv').config()

const config = {
    server_port : process.env.SERVER_PORT,
    mongo_database : {
        url : process.env.MONGO_DB_CONNECTION_STRING,
        name : process.env.MONGO_DB_NAME
    },
}

module.exports = config;    