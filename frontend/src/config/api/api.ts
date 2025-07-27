import axios from 'axios'

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})

apiInstance.interceptors.request.use(
    async (config) => {
        const token = window.localStorage.getItem('token') || undefined
        if (!token) return config
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    async (error) => {
        return await Promise.reject(error)
    }
)

export const api = apiInstance