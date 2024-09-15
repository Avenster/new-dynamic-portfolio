const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// const UNSPLASH_API_KEY = 'HuqR1mfr42YPhidz7-yaVmDftQA826GBldApBJ5MBAo';
const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/fetch-images', async (req, res) => {
  try {
    const { query, count } = req.query;
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        per_page: count || 3,
        client_id: process.env.UNSPLASH_API_KEY
      }
    });
    const images = response.data.results.map(image => image.urls.regular);
    res.json(images);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while fetching images' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});