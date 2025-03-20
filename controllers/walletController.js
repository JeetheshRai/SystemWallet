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
            res.json({
                status: 'failed',
                message : 'Something went wrong. Please try again.'
            });
        }
    }
    
    async getWallet(req, res) {
        try {
            if (!req?.params?.walletId) {
                return res.json({ status: 'failed', message: 'Missing values.' });
            }
            const response =await walletService.getWallet(req?.params)
            res.json({
                status: 'success',
                data : response
            });
        } catch (error) {
            res.json({
                status: 'failed',
                message : 'Something went wrong. Please try again.'
            });
        }
    }
}

const walletControllerInstance = new WalletController();

router.post('/setup', walletControllerInstance.setupWallet.bind(walletControllerInstance));
router.get('/wallet/:walletId', walletControllerInstance.getWallet.bind(walletControllerInstance));

module.exports = router;
