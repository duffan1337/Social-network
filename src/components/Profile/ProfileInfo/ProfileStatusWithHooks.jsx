import React, { useState,  useEffect } from 'react';
import s from './ProfileInfo.module.css';


const ProfileStatusWithHooks=(props)=>{

const [editMode, setEditMode] = useState(false);
const [status, setStatusLocal] = useState(props.status);
useEffect(()=>{
    setStatusLocal(props.status);
},[props.status])

const activateEditMode=()=>{
    setEditMode(true)
}
const deactivateEditMode=(state)=>{
    setEditMode(false)
    props.updateStatus(status)
}


const onStatusChange = (e) => {
    if(e.currentTarget.value.length <= 300) {
        setStatusLocal(e.currentTarget.value)
    }
}


    return (
        <div> 
            {!editMode && 
                <div>
                   <span onDoubleClick={activateEditMode}>{props.status || "-----"}</span>npm 
              </div>
            }
            {editMode && 
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                    <div>{status.length}/300</div>
                    <div><button onClick={onStatusChange}>save</button></div>
                    
                </div>
            }   
        </div>)

}


export default ProfileStatusWithHooks;