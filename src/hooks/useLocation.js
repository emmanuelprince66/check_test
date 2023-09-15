export const useMyLocation=()=>{
   if ( 'geolocation' in navigator ){
navigator.geolocation.getCurrentPosition(
   (position)=>{
console.log(position.coords)
   },
   (error)=>{
      console.log(error)
   }
)
   }
   else{

   }

}
