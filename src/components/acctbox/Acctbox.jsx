import React from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import plusLogo from "../../images/plusLogo.svg"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card , Typography , Box } from '@mui/material';
import { useTheme } from '@mui/material'




const Acctbox = () => {
const navigate = useNavigate()
const currentTheme = useTheme();


    const [isTextVisible, setIsTextVisible] = useState(false);

  return (
      
    <>
    <Card 
    sx={{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"start",
    padding:"16px",
    background:currentTheme.palette.mode = 'light'
    ? "rgba(220, 0, 25, 0.1)" :
    "#1e1e1e",
    borderRadius:"8px",
    marginTop:"1rem"
    }}
    >
    
    <Box 
    sx={{
    display:"flex",
    flexDirection:"column",
    gap:"1rem"
    }}
    >
      <Typography sx={{
      fontFamily:"raleWay",fontWeight:"600"}}>Wallet Balance</Typography>
      
      { isTextVisible  ? <Typography sx={{
      fontFamily:"raleWay",
      fontWeight:"600"
      }} >24,0000</Typography> : <Typography sx={{
        fontFamily:"raleWay",
        fontWeight:"600"
        }} >****************</Typography>}
    
    </Box>
    
    <Box sx={{
     display:"flex",
     flexDirection:"row",
     alignItems:"center",
     padding:"4px 8px",
     gap:"8px",
     width:"66px",
     height:"28px",
     borderRadius:"8px",
     background:" rgba(220, 0, 25, 0.1)"
    }}>
    { isTextVisible ? 
        <Visibility sx={{  color:"#C57600"  , fontSize:"15px"}} onClick={() => setIsTextVisible(false)}    />  
        : <VisibilityOff sx={{  color:"#C57600"  , fontSize:"15px"}} onClick={()=> setIsTextVisible(true)} /> }
     <Typography
     sx={{ 
     color: currentTheme.palette.type === 'light'? "#1e1e1e" : "#ffff",
     fontFamily:"raleWay",fontWeight:"400",
     letterSpacing:"-0.24px",
     textAlign:"center",
     lineHeight:"20px",
     fontSize:"10px"
     }}>show</Typography>
    </Box>
    
    
    
    </Card>
    
    </>
  )
}

export default Acctbox