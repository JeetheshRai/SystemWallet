const fs = require('fs');

class fileStream {

    async createFolder(path) {
        try {
            return new Promise((resolve,reject)=>{
                fs.mkdir(path, { recursive: true }, (err) => {
                    if (err) {
                      reject(err)
                    }
                    resolve({status: 'success' , message : 'File created successfully'})
                  });
            })
        } catch (error) {
            throw error
        }
    }
    
    existsSync(path) {
        try {
            if(fs.existsSync(path)){
                return true
            } 
            return false
        } catch (error) {
            throw error
        }
    }

    unLink(csvFilePath){
        try {
            return new Promise((resolve,reject)=>{
                fs.unlink(csvFilePath, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({status: 'success' , message : 'File Removed.'})
                    }
                });
            })
        } catch (error) {
            throw error
        }
    }

}

module.exports = new fileStream();