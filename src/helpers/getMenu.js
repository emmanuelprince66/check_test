import axios from "axios";
// import Cookies from "js-cookie";


// axios.interceptors.request.use(

//     function(config){
//         let  token = Cookies.get('authToken')
//                     if(token){
//                         config.headers.Authorization = `Bearer ${token}`
//                         console.log(token)
//                     }
                
//                 return config;
//             }   , 
//         function(error)  {
//             return Promise.reject(error)
//         }
// )

export const getMenu= async (MenuId) => {
  const url = `https://check-server-api-staging.herokuapp.com/api/v1/restaurant/${MenuId}`;
  const Menu = axios({
    url,
  }).then((res) => res.data);

  return Menu;
};
