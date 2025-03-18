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
}

module.exports = GenericGateway
