const City=require("../models/City")
const kelvinToCelsius = require('kelvin-to-celsius')
const dotenv = require('dotenv')
dotenv.config()

const request = require('request')


const getWeather = (req, res) => {
    const requestApi = () => {
        return new Promise((resolve, reject) => {
            request(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.city},&appid=29e21eb08b02f857be9490804657ae5c`,
                (err, res, body) => {
                    if (err)
                        reject(err)
                    else
                        resolve(body)
                })
        })
    }
}
const Add = (req, res) => {
    const { name, apartments } = req.body
    
    const newCity = new City({ name, apartments })
    newCity.save()
        .then((City) => {
            res.status(200).send(`Create City ${City._id} succeed`)
        })
        .catch((error) => {
            res.status(404).send({ error: error.message })
        })
}

const getAll= (req, res) => {
    City.find()
    .populate({path:'Apartments',select:'name',strictPopulate:false })
        .then((City) => {
            res.status(200).send(City)
        })
        .catch((error) => {
            res.status(404).send({ error: error.message })
        })
    }


module.exports = { getWeather,Add,getAll }