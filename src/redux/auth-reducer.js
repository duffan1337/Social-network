import { stopSubmit } from 'redux-form'
import { authAPI, securityAPI } from '.././api/api'

const SET_USER_DATA = 'samurai-network/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/GET_CAPTCHA_URL_SUCCESS'


let initialState = {
    id: null,
    email: '',
    login: '',
    isFetching: false,
    isAuth: false,
    captchaUrl: null

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: action.payload.isAuth
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                captchaUrl: action.payload.captchaUrl
            }
    }
    return state
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } })
export const getCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })

export const getAuthUserData = () => async (dispatch) => {
    //return(dispatch)=>{
    let data = await authAPI.Me()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    
    else {
        if(response.data.resultCode===10)
        {
            dispatch(getCaptchaUrl());
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : " some error"
        dispatch(stopSubmit("login", { _error: message }))
    }
}
 

export const getCaptchaUrl = () => async (dispatch) => {

    let response = await securityAPI.getCaptchaUrl()
    debugger
    const captchaUrl = response.url

    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    //  return(dispatch)=>{
    let response = authAPI.logout().then
    if (response.data.resultCode === 0) {

        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;