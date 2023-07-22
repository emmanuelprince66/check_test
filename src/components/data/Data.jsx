import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import downIcon from "../../images/downIcon.svg"


const Data = () => {

const [ dnet , setDnet ] = useState("");
const [dataPackage , setDataPackage] = useState("")
const [phoneNo , setPhoneNo] = useState("")
const [textOne , setTextOne ] = useState(false)


const [isLoading, setIsLoading] = useState(false);


const [ phoneNoError , setPhoneNoError] = useState(false)


const handlePhoneNoBlur = () => {
    if (!phoneNo) {
      setPhoneNoError('Please enter your phone number');
      setTextOne(true)
    }
  };
  
  const handlePhoneNoChange = (event) => {
    const value = event.target.value;
    setPhoneNo(value);
    if(!value) {
    setPhoneNoError("Phone number cannot be empty")
    setTextOne(true)
    }else if(!/^0([89][01]|70)\d{8}$/i.test(value)) {
        setTextOne(true);
    setPhoneNoError("Invalid phone number")
    
    } 
    else {
        setTextOne(false)
      setPhoneNoError("")
    }
  };
  


const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Perform form submission logic
    if (phoneNo && dnet && dataPackage ) {
    
      setIsLoading(true);
      
      try {
        // Simulate an asynchronous request
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds

        // Perform form submission logic
        const formData = {
            dnet,
          phoneNo,
          dataPackage
        };
        console.log(formData); // You can access the form data here for further processing

        // Reset the form
        dnet('');
        phoneNo('');
        dataPackage('');
      } catch (error) {
        // Handle form submission error
        console.log('Form submission error:', error);
      } finally {
        // Stop the loading state
        setIsLoading(false);
        
      }
    } else {
      // Handle form submission error
      console.log('Form submission error: Please fill in all required fields.');
    }
   
    
   
  };

  return (
    <div>
    
    <form action="" className='gpt3__frecharge-formbox' onSubmit={handleSubmit}>
         
    <FormControl sx={{ 
    width: "327px" ,
    marginBottom:"1rem",
    maginX:"auto"
    }} variant="outlined" >
    <Typography htmlFor="input" sx={{paddingX:{xs:"15px" ,sm:"0px" ,md:"0px"}, fontWeight:600 , marginBottom:'1ch' , fontFamily:"raleWay" , fontSize:"16px"}}>Network</Typography>
     <TextField
       sx={{
           width: { xs: "300px", sm: "100%", md: "327px" },
           mx:"auto"
       }}
       value={dnet}
       disabled
       placeholder='Select Network '
       variant="outlined"
       id='rid'
       InputProps={{
          
           endAdornment:<InputAdornment><img src={downIcon} alt="e-logo" />&nbsp;&nbsp;</InputAdornment>
       }}
       aria-describedby="outlined-weight-helper-text"
       inputProps={{
         'aria-label': 'weight',
       }}
     />
   </FormControl>
   
   
    <FormControl sx={{ 
    width: "327px" ,
    marginBottom:"1rem",
    maginX:"auto"
    }} variant="outlined" >
    <Typography htmlFor="input" sx={{paddingX:{xs:"15px" ,sm:"0px" ,md:"0px"}, fontWeight:600 , marginBottom:'1ch' , fontFamily:"raleWay" , fontSize:"16px"}}>Available Bundles</Typography>
     <TextField
       sx={{
           width: { xs: "300px", sm: "100%", md: "327px" },
           mx:"auto"
       }}
       value={dataPackage}
       disabled
       placeholder='Select Package '
       variant="outlined"
       id='rid'
       InputProps={{
          
           endAdornment:<InputAdornment><img src={downIcon} alt="e-logo" />&nbsp;&nbsp;</InputAdornment>
       }}
       aria-describedby="outlined-weight-helper-text"
       inputProps={{
         'aria-label': 'weight',
       }}
     />
   </FormControl>
    
    
   <FormControl sx={{ 
    width: "327px" ,
    marginBottom:"1rem",
    maginX:"auto"
    }} variant="outlined" >
    <Typography htmlFor="input" sx={{paddingX:{xs:"15px" ,sm:"0px" ,md:"0px"}, fontWeight:600 , marginBottom:'1ch' , fontFamily:"raleWay" , fontSize:"16px"}}>Mobile Number</Typography>
     <TextField
       sx={{
           width: { xs: "300px", sm: "100%", md: "327px" },
           mx:"auto",
           '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: `${ textOne ? "#DC0019" : "#CACACA"}`, // Set the desired border color here
            },
            '&:hover fieldset': {
              borderColor: `${ textOne ? "#DC0019" : "#CACACA"}`, // Set the border color on hover here
            },
            '&.Mui-focused fieldset': {
              borderColor: `${ textOne ? "#DC0019 ": "#C57600"}` , // Set the border color on focus here
            },
          },
           
       }}
       onChange={handlePhoneNoChange}
       onBlur={handlePhoneNoBlur}
       value={phoneNo}
       helperText={phoneNoError && <span>{phoneNoError}</span>}
       required
       placeholder='E.G. 09027839393'
       variant="outlined"
       id='rid'
     
       aria-describedby="outlined-weight-helper-text"
       inputProps={{
         'aria-label': 'weight',
       }}
     />
     
    
     
   </FormControl>
    
       
   <div className='gpt3__frecharge-sub'>
   <button type='submit' disabled={isLoading}>{ isLoading ? <CircularProgress size="1.2rem" color="inherit" /> : "Proceed"}</button>

        </div>
    
    
    
    </form>
    
    
    
    </div>
  )
}

export default Data