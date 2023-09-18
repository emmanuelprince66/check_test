import express from 'express'
import axios from 'axios'
import cors from 'cors'
import { useSelector } from 'react-redux'
const app = express()
const {myLocation} = useSelector(state=>state.merchantReducer)
app.use(cors())
app.get('/geocode/latlng=:lat,:long&key=:key',async(req,res)=>{
  try {
    const apiKey = 'AIzaSyBmzSu1bNx4venaADcZGAuMnGlWoEBNKL4';
const {lat,long,key} = req.params
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng:`${lat},${long}`,
        key:key
      }, // Forward all query parameters to Google's API
    });
    console.log(req.query); // Log the query parameters
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }   
})
  
  app.listen(3001,()=>{
      console.log('Proxy server is running on http://localhost:3001');
    })