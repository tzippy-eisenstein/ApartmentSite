const Apartment=require("../models/Apartment")
const Advertiser=require("../models/Advertiser")
const Category=require("../models/Category")
const City=require("../models/City")

const kelvinToCelsius = require('kelvin-to-celsius')
const dotenv = require('dotenv')
dotenv.config()

const request = require('request')

const Add= (req, res) => {
     console.log(req.body);   
    // Advertiser.findById({ _id: req.params.id })
    //     .then((a) => {
            const { name, description, idCategory, cityId, address, numOfBad, adition, cost, idAdvertiser } = req.body
            const { path:image } = req.file
    const apartment = new Apartment({
        name,
        description,
        image:image.replace('\\', '/'),
        idCategory,
        cityId,
        address,
        numOfBad,
        adition,
        cost,
        idAdvertiser
    })
console.log(apartment);
    return apartment.save()

        .then((a) => {
            Category.findByIdAndUpdate(idCategory, { $push: { apartments: a._id } }, { new: true })
                .then(() => {
                    Advertiser.findByIdAndUpdate(idAdvertiser, { $push: { apartments: a._id } }, { new: true }).
                        then(() => {
                            City.findByIdAndUpdate(cityId, { $push: { apartments: a._id } }, { new: true }).
                                then(() => {
                                    res.status(200).send(`Add apartment succeed`)
                                })
                        })
                })
        })
        .catch((error) => {
            res.status(500).send({ error: error.message })
        })
        }
    



