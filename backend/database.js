const mongoose = require('mongoose');

const connectToDatabase = () => {
    mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`MongoDB connected to server: ${data.connection.port}`);
    })
    .catch(err => console.log(err))
}

module.exports = connectToDatabase;