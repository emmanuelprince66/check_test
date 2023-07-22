import React from 'react'
import { Switch } from '@mui/material';
import { createTheme , ThemeProvider } from '@mui/material';

const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            display: 'flex',
          },
        },
      },
    },
  });

const SwitchIcon = () => {
  return (
    <div>
        <ThemeProvider theme={theme}>
      <Switch
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#DC0019', 
          opacity:1// Customize track background color when checked
        },
        '& .MuiSwitch-switchBase.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#52d869', // Customize thumb color when focused
          border: '6px solid #fff',
        },
        '& .MuiSwitch-switchBase': {
          padding: "1px",
          color: '#fff',
          '&.Mui-checked': {
            transform: 'translateX(15px)',
            color: '#fff',
          },
        },
        '& .MuiSwitch-thumb': {
          width: 24,
          height: 24,
          backgroundColor: '#f0f0f0', // Customize thumb background color
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          border: '1px solid #ccc',
          backgroundColor: '#f8f8f8', // Customize track background color
          opacity: 1,
          transition: 'background-color 0.4s ease-in-out, border 0.4s ease-in-out',
        },
      }}
    />
  </ThemeProvider>
    
    </div>
  )
}

export default SwitchIcon