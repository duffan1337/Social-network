import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from './components/News/news'
import Music from './components/Music/music'
import Settings from './components/Settings/settings'
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import {Provider} from "react-redux";
import { compose } from 'redux'
import store from "./redux/redux-store";
import { withSuspense } from './hoc/SuspenseHoc';
const DialogsContainer = React.lazy(()=>import( "./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(()=>import( './components/Profile/ProfileContainer'))

class App extends React.Component  {
    catchAllUnhandledErrors=(reason, promise)=>{
        alert("some error")
    }
    componentDidMount()
    {
        this.props.initializeApp()
        window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors)
    }
    
componentWillUnmount()
{
    window.removeEventListener("unhandledrejection",this.catchAllUnhandledErrors)
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
                    <Switch>
                    <Route exact path='/' render={()=><Redirect to={"/profile"}/>}/>
                    <Route path='/dialogs' render={ withSuspense(DialogsContainer)}/>
                    <Route path='/login' render={ () => <LoginPage /> }/>
                    <Route path ='/profile/:userId?'render={ withSuspense(ProfileContainer)}/>
                    <Route path='/users' render={ () =><UsersContainer/> }/>
                    <Route path='/news' render={ () => <News /> }/>
                    <Route path='/music' render={ () => <Music /> }/>
                    <Route path='/settings' render={ () => <Settings /> }/>
                    <Route path='*' render={ () => <div>404 not found</div> }/>
                    </Switch>
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