const { v4: uuidv4 } = require('uuid');
const { walletsGateway } = require('../gateway');
class WalletServices {
    async setUpWalletInit(params){
        try {
            const { balance, name } = params;
    
            const newWallet = {
                // transaction_id: uuidv4(),
                balance: parseFloat(balance),
                name,
                date: new Date(),
            };
            const walletInfo = await walletsGateway.insertOne({record:newWallet})
            newWallet._id = walletInfo
            return newWallet
            
        } catch (error) {
            throw error
        }
    }
}
module.exports = new WalletServices()