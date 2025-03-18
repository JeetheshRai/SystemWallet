const express = require('express');
const walletService = require('../services/walletService');
const router = express.Router();

class WalletController {
    async setupWallet(req, res) {
        try {
            if (!req?.body?.name) {
                return res.json({ status: 'failed', message: 'Missing name.' });
            }
            const response =await walletService.setUpWalletInit(req.body)
            res.json({
                status: 'success',
                data : response
            });
        } catch (error) {
            
        }
    }
}

const walletControllerInstance = new WalletController();

router.post('/wallet/setup', walletControllerInstance.setupWallet.bind(walletControllerInstance));

module.exports = router;
