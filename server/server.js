import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/geocode', async (req, res) => {
  try {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

    const { latlng, key } = req.params;
    console.log(req.query,'milk')
    

    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: req.query
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get(
  "/distance",
  async (req, res) => {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
          params:req.query, // Forward all query parameters to Google's API
      }
    );
    console.log(req.query); // Log the query parameters
    res.json(response.data);
  }
);

app.listen(3001, () => {
  console.log('Proxy server is running on http://localhost:3001');
});