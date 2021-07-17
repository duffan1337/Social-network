import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from './../../common/Preloader/Preloader'
import userPhoto from './../../../assets/images/51f6fb256629fc755b8870c801092942.png'
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
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
                    <img src={props.profile.photos.large !=null ? props.profile.photos.large : userPhoto }/>
                    <ProfileStatusWithHooks status={props.status}  updateStatus = {props.updateStatus} />
                </div>
            </div>
        )
    }
}

export default ProfileInfo;