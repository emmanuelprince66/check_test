import { Container,Box ,Button,Typography} from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BackArrow from '../../components/backArrow/BackArrow';
import { useSelector } from 'react-redux'
import { date } from '../../hooks/useDateForm';
const RestaurantReceipt = () => {
   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        color: theme.palette.common.black,
        fontWeight:'700',
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
    
   const {receiptInView,userDetails}= useSelector(state=>state.merchantReducer)
  return (
   <Container sx={{padding:'1em 1em'}} >
      <BackArrow/>
  
    <Container sx={{padding:'0em',overflowY:'auto',marginBottom:'150px', display:'flex',flexDirection:'column',gap:'.5em'}} >
   <Box sx={{backgroundColor:'#EAEAEA',padding:'1em',borderRadius:'1em'}} >

<Box sx={{display:'flex',justifyContent:'space-between'}} >
   <Typography  fontWeight={700} > PURCHASE RECEIPT</Typography>
   <Typography> ID</Typography>
</Box>
<Box sx={{display:'flex',justifyContent:'space-between'}} >
   <span>DATE & TIME: </span>
   <span style={{fontWeight:'600'}}> {date(receiptInView?.createdAt)} </span>
</Box>
<Box sx={{display:'flex',justifyContent:'space-between'}} >
   <span>MERCHANT: </span>
   <span style={{fontWeight:'600'}}>{receiptInView?.restaurant?.companyName} </span>
</Box>
<Box sx={{display:'flex',justifyContent:'space-between'}} >
   <span>CUSTOMER:</span>
   <span style={{fontWeight:'600'}} > {userDetails?.firstName} &nbsp;{userDetails?.lastName} </span>
</Box>
   </Box>

{
   receiptInView.orders.map((item,i)=>{
      return (
         <Box key={i} >
   <Typography fontWeight={600} sx={{textDecoration:'underline'}} > Order {i + 1} ({item.orderType}) </Typography>

   <TableContainer sx={{boxShadow:'none'}} component={Paper}>
      <Table sx={{  }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ITEM NAME</StyledTableCell>
            <StyledTableCell align="right">QTY</StyledTableCell>
            <StyledTableCell align="right">UNIT PRICE/(N)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item.menuItems.map((item,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="item">
                {item.menu.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.quantity}</StyledTableCell>
              <StyledTableCell align="right">{item.menu.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</Box>

      )
   })

}  
<Box  sx={{display:'flex', borderTop:'1px solid grey',marginTop:'4em',padding:'.5em', justifyContent:'space-between'}}>

<Typography> TOTAL </Typography>
<Typography fontWeight={600} sx={{color:'var(--currency-green)'}} > {receiptInView.totalAmount} </Typography>

</Box>
<Box sx={{display:'flex', margin:'auto', width:{xs:'90%' , sm:'80%',md:'70%'},gap:'1em',flexDirection:'column'}} >
  <Button sx={{backgroundColor:'var(--primary-red)', textTransform:'none',padding:'1em 0',color:'white'}} > Download </Button>
  <Button sx={{border:'1px solid var(--primary-red)', textTransform:'none',padding:'1em 0',color:'var(--primary-red)'}} > Share </Button>
</Box>




  </Container>
  </Container>
  )
}
export default RestaurantReceipt