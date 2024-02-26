// http://localhost:3001/category/
import axios from "axios"

export const GetAllCategory=()=>{
    return axios.get(`http://localhost:3001/category/getAll`)
}

export const AddCategory=(Category)=>{
    const token =localStorage.getItem('token')
    return axios.post(`http://localhost:3001/category/addCategory`,Category,{ headers: { 'Authorization': token } })
}

