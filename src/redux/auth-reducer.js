import { stopSubmit } from 'redux-form'
import {authAPI} from '.././api/api'
const SET_USER_DATA='samurai-network/SET_USER_DATA'


let initialState ={
    id: null,
    email: '',
    login: '',
    isFetching: false,
    isAuth:false

}

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_USER_DATA:
            return{
                ...state,
                ...action.payload,
                isAuth:action.payload.isAuth
            }
    }
    return state
}

export const setAuthUserData=(id,email,login, isAuth)=>({type: SET_USER_DATA, payload:{id,email,login, isAuth}})

export const getAuthUserData = () => async(dispatch)=>{
    //return(dispatch)=>{
        let data = await authAPI.Me()
            if(data.resultCode===0)
            {
                let {id,email,login}=data.data
                dispatch(setAuthUserData(id,email,login, true));
            }
    }


    export const login = (email,password, rememberMe) => async(dispatch)=>{

            let response =await authAPI.login(email,password,rememberMe)
                if(response.data.resultCode===0)
                {
                    dispatch(getAuthUserData())
                }
                else
                {
                    let message =  response.data.messages.length>0 ? response.data.messages[0] : " some error"
                    dispatch(stopSubmit("login", {_error:message}))
                }
        }
        
        export const logout = () => async (dispatch)=>{
          //  return(dispatch)=>{
                let response = authAPI.logout().then
                    if(response.data.resultCode===0)
                    {
    
                        dispatch(setAuthUserData(null,null,null, false));
                    }
            }

export default authReducer;