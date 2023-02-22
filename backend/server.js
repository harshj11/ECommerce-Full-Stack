const app = require('./app');

const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const connectToDatabase = require('./database');
 
process.on('uncaughtException', (error) => {
    console.log(`Error: ${error.message}`);
    console.log("Shutting down the server due to Uncaught Exception...");
});

//Config
dotenv.config({ path: 'backend/config/config.env'})

//Connecting to database
connectToDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port " + process.env.PORT);
});

//Unhandled Promise Rejection
process.on('unhandledRejection', (error) => {
    console.log(`Error: ${error.message}`);
    console.log("Shutting down server due to Unhandled Rejection...");

    server.close(() => {
        //Exit code 1 is used when unhandled fatal exceptions occur that was not handled
        process.exit(1);
    })
})