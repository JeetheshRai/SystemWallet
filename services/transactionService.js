const { transactionsGateway, walletsGateway } = require("../gateway")
const { ObjectId } = require("mongodb");

class transactionService {
    async getTransaction(params) {
        try {
            const walletInfo = await walletsGateway.getInfo({ query: { _id: new ObjectId(params.walletId) } })
            if (!walletInfo) {
                throw { message: 'Wallet information not found.' }
            }
            const count = await transactionsGateway.count({ query: { wallet_id: new ObjectId(params.walletId) } })
            const transactionList = await transactionsGateway.getList({ query: { wallet_id: new ObjectId(params.walletId) }, skip: params.skip, limit: params.limit, sort: params.sort })
            return { transactionList, count }
        } catch (error) {
            throw error
        }
    }

    async submitTransaction(params) {
        try {
            const walletInfo = await walletsGateway.getInfo({ query: { _id: new ObjectId(params.walletId) } })
            if (!walletInfo) {
                throw { message: 'Wallet information not found.' }
            }
            if (!params.isCredit && walletInfo.balance < params.amount) {
                throw { message: 'Balance is Low to Debit transaction' }
            }
            let balance = parseFloat(params.isCredit ? walletInfo.balance + params.amount : walletInfo.balance - params.amount)
            let transactionObj = {
                wallet_id: new ObjectId(params.walletId),
                amount: parseFloat(params.amount),
                balance: parseFloat(balance),
                description: params.description,
                date: new Date(),
                type: params.isCredit ? 'CREDIT' : 'DEBIT'
            }
            const transactionId = await transactionsGateway.insertOne({record:transactionObj})
            await walletsGateway.findOneAndUpdate({query:{ _id: new ObjectId(params.walletId) },update:{$set:{balance:balance}}})
            return {balance , transaction_id : transactionId}
        } catch (error) {
            throw error
        }
    }
}
module.exports = new transactionService()