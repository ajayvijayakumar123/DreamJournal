const express = require('express'); 
const cors = require('cors');
const mongoose = require('mongoose'); //helps connect to mongodb

require('dotenv').config();

const app = express(); //creates express server
const port = process.env.PORT || 5000; //port that server will run on

app.use(cors()); //cors middleware
app.use(express.json()); //parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } //udjust for updates to mongoose
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); //starts listening, starts port
});

//nodemon server -- in terminal, runs server on port 5000
