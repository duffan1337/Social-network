import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader/Preloader'
import userPhoto from './../../../assets/images/51f6fb256629fc755b8870c801092942.png'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { Form } from 'redux-form';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);
    

    const activateEditMode=()=>{
        setEditMode(true)
    }
    const deactivateEditMode=()=>{
        setEditMode(false)
    
    }
    const onSubmit=(formData)=>{
       props.saveProfile(formData)
       .then(()=>{
            deactivateEditMode()
        })
        
    }


const onMainPhotoSelected=(e)=>{
    if(e.target.files.length)
    {
        props.savePhoto(e.target.files[0])
    }

}

    if(!props.profile)
    {
        return <Preloader/>
    }
    else
    { 
        debugger;
        return (
            <div>
                {/* <div>
                    <img
                        src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
                </div> */}
                <div className={s.descriptionBlock}>
                    <img src={props.profile.photos.large !=null ? props.profile.photos.large : userPhoto}  className={s.mainPhoto}/>
                    {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                    <ProfileStatusWithHooks status={props.status}  updateStatus = {props.updateStatus} />
                    {editMode ? <ProfileDataForm onSubmit={onSubmit} 
                    profile={props.profile} initialValues={props.profile} />:<ProfileData isOwner={props.isOwner} profile={props.profile} activateEditMode ={activateEditMode}/>}
                </div>
            </div>
        )
    }
}

const ProfileData=({profile, isOwner, activateEditMode})=>{
    return (
        <div>
            <br/>
            {isOwner && <div>
                <button onClick={activateEditMode}>Edit</button>
            </div>}
            <div><b>Full Name: </b>{profile.fullName}</div>
            <div><b>Looking for a job:</b> { profile.lookingForAJob ? "Yes" : "No"}</div>
            <div>{ profile.lookingForAJob && <div><b>My professional skills: </b> {profile.lookingForAJobDescription}</div>}</div>
            <div><b>About me: </b> { profile.aboutMe}</div>
            <div><b>Contacts: </b> { Object.keys(profile.contacts).map(key=>
                {return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />})}
            </div>
    </div>
    )

}


const Contact = ({contactTitle, contactValue})=>{
    return <div className={s.contact}><b>{contactTitle}: </b> {contactValue} </div>
}

export default ProfileInfo;