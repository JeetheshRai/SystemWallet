const GenericGateway = require('./generic-gateway');

module.exports = {
    walletsGateway: new GenericGateway('wallets'),
    transactionsGateway: new GenericGateway('transactions'),
}