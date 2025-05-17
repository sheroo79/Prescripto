import axios from "axios";

const token = localStorage.getItem('token')
  
export const axiosInstance = axios.create({
    baseURL: 'https://doc-q-book.vercel.app/api',
      headers : {
        Authorization : `Bearer ${token}`
      }
    })