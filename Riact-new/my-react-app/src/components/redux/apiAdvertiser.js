import axios from "axios"

export const LoginAdvertiser=(email,password)=>{
    return axios.get(`http://localhost:3001/advertiser/advertiserLogin/${email}/${password}`)
}
export const registeAdvertiser=(Client)=>{
    return axios.post(`http://localhost:3001/advertiser/advertiserRegister`,Client)
}

export const forgetPassword=(email)=>{
    return axios.get(`http://localhost:3001/advertiser/forgetPassword/${email}`)
}

export const getAll=()=>{
    return axios.get(`http://localhost:3001/advertiser/getAll`)
}

