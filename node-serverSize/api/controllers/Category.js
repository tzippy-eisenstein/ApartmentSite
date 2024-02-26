const Category = require('../models/Category')

module.exports={
getAll: (req, res) => {
    Category.find()
    .populate({path:'apartments',select:'name',strictPopulate:false })
        .then((categories) => {
            res.status(200).send(categories)
        })
        .catch((error) => {
            res.status(404).send({ error: error.message })
        })
    },
    create: (req, res) => {
        const {
            apartments,
            name
        } = req.body
        
        const category = new Category({ name, apartments })
        category.save()
            .then((category) => {
                res.status(200).send(`Create category ${category._id} succeed`)
            })
            .catch((error) => {
                res.status(404).send({ error: error.message })
            })

    },

}