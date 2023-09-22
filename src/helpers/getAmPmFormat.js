export const  convertTo12HourFormat=(timeString)=> {
   const [hours, minutes] = timeString.split(':');
   let period = 'AM';
 
   let hoursInt = parseInt(hours, 10);
   if (hoursInt >= 12) {
     period = 'PM';
     if (hoursInt > 12) {
       hoursInt -= 12;
     }
   }
 
   return `${hoursInt}:${minutes} ${period}`;
 }
 
 