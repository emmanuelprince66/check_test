import axios from 'axios'
export default async (req, res) => {
   const response = await axios.get(
     "https://maps.googleapis.com/maps/api/distancematrix/json",
     {
         params:req.query, // Forward all query parameters to Google's API
     }
   );
   console.log(req.query); // Log the query parameters
   res.json(response.data);
 }
