const express =require('express')
const router = express.Router()

const categoryController=require('../controllers/Category')
const { checkAuth } = require('../../middlewares')

//category
router.post('/addCategory',checkAuth,categoryController.create)
router.get('/getAll',categoryController.getAll)

module.exports = router;