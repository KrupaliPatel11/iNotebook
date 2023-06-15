const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
const authRoute = require('./routes/user');
const noteRoute = require('./routes/notes');
const cors = require('cors');

// Connect to mongoDB
const connect = mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', () => {
    console.log('Connected to mongoDB');
})

const app = express();
const port = process.env.PORT

app.use(cors())
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Available Route
app.use('/user', authRoute);
app.use('/user', noteRoute);



app.listen(port, () => {
    console.log(`Listning at http://localhost:${port}  `)
})

