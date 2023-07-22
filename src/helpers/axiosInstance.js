import Axios from 'axios'


export function axiosInstance(){

const AuthAxios= Axios.create({
baseURL: "https://check-server-api-staging.herokuapp.com/api/v1",
withCredentials: false
})


return {
AuthAxios
}

}

