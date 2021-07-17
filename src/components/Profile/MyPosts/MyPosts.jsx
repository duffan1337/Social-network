import React from 'react';
import { updateNewPostTextActionCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm } from 'redux-form'
import {maxLengthCreator, required} from './../../../utils/validators/validators'
import { Textarea, Element} from '../../common/FormsControls/formsControls';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from './../../../assets/images/51f6fb256629fc755b8870c801092942.png'



const Textarea1 = Element("textarea")
let maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo((props) => {


    if(!props.profile)
    {
        return <Preloader/>
    }
        debugger
    let avatar =props.profile.photos.small;
    let postsElements =
        props.posts.map( p => <Post message={p.message} avatar = {avatar ? avatar : userPhoto } likesCount={p.likesCount}/>);

    let newPostElement = React.createRef();             //указатель

    let onAddPost = (values) => {
          //props.updateNewPostText(values.newPostBody)
          props.addPost(values.newPostBody)                                  //текст является значением указателя из текстэрии
        //props.dispatch(addPostActionCreator());                                //в функцию из пропсов добовляется значение из текстэрии
       // props.updateNewPostText('');                 //пустая строка в текстэрии
    }
     

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>

            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
})

const addNewPostForm = (props)=>{
    return <form onSubmit ={props.handleSubmit}>
                <div>
                    <Field component={Textarea1} name={"newPostBody"} placeholder={"text"} validate={[required, maxLength10]}/>
                </div>
                <div>
                    <button> Add post</button>        
                </div>
            </form>
}

const AddNewPostReduxForm = reduxForm({
    form:'postAddMessageForm'
})(addNewPostForm) 


export default MyPosts;