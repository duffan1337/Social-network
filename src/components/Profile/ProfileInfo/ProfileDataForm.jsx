import React, { useState } from 'react';
import { Form, reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';
import { createField, Input, Textarea } from '../../common/FormsControls/formsControls';
import style from "../../common/FormsControls/formsControls.module.css"
const ProfileDataForm=({handleSubmit,profile, error})=>{
    return (
        <Form onSubmit={handleSubmit}>
            <br/>
            <div>
                <button>save</button>
            </div>
            { error &&
                <div className={style.FormSummaryError}>
                {error}
            </div>
            }
            <div><b>Full Name: </b>{createField("Full name", "fullName", [], Input)}</div>
            <div><b>Looking for a job:</b> {createField("", "lookingForAJob", [], Input, {type:"checkbox"})}</div>
            <div>{<div><b>My professional skills: </b> {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}</div>}</div>
            <div><b>About me: </b> {createField("About me", "aboutMe", [], Textarea)}</div>
            <div><b>Contacts: </b> { Object.keys(profile.contacts).map(key=>
                {return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, "contacts."+ key, [], Input)}</b>
                </div>})}
        </div>
        </Form>
    )
}
const ProfileDataFormReduxFrom=reduxForm({form:"edit-profile"})(ProfileDataForm)

export default ProfileDataFormReduxFrom