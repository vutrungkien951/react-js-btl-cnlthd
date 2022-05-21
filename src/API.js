import axios from "axios"
import cookie from 'react-cookies'


export const endpoints = {
    'chuyenxe': '/chuyenxe/',
    'sign-up' : '/user/',
    'login': '/o/token/',
    'chi-tiet-chuyen-xe': (chuyenXeId) => `/chuyenxe/${chuyenXeId}/`,
    'nguoidung': '/user/current-user/',
    'comments': '/comments/',
    'chuyenxe-comments': (chuyenXeId) => `/chuyenxe/${chuyenXeId}/comments/`,
    'datve': '/datve/',
    'like-chuyenxe': (chuyenXeId) => `/chuyenxe/${chuyenXeId}/like/`,
    'rate-chuyenxe' : (chuyenXeId) => `/chuyenxe/${chuyenXeId}/rating/`,
}

export const authAxios = () => axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Authorization": `Bearer ${cookie.load('access_token')}`
    }
})

export default axios.create({
    baseURL: "http://localhost:8000"
})