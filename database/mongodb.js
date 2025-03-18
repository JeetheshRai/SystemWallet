const database = require('./database');

class Mongodb {

    async insertOne(collectionName, record) {
        const collection = database.getCollection(collectionName)
        return await collection.insertOne(record)
    }

}

module.exports = new Mongodb();