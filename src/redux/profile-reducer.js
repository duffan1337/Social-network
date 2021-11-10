import { connect } from "react-redux";
import { stopSubmit } from "redux-form";
import {usersAPI,profileAPI} from '.././api/api'

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'My name is Ivan', likesCount: 12 },
        { id: 2, message: 'i kill everything', likesCount: 22 },
    ],
    newPostText: 'roscha',
    profile:null,
    status: "",
}

export const ProfileReducer = (state = initialState, action) =>
{
    if(action.type ===ADD_POST)
    {
        let newPost = {
            id: 5,
            message: action.newPostText,
            likesCount: 1222
        };
        let stateCopy ={
            ...state,
            posts:[...state.posts,newPost],
            newPostText: ''
        } 
    
        return stateCopy
    }
    else if(action.type ===UPDATE_NEW_POST_TEXT)
    {
        let stateCopy ={
            ...state,
            newPostText:action.newText
        }  
        return stateCopy;
        
    }
    else if(action.type ===SET_USER_PROFILE)
    {
        return {...state, profile:action.profile }
    }
    else if(action.type ===SET_STATUS)
    {
        return {...state, status:action.status }
    }
    else if(action.type ===DELETE_POST)
    {
        return {...state, posts:state.posts.filter(p=>p.id!==action.postId) }
    }
    else if(action.type ===SAVE_PHOTO_SUCCESS)
    {
        return {...state, profile:{...state.profile, photos:action.photos} }
    }

    return state;
}
export const updateNewPostTextActionCreator = (text) =>
{
    return {
        type: UPDATE_NEW_POST_TEXT, newText:text
    }
}
export const addPostActionCreator = (newPostText) =>
{
    return {
        type: ADD_POST,
        newPostText
    }
}
export const setUserProfile =(profile)=>
{
    return {
        type:SET_USER_PROFILE,
        profile
    }
}

export const setStatus =(status)=>
{
    return {
        type:SET_STATUS,
        status
    }
}
export const deletePost =(postId)=>
{
    return {
        type:DELETE_POST,
        postId
    }
}

export const savePhotoSuccess =(photos)=>
{
    return {
        type:SAVE_PHOTO_SUCCESS,
        photos
    }
}

export const getUserProfile=(userId)=> async(dispatch)=>
{
    debugger
        let data = await usersAPI.getProfile(userId)
            dispatch(setUserProfile(data))
}

export const getStatus=(userId)=>async(dispatch)=>
{

        let data = await profileAPI.getStatus(userId)
            dispatch(setStatus(data))

}
export const updateStatus=(status)=>async(dispatch)=>
{
        let response = await profileAPI.updateStatus(status)
            if(response.data.resultCode===0)
            {
            dispatch(setStatus(status))
            }
}
export const savePhoto=(file)=>async(dispatch)=>
{
        let response = await profileAPI.savePhoto(file)
            if(response.data.resultCode===0)
            {
            dispatch(savePhotoSuccess(response.data.data.photos))
            }
}
export const saveProfile=(profile)=>async(dispatch, getState)=>{
        const userId = getState().auth.userId
        let response = await profileAPI.saveProfile(profile)
            if(response.data.resultCode===0)
            {
            dispatch(getUserProfile(userId))
            }
            else
            {
                dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }))
                return Promise.reject(response.data.messages[0]) 
            }
}


export default ProfileReducer