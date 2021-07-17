import React from 'react';
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import StoreContext from '../../../StoreContext';
import MyPosts from './MyPosts';
import { connect } from 'react-redux'

// const MyPostsContainer = (props) => {

//     return (
//         <StoreContext.Consumer>
//             { (store) => {
//                 let state = store.getState()
//                 let addPost = () => {
                    
//                     store.dispatch(addPostActionCreator());                            
//                     // props.updateNewPostText('');                 
//                 }

//                 let onPostChange = (text) => {

//                     let action = updateNewPostTextActionCreator(text);
//                     store.dispatch(action);

//                 }
                
//                 return < MyPosts updateNewPostText={onPostChange}
//                     addPost={addPost}
//                     posts={state.profilePage.posts}
//                     newPostText={state.profilePage.newPostText} />
//             }
//             }
//         </StoreContext.Consumer>
//     )
// }
let mapStateToProps=(state)=>
{
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
    }
}
let mapDispatchToProps=(dispatch)=>
{
    return {
        updateNewPostText: (text)=>
        {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action)
        },
        addPost: (newPostText)=>{dispatch(addPostActionCreator(newPostText))}
        
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)

export default MyPostsContainer;