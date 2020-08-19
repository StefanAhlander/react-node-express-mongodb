require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const postsRoute = require('./routes/posts');

app.get('/', (req, res) => {
  res.send('This is the landing page');
});

app.use('/posts', postsRoute);

mongoose.connect(
  process.env.DATABASE_CONNECTION_STRING,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to DB');
  }
);

app.listen(5000);
