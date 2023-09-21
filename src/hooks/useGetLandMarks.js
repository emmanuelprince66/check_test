import axios from 'axios'
 export const getLandmarks = async({resCoords,userCoords})=>{


    const apiKey = 'AIzaSyBmzSu1bNx4venaADcZGAuMnGlWoEBNKL4';

  // const res = await axios.get('/api/geocode', {
  //   params: {
  //     latlng: `${userCoords.lat},${userCoords.long}`,
  //     key: apiKey,
  //   },
  // });
  
  const poop = await axios.get('/api/distance', {
    params: {
      units: 'metrics',
      origins: `${userCoords.lat},${userCoords.long}`,
      destinations: `${resCoords.lat},${resCoords.long}`,
      key: apiKey,
    },
  });
  
return poop


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
