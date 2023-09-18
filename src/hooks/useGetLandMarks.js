import axios from 'axios'
 export const getLandmarks = async(lat,long)=>{

   try {
      const response = await axios.get(`http://api.geonames.org/findNearbyPlaceNameJSON`, {
        params: {
          lat: lat,
          lng: long,
          username:'disuade'
          // format: 'json',
        },
      });
console.log(response)
    return   (response)

    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }

    const apiKey = 'AIzaSyBmzSu1bNx4venaADcZGAuMnGlWoEBNKL4';
  const endpoint = '/geocode/json';

  let url= `http://localhost:3001/geocode/`;
 const res = await axios.get(url,{  params: {
        latlng: `${lat},${long}`, // Replace with actual coordinates
        // radius: 1000, // Search radius in meters
        key: apiKey,
      },});
console.log(res)
    // try {
    //   const response = await axios.get(endpoint, {
    //     params: {
    //       latlng: lat,long, // Replace with actual coordinates
    //       // radius: 1000, // Search radius in meters
    //       key: apiKey,
    //     },
    //   });
    //   console.log(response)
    //   return response

    // } catch (error) {
    //   console.error(error);
    // }
  };
