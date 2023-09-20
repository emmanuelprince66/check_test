import axios from 'axios';

export default async (req, res) => {
  try {
console.log(req.query)
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: req.query
    });
console.log(response)
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
};
