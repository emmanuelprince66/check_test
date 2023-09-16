import axios from 'axios'
 export const getLandmarks = async(lat,long)=>{

   try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat: lat,
          lon: long,
          format: 'json',
        },
      });

    return   (response)

    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }

}