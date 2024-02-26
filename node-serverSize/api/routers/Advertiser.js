const express =require('express')
const router = express.Router()

const advertiserController=require('../controllers/Advertiser')
const { checkAuth } = require('../../middlewares')

router.get('/advertiserLogin/:email/:password',advertiserController.advertiserLogin)
router.post('/advertiserRegister',advertiserController.advertiserRegister)
router.get('/forgetPassword/:email',advertiserController.forgetPassword)
router.get('/getall',advertiserController.getAll)

module.exports = router;