import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import s from './Header.module.css';
import * as axios from 'axios'
import { connect } from 'react-redux';
import { getAuthUserData, logout, setAuthUserData } from '../../redux/auth-reducer';
import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component{

    // componentDidMount()
    // {
    //     // authAPI.Me().then(data=>{
    //     //     if(data.resultCode===0)
    //     //     {
    //     //         let {id,email,login}=data.data
    //     //         this.props.setAuthUserData(id,email,login);
    //     //     }
    //     // })
    //     this.props.getAuthUserData()
    // }

    render(){

    return <Header {...this.props}/>
}
}
const mapStateToProps = (state)=>
({
    isAuth:state.auth.isAuth,
    login:state.auth.login,
})

export default connect(mapStateToProps,{ logout})(HeaderContainer);