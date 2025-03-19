const database = require('./database');

class Mongodb {

    async insertOne(collectionName, record) {
        const collection = database.getCollection(collectionName)
        return await collection.insertOne(record)
    }

    async getInfo(collectionName, query, projection = {}, sort = {}) {
        const options = { projection, sort };
        const collection = database.getCollection(collectionName);
        return await collection.findOne(query, options);
    }

    async getList(collectionName, query, projection = {}, sort = {}, skip = 0, limit = 0) {
        const options = {
            projection,
            sort,
            skip,
            limit
        };
        const collection = database.getCollection(collectionName)
        return await collection.find(query, options).toArray();
    }
    
    async count(collectionName, query) {
        const collection = database.getCollection(collectionName)
        return await collection.count(query)
    }

    async findOneAndUpdate(collectionName, query, update, options) {
        const collection = database.getCollection(collectionName);
        return await collection.findOneAndUpdate(query, update, options);
    }

}

module.exports = new Mongodb();