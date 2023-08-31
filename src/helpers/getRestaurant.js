import axios from "axios";
import Cookies from "js-cookie";


axios.interceptors.request.use(

    function(config){
        let  token = Cookies.get('authToken')
                    if(token){
                        config.headers.Authorization = `Bearer ${token}`
                        console.log(token)
                    }
                
                return config;
            }   , 
        function(error)  {
            return Promise.reject(error)
        }
)

export const getRestaurant= async (restaurantId) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/table/${restaurantId}`;
  const restaurant = axios({
    url,
  }).then((res) => res.data);

  return restaurant;
};
