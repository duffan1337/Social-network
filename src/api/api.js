import * as axios from "axios"
import { useDebugValue } from "react"

export const instance =  axios.create({
    withCredentials:true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{ 
        'API-KEY':'efcf8f75-f08f-4404-9dda-313fdbd0cfb3'}  
})

export const usersAPI={
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`
        ).then(response => response.data)
    },
    follow(userId=1)  {
        return instance.post(`follow/${userId}`
        ).then(response => response.data)
    },
    unfollow(userId=1)  {
        return instance.delete(`follow/${userId}`
        ).then(response => response.data)
    },
    getProfile(userId=1) {

        console.warn("Obsolete method. Pleas profile API object ")

        return profileAPI.getProfile(userId)
    },      
}

export const profileAPI={
    getProfile(userId=1) {
        return instance.get(`profile/${userId}`
        ).then(response => response.data)
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`
        ).then(response => response.data)
    },
    updateStatus(status){
        return instance.put(`profile/status`,{status:status}
        ) 
    
    }
}


export const authAPI={
     Me() {
        return (instance.get(`auth/me`
        ).then(response => response.data))
    },
    login(email,password,rememberMe=false) {
        return instance.post(`auth/login`, {email,password,rememberMe})
        //.then(response => response.data))
    },

    logout() {
        return (instance.delete(`auth/login`
         ))
         //.then(response => response.data))
    }
}