import React from 'react'
import  messageLogo from "../../images/messageLogo.svg"
import barLogo from "../../images/barLogo.svg"
import beltLogo from "../../images/beltLogo.svg"
import upLogo from "../../images/upLogo.svg"
import { Link } from 'react-router-dom'
import './Qacess.css'
import { Typography } from '@mui/material'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material'







const Qacess = () => {
  const currentTheme = useTheme();

  const MyTypography = styled(Typography)(({ theme }) => ({
    color: currentTheme.palette.type === 'light' ? "#373737" : "#fff",
    fontSize: '14px',
    fontFamily:"raleWay",
    fontWeight:400
  }));
  
  return (
    <div className='gpt3__q'>
    
    
      <div className='gpt3__q-item' >
      <Link to="/frecharge">
      <img src={messageLogo} alt="m-logo" />
      <MyTypography sx={{marginTop:"-0.2px"}} >Recharge</MyTypography>
      </Link>
      </div>
      
      <div className='gpt3__q-item' >
      <Link to="/frecharge">
      <img src={barLogo} alt="b-logo" />
      <MyTypography sx={{marginTop:"6px"}}>Data</MyTypography>
      
      </Link>
      </div>
      <div className='gpt3__q-item'>
      
      <Link to="/fwithdraw">
      <img src={upLogo} alt="u-logo" />
      <MyTypography  sx={{marginTop:"7px"}} >Withdraw</MyTypography>
      
      </Link>
      </div>
      
      
      <div className='gpt3__q-item'>
      <Link to="/paybills">
      <img src={beltLogo} alt="be-logo" />
      <MyTypography  sx={{marginTop:"6px"}} > Pay Bills</MyTypography>
      
      </Link>
   
      </div>
    
    </div>
  )
}

export default Qacess