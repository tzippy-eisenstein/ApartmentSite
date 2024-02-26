import axios from "axios"

export const getAllApartments=()=>{
    return axios.get(`http://localhost:3001/Apartment/getAll`)
}

export const getByIdCategory =(id)=>{
  return axios.get(`http://localhost:3001/Apartment/getByIdCategory/${id}`)
}

export const getByIdCity =(id)=>{
    return axios.get(`http://localhost:3001/Apartment/getByIdCity/${id}`)
}

export const getByPriceRange =(min,max)=>{
    return axios.get(`http://localhost:3001/Apartment/getByPriceRange/${min}/${max}`)
}

export const getByNumOfBads =(num)=>{
    return axios.get(`http://localhost:3001/Apartment/getByNumOfBads/${num}`)
}

export const getByIdClient =(id)=>{
    const token =localStorage.getItem('token')
    return axios.get(`http://localhost:3001/Apartment/getByIdClient/${id}`,{ headers: { 'Authorization': token } })
}

export const addApartment =(Apartment)=>{
    const token =localStorage.getItem('token')
    return axios.post(`http://localhost:3001/Apartment/add`,Apartment,{ headers: { 'Authorization': token } })
}

export const deleteApartment =(id,idAdvertiser)=>{
    return axios.delete(`http://localhost:3001/Apartment/deleteById/${id}/${idAdvertiser}`)
}

