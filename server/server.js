const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5050;

//Deployment task
app.use(express.json());


const uri = process.env.ATLAS_URI

const options = {
    autoIndex: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, options);

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('MongoDB Connection established successfully !')
});

//Routes
const loginRouter = require('./routes/Login.js');
const userRouter = require('./routes/User.js');

app.use('/auth/', loginRouter);
app.use('/api/users/', userRouter)

app.listen(PORT, () => {
    console.log(`Service is running on Port: ${PORT}`)
});