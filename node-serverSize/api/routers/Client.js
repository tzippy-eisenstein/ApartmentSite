const express =require('express')
const router = express.Router()

const ClientController=require('../controllers/Client')

//client
router.post('/clientRegister',ClientController.clientRegister)
router.get('/clientLogin/:email/:password',ClientController.clientLogin)

module.exports = router;