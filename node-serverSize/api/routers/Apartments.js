const express =require('express')
const router = express.Router()

const apartmentController=require('../controllers/Apartments')
const { checkAuth, upload } = require('../../middlewares')

//apartments
router.post('/add',upload.single('image'),apartmentController.Add)
router.get('/getAll',apartmentController.getAll)
router.get('/getById/:id',apartmentController.getById)
router.get('/getByIdCategory/:idCategory',apartmentController.getByIdCategory)
router.get('/getByIdCity/:cityId',apartmentController.getByIdCity)
router.get('/getByIdClient/:idAdvertiser',checkAuth,apartmentController.getByIdClient)
router.put('/updateById/:id',checkAuth,apartmentController.updateById)
router.delete('/deleteById/:id/:idAdvertiser',apartmentController.deleteById)
router.get('/getByPriceRange/:minPrice/:maxPrice',apartmentController.getByPriceRange)
router.get('/getByNumOfBads/:numOfBeds',apartmentController.getByNumOfBads)
module.exports = router;