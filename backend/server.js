const app = require('./app');

const dotenv = require('dotenv');
const connectToDatabase = require('./database');

//Config
dotenv.config({ path: 'backend/config/config.env'})

//Connecting to database
connectToDatabase();

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port " + process.env.PORT);
})