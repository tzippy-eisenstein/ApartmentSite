import axios from "axios"

export const GetAllCity=()=>{
    return axios.get(`http://localhost:3001/city/getAll`)
}

export const AddCity=(City)=>{
    const token =localStorage.getItem('token')
    return axios.post(`http://localhost:3001/city/Add`,City,{ headers: { 'Authorization': token } })
}