const updateById = (req, res) => {
    const { id } = req.params;
    const { name, description, img, cost } = req.body;

    Apartment.findByIdAndUpdate(id, { name, description, img, cost }, { new: true })
        .then((updatedApartment) => {
            if (!updatedApartment) {
                return res.status(404).send({ error: 'Apartment not found' });
            }
            res.status(200).send(`Apartment ${updatedApartment._id} updated successfully`);
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
}

 const deleteById= (req, res) => {
    console.log(req.params.id);
    Apartment.findById({ _id: req.params.id })
        .then((apartment) => {
            console.log(apartment);
            // שווה לקוד מפרסם של הדירה הזו params בדיקה אם קוד מפרסם שהתקבל ב
            if (apartment.idAdvertiser != req.params.idAdvertiser)
                return res.status(400).send({ message: 'you cant delete this apartment' })
            //מחיקת הדירה ממערך הדירות בקטגוריה המתאימה
            Category.findByIdAndUpdate(apartment.idCategory, { $pull: { apartments: apartment._id } })
                .then(() => {
                    //מחיקת  הדירה ממערך הדירות בעיר המתאימה
                    City.findByIdAndUpdate(apartment.cityId, { $pull: { Apartments: apartment._id } })
                        .then(() => {
                            //מחיקת הדירה ממערך הדירות של המפרסם שלה
                            Advertiser.findByIdAndUpdate(apartment.idAdvertiser, { $pull: { Apartments: apartment._id } })
                                .then(() => {
                                    //מחיקת הדירה בעצמה
                                    apartment.deleteOne().
                                        then(() => {
                                            res.status(200).send({ message: `delete apartment succed!` })
                                        })
                                        .catch((e) => {
                                            res.status(500).send({ error: e.message })
                                        })
                                })
                                .catch((e) => {
                                    res.status(500).send({ error: e.message })
                                })
                        })
                        .catch((e) => {
                            res.status(500).send({ error: e.message })
                        })
                })
                .catch((e) => {
                    res.status(500).send({ error: e.message })
                })
        })
        .catch((e) => {
            res.status(500).send({ error: e.message })
        })
}

const getAll= (req, res) => {
    Apartment.find()
    .populate({ 
        path: 'cityId', 
        select: 'name', 
        strictPopulate: false 
    })
    .populate({ 
        path: 'idAdvertiser', 
        select: 'email aditionPhone phone' 
    })
    .populate({ 
        path: 'idCategory', 
        select: 'name' 
    })
        .then((Apartment) => {
            res.status(200).send(Apartment)
        })
        .catch((error) => {
            res.status(404).send({ error: error.message })
        })
    }

const getById = (req, res) => {
        const { id } = req.params;
        Apartment.findById(id)
        .populate({ 
            path: 'cityId', 
            select: 'name', 
            strictPopulate: false 
        })
        .populate({ 
            path: 'idAdvertiser', 
            select: 'email aditionPhone phone' 
        })
        .populate({ 
            path: 'idCategory', 
            select: 'name' 
        })
            .then((apartment) => {
                if (!apartment) {
                    return res.status(404).send({ error: 'Apartment not found' });
                }
                res.status(200).send(apartment);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    }

    const getByIdCategory = (req, res) => {
        const { idCategory } = req.params;
        Apartment.find({ idCategory: idCategory })
        .populate({ 
            path: 'cityId', 
            select: 'name', 
            strictPopulate: false 
        })
        .populate({ 
            path: 'idAdvertiser', 
            select: 'email aditionPhone phone' 
        })
        .populate({ 
            path: 'idCategory', 
            select: 'name' 
        })
            .then((apartments) => {
                if (apartments.length === 0) {
                    return res.status(404).send({ error: 'No apartments found for this category ID' });
                }
                res.status(200).send(apartments);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    }

    const getByIdCity = (req, res) => {
        const { cityId } = req.params;
        Apartment.find({ cityId: cityId })
        .populate({ 
            path: 'cityId', 
            select: 'name', 
            strictPopulate: false 
        })
        .populate({ 
            path: 'idAdvertiser', 
            select: 'email aditionPhone phone' 
        })
        .populate({ 
            path: 'idCategory', 
            select: 'name' 
        })
            .then((apartments) => {
                if (apartments.length === 0) {
                    return res.status(404).send({ error: 'No apartments found for this city ID' });
                }
                res.status(200).send(apartments);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    }

    const getByIdClient = (req, res) => {
        const { idAdvertiser } = req.params;
        Apartment.find({ idAdvertiser: idAdvertiser })
        .populate({ 
            path: 'cityId', 
            select: 'name', 
            strictPopulate: false 
        })
        .populate({ 
            path: 'idAdvertiser', 
            select: 'email aditionPhone phone' 
        })
        .populate({ 
            path: 'idCategory', 
            select: 'name' 
        })
            .then((apartments) => {
                if (apartments.length === 0) {
                    return res.status(404).send({ error: 'No apartments found for this city ID' });
                }
                res.status(200).send(apartments);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    }

    const getByPriceRange = (req, res) => {
        const { minPrice, maxPrice } = req.params;
        Apartment.find({ cost: { $gte: minPrice, $lte: maxPrice } })
        .populate({ 
            path: 'cityId', 
            select: 'name', 
            strictPopulate: false 
        })
        .populate({ 
            path: 'idAdvertiser', 
            select: 'email aditionPhone phone' 
        })
        .populate({ 
            path: 'idCategory', 
            select: 'name' 
        })
            .then((apartments) => {
                if (apartments.length === 0) {
                    return res.status(404).send({ error: 'No apartments found within this price range' });
                }
                res.status(200).send(apartments);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    }

    const getByNumOfBads = (req, res) => {
        const { numOfBeds } = req.params;
        Apartment.find({ numOfBad: { $lte: numOfBeds } })
        .populate({ 
            path: 'cityId', 
            select: 'name', 
            strictPopulate: false 
        })
        .populate({ 
            path: 'idAdvertiser', 
            select: 'email aditionPhone phone' 
        })
        .populate({ 
            path: 'idCategory', 
            select: 'name' 
        })
            .then((apartments) => {
                if (apartments.length === 0) {
                    return res.status(404).send({ error: 'No apartments found within this number of beds' });
                }
                res.status(200).send(apartments);
            })
            .catch((error) => {
                res.status(500).send({ error: error.message });
            });
    };




module.exports = { Add,getAll,getById,getByIdCategory,getByIdCity,getByIdClient,updateById,deleteById,getByPriceRange,getByNumOfBads}