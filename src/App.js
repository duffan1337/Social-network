import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import News from './components/News/news'
import Music from './components/Music/music'
import Settings from './components/Settings/settings'
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { getAuthUserData } from './redux/auth-reducer';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import {Provider} from "react-redux";
import { compose } from 'redux'
import store from "./redux/redux-store";
import { withSuspense } from './hoc/SuspenseHoc';

const DialogsContainer = React.lazy(()=>import( "./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(()=>import( './components/Profile/ProfileContainer'))

class App extends React.Component  {

    componentDidMount()
    {

        this.props.initializeApp()
    }

    render(){ 
        if(!this.props.initialized){ 
        return <Preloader/>
    }

    return (
       // <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={ withSuspense(DialogsContainer)}/>
                    <Route path='/login' render={ () => <LoginPage /> }/>
                    <Route path ='/profile/:userId?'render={ withSuspense(ProfileContainer)}/>
                    <Route path='/users' render={ () =><UsersContainer/> }/>
                    <Route path='/news' render={ () => <News /> }/>
                    <Route path='/music' render={ () => <Music /> }/>
                    <Route path='/settings' render={ () => <Settings /> }/>
                </div>
            </div>
           // </BrowserRouter>
        )
    }
        
}

const mapStateToProps=(state)=>({
    initialized: state.app.initialized
})

let AppContainer = compose(withRouter, connect(mapStateToProps,{initializeApp})) (App);

export let samuraiJsAPP = (props)=>{

   return( <BrowserRouter>
                <Provider store={store}>
                <AppContainer/>
                </Provider>
            </BrowserRouter> )

}

 export default samuraiJsAPP;