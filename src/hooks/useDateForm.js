
export const date  = (payload)=>{
   const date = new Date(payload);

   const options = {
     year: 'numeric',
     month: 'numeric',
     day: 'numeric',
     hour: 'numeric',
     minute: 'numeric',
     hour12: true
   };
   
   const formattedDate = date.toLocaleString('en-US', options);
   
   return(formattedDate);
   
}
