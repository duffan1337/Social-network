import React from 'react';
import s from './Profile.module.css';
import * as axios from 'axios'
import { connect } from 'react-redux'
import Profile from './Profile';
import { getUserProfile, setUserProfile,getStatus,updateStatus} from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { usersAPI } from '../../api/api'
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

    componentDidMount(){
        let userId= this.props.match.params.userId;
        if(!userId)
        {
            userId=this.props.authorizedUserId
            if(!userId)
            {
                this.props.history.push("/login")
            }
        }
        
        // usersAPI.getProfile(userId).then(data=>{
        //     this.props.setUserProfile(data)

        // });
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

render() { 
    return (
        <Profile {...this.props} 
        profile={this.props.profile} 
        status = {this.props.status} 
        updateStatus = {this.props.updateStatus}
        avatar={this.props.avatar}
         />
    )
    }
}


// let AuthRedirectComponent=withAuthRedirect(ProfileContainer)

 let mapStateToProps=(state)=>({
     profile: state.profilePage.profile,
     status:state.profilePage.status,
     authorizedUserId:state.auth.id,
     isAuth:state.auth.isAuth
    })
    compose(
        connect(mapStateToProps,{setUserProfile,getUserProfile, getStatus,updateStatus}),
        withRouter,
        withAuthRedirect
    )(ProfileContainer)
// let WithUrlDataContainerComponent=withRouter(AuthRedirectComponent)

// export default connect(mapStateToProps,{setUserProfile,getUserProfile}) (WithUrlDataContainerComponent);
export default compose(
    connect(mapStateToProps,{setUserProfile,getUserProfile,getStatus,updateStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)
