export const useMyLocation = () => {
   return new Promise((resolve, reject) => {
     if ('geolocation' in navigator) {
       navigator.geolocation.getCurrentPosition(
         (position) => {
           resolve(position.coords);
         },
         (error) => {
           reject(error);
         }
       );
     } else {
       reject(new Error('Geolocation is not supported on this device'));
     }
   });
 };