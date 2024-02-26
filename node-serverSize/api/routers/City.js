const express =require('express')
const router = express.Router()

const cityController=require('../controllers/City')
const { checkAuth } = require('../../middlewares')

//cities
router.post('/Add',checkAuth,cityController.Add)
router.get('/getAll',cityController.getAll)
router.get('/getWeather',cityController.getWeather)

module.exports = router;