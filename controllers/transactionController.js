const express = require('express');
const transactionService = require('../services/transactionService');
const file_streamUtil = require('../utils/file_stream.util');
const router = express.Router();

class transactionController {
    async getTransaction(req, res) {
        try {
            if (!req?.query?.walletId || !req?.query?.skip || !req?.query?.limit) {
                return res.json({ status: 'failed', message: 'Missing values.' });
            }
            req.query.skip = parseInt(req?.query?.skip)
            req.query.limit = parseInt(req?.query?.limit)
            req.query.sort = JSON.parse(req?.query?.sort)
            const response =await transactionService.getTransaction(req.query)
            res.json({
                status: 'success',
                data : response
            });
        } catch (error) {
            res.json({
                status: 'failed',
                message : error?.message || 'Something went wrong. Please try again.'
            });
        }
    }

    async submitTransaction(req, res) {
        try {
            if (!req?.params?.walletId || !req?.body?.hasOwnProperty('isCredit') || !req?.body?.amount) {
                return res.json({ status: 'failed', message: 'Missing values.' });
            }
            req.body.walletId = req?.params?.walletId
            const response =await transactionService.submitTransaction(req.body)
            res.json({
                status: 'success',
                data : response
            });
        } catch (error) {
            res.json({
                status: 'failed',
                message : error?.message || 'Something went wrong. Please try again.'
            });
        }
    }

    async downloadCSV(req, res) {
        try {
            if (!req?.params?.walletId) {
                return res.json({ status: 'failed', message: 'Missing values.' });
            }
            let custom_name = req?.params?.walletId+'_'+new Date().getTime()+'.csv'
            req.params.file_path =  './uploads/'+ custom_name
            await transactionService.downloadCSV(req?.params)
            res.download(req.params.file_path,custom_name, (err) => {
                file_streamUtil.unLink(req.params.file_path).catch(error => {})
                if (err) {
                    res.status(500).send('Failed to download CSV');
                }
            });
        } catch (error) {
            res.json({
                status: 'failed',
                message : error?.message || 'Something went wrong. Please try again.'
            });
        }
    }
}

const transactionControllerInstance = new transactionController();

router.get('/transactions', transactionControllerInstance.getTransaction.bind(transactionControllerInstance));
router.post('/transact/:walletId', transactionControllerInstance.submitTransaction.bind(transactionControllerInstance));
router.get('/downloadCSV/:walletId', transactionControllerInstance.downloadCSV.bind(transactionControllerInstance));

module.exports = router;
