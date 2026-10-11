import axios from "axios"

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    timeout: 3000
})


instance.interceptors.request.use(
    async (config) => {
        const jwttoken = localStorage.getItem("jwtToken")
        console.log("localstorage has no token", jwttoken)
        config.headers.Authorization = ` Bearer ${jwttoken}`
        return config
    }
)
instance.interceptors.response.use(
    async (response) => {
        console.log("localstorage has no token", response)
        if (response?.status === 401) {
            // return <Navigate to='/login'/>
        }
        return response;
    }
)
export default instance

// import axios from "axios";


// const axiosInstance = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/",
//     timeout: 3000,
// });

// // Request interceptor: attach JWT token
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const jwttoken = localStorage.getItem("jwtToken");
//         console.log("Token from localStorage:", jwttoken);
//         if (jwttoken) {
//             config.headers.Authorization = `Bearer ${jwttoken}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Response interceptor: handle 401
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             console.log("Unauthorized! Redirect to login.");
//             // Option 1: If inside a React component, useNavigate is better
//             // Option 2: Simple way: reload page to login
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;


