import React from "react"
import { useSelector } from "react-redux";
const Restaurant = ()=> {

    const merchantDetails = useSelector((state) => state.merchantReducer.data);
    console.log(merchantDetails)


    return(
        <div className="gpt3_home" >
            Inside {merchantDetails.restaurant.companyName}
        </div>    )

}
export default Restaurant