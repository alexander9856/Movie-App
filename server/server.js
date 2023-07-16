require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// routes
app.all('/', ((req, res) => res.send({'message': 'the server is up and running'})));
app.use('/movies', require('./routes/api/movies'));

app.all('*', (req, res) => {
  res.status(404);
  res.json({ "error": "404 Not Found" });
});

const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err.message);
}

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});