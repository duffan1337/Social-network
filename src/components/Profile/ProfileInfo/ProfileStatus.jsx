import React from 'react';
import s from './ProfileInfo.module.css';



class ProfileStatus extends React.Component 
{
    state = {
        editMode: false,
        status:this.props.status
        
        }

    activateEditMode = () => {
        this.setState({
            editMode:true
        
        });
    }
    deActivateEditMode = () => {
        this.setState({
            editMode:false
        });
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
		if(e.currentTarget.value.length <= 300) {
			this.setState({
				status: e.currentTarget.value,
			})
		}
	}

    componentDidUpdate(prevProps, prevState) {
        debugger
        if(prevProps.status !== this.props.status)
        this.setState({
            status:this.props.status
        })
    }
    
    render( ) { 
        return (
            <div> 
                {!this.state.editMode && 
                    <div>
                       <span onDoubleClick={this.activateEditMode}>{this.props.status || "-----"}</span>npm 
                  </div>
                }
                {this.state.editMode && 
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode} value={this.state.status}/>
                        <div>{this.state.status.length}/300</div>
                        <div><button onClick={this.onStatusChange}>save</button></div>
                        
                    </div>
                }   
            </div>
        )
    }
}


export default ProfileStatus;