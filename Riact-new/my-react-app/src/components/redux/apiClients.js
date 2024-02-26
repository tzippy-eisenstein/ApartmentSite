import axios from "axios"

export const GetAllCategory=()=>{
    return axios.get(`http://localhost:3001/category/getAll`)
}

export const LoginClient=(email,password)=>{
    return axios.get(`http://localhost:3001/clients/clientLogin/${email}/${password}`)
}

export const getAll=(email,password)=>{
    return axios.get(`http://localhost:3001/clients/clientLogin/${email}/${password}`)
}
export const registerClient=(Client)=>{
    return axios.post(`http://localhost:3001/clients/clientRegister`,Client)
}

