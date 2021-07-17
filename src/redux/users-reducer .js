import {usersAPI} from '.././api/api'
const UNFOLLOW = 'UNFOLLOW';
const FOLLOW = 'FOLLOW';
const SET_USERS='SET_USERS';
const SET_CURRENT_PAGE='SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING ='TOGGLE_IS_FETCHING' 
const TOGGLE_IS_FOLLOWING_PROGRESS ='TOGGLE_IS_FOLLOWING_PROGRESS'
let initialState = {
    users: [
        // { id: 1, photoUrl:'https://99px.ru/sstorage/56/2019/09/mid_324597_239159.jpg', followed:false, fullName: 'Ivan', status: 'im a boss', location:{city:'Minsk',country:'Belarus'} },
        // { id: 2, photoUrl:'https://99px.ru/sstorage/56/2019/09/mid_324597_239159.jpg', followed:true, fullName: 'artiom', status: 'im busy now', location:{city:'Moscow',country:'Russian'} },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []

}

export const UsersReducer = (state = initialState, action) =>
{
    if(action.type ===FOLLOW)
    {
  
        let stateCopy ={
            ...state,
            users:state.users.map(u=>{
                if(u.id===action.userId){
                    return {...u, followed:true}
                }
                return u
            }),
        } 
    
        return stateCopy
    }
    else if(action.type ===UNFOLLOW)
    {
  
        let stateCopy ={
            ...state,
            users:state.users.map(u=>{
                if(u.id===action.userId){
                    return {...u, followed:false}
                }
                return u
            }),
        } 
    
        return stateCopy
        
    }
    else if(action.type ===SET_USERS)
    {
        return{...state, users: action.users}
    }
    else if(action.type===SET_CURRENT_PAGE)
    {
        let stateCopy = {...state, currentPage:action.currentPage}
        return stateCopy
    }
    else if(action.type===SET_TOTAL_USERS_COUNT)
    {
        let stateCopy = {...state, totalUsersCount:action.count}
        return stateCopy
    }
    else if(action.type===TOGGLE_IS_FETCHING)
    {
        return {...state, isFetching:action.isFetching}
    }
    else if(action.type===TOGGLE_IS_FOLLOWING_PROGRESS)
    {

        return {...state, followingInProgress: action.isFetching  
            ? [...state.followingInProgress, action.userId] 
             : [state.followingInProgress.filter(id=>id != action.userId)]}
        

    }

    return state;
}


export const followSuccess = (userId) =>
{
    return {
        type: FOLLOW,
        userId
    }
}
export const unfollowSuccess = (userId) =>
{
    return {
        type: UNFOLLOW,
        userId
    }
}

export const setUsers = (users) =>
{
    return {
        type: SET_USERS,
        users
    }
}
export const setCurrentPage = (currentPage) =>
{
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const setTotalUsersCount=(totalUsersCount)=>
{
    return{ 
        type:SET_TOTAL_USERS_COUNT,
        count:totalUsersCount
    }
}
export const toggleIsFetching=(isFetching)=>
{
    return{ 
        type:TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const toggleFollowingProgress=(isFetching, userId)=>
{
    return{ 
        type:TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

export  const requestUsers=(currentPage, pageSize) =>{  
    return async (dispatch)=>{ 
    dispatch(toggleIsFetching(true))
    let data = await usersAPI.getUsers(currentPage,pageSize)
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
    }
}
export  const usersChanged=(pageNumber, pageSize) =>{  
    return(dispatch)=>{ 
                dispatch(setCurrentPage(pageNumber))
                dispatch(toggleIsFetching(true))
        usersAPI.getUsers(pageNumber, pageSize).then(data => {
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
        })
    }
}

export  const follow=(userId) =>{  
    return(dispatch)=>{ 
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.follow(userId).then(data=>{
            if(data.resultCode==0)
            {
                dispatch(followSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))

        })
    }
}
export  const unfollow=(userId) =>{  
    return(dispatch)=>{ 
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unfollow(userId).then(data=>{
            if(data.resultCode==0)
            {
                dispatch(unfollowSuccess(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))

        })
    }
}




export default UsersReducer