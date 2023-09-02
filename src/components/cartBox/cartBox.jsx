import { Avatar,Box, Grid } from '@mui/material'
export const CartBox = ({img}) => {
  return (
    <Grid sx={{width:'47%'}} item>

<Box>
<Avatar src={img} sx={{width:'100%',height:'90px'}} variant='rounded' alt='Menu Item Image'  />
</Box>

    </Grid>
  )
}
export default CartBox