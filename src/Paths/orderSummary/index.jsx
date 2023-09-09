import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BackArrow from '../../components/backArrow/BackArrow';
import { Box, Container, Typography } from '@mui/material';
const OrderSummary = () => {
const params = useParams()
let orderIndex = Number(params.id) - 1 
console.log(orderIndex)
   const {orders}  = useSelector((state)=>state.merchantReducer)

   const orderSummary = orders[orderIndex].cart
   const amount = orders[orderIndex].amount
console.log(orderSummary)
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


  return (
    <div className="gpt3__restaurant" >
    <BackArrow/>
    <Typography fontWeight={700} fontSize={'1.5em'} > Order {params.id} </Typography>
    <TableContainer component={Paper}>
      <Table sx={{  }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ITEM NAME</StyledTableCell>
            <StyledTableCell align="right">QTY</StyledTableCell>
            <StyledTableCell align="right">UNIT PRICE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderSummary.map((item,i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="item">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.count}</StyledTableCell>
              <StyledTableCell align="right">{item.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

<hr/>

<Box  sx={{display:'flex', justifyContent:'space-between'}}>

<Typography> TOTAL </Typography>
<Typography fontWeight={600} sx={{color:'var(--currency-green)'}} > {amount} </Typography>

</Box>

    </div>
  )
}
export default OrderSummary