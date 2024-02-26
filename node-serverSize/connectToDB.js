const { mongoose } = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(process.env.LOCAL_URI)
}

const database = mongoose.connection;

database.on('error', (err) => {
    console.log({ error: err.message });
})

database.once('connected', () => {
    console.log('connect to DB!');
})

module.exports = connectDB