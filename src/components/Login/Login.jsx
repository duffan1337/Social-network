import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {Field, reduxForm } from 'redux-form'
import { login, logout } from '../../redux/auth-reducer'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { createField, Element } from '../common/FormsControls/formsControls'
import { Input } from '../common/FormsControls/formsControls'
import style from '../common/FormsControls/formsControls.module.css'

const LoginForm =(props)=>{
    return( 
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"email"} component={Input} placeholder={"Email"} validate = {[required]}/>
            </div>
            <div>
                <Field name={"password"} component={Input} placeholder={"Password"} validate = {[required]} />
            </div>
            <div>
                <Field name={"rememberMe"} component={Input} type={"checkbox"}/> Remember me
            </div>

            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && createField("Symbols from image", "captcha", [required], Input, { }) }

            { props.error &&
                <div className={style.FormSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
        )
        
}

const LoginReduxForm = reduxForm({
    form:'login'
})(LoginForm) 


const Login =(props)=>{
    const onSubmit = (formData)=>{
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth){
        return <Redirect to={"profile"}/>
    }
    else{
        return ( 
            <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
            </div>
            )
    }
        
}
const mapSateToProps=(state)=>({
    captchaUrl: state.auth.captchaUrl,
    isAuth:state.auth.isAuth
})
export default connect(mapSateToProps, {login})(Login)
