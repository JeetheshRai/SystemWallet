const { mongodb } = require("../database/index.js");
class GenericGateway {

    constructor(collectionName) {
        this.collectionName = collectionName
    }

    insertOne(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await mongodb.insertOne(
                    this.collectionName,
                    params.record
                );
                if(data.acknowledged && data.insertedId){
                    resolve(data.insertedId);
                }else{
                    reject(data);
                }
            } catch (err) {
                reject(err);
            }
        })
    }
    
    getInfo(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const record = await mongodb.getInfo(
                    this.collectionName,
                    params.query,
                    params.projection,
                    params.sort
                );
                resolve(record)
            } catch (error) {
                reject(error)
            }
        })
    }
    
    getList(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const record = await mongodb.getList(
                    this.collectionName,
                    params.query,
                    params.projection,
                    params['sort'],
                    params.skip,
                    params.limit
                );
                resolve(record);
            } catch (err) {
                reject(err);
            }
        })
    }
    
    count(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await mongodb.count(
                    this.collectionName,
                    params.query
                );
                resolve(data);
            } catch (err) {
                reject(err)
            }
        })
    }

    findOneAndUpdate(params) {
        return new Promise(async (resolve, reject) => {
            try {
                const options = params.options || { returnDocument: 'after' }
                const data = await mongodb.findOneAndUpdate(
                    this.collectionName,
                    params.query,
                    params.update,
                    options
                );
                resolve(data.value);
            } catch (err) {
                reject(err);
            }
        })
    }

}

module.exports = GenericGateway
