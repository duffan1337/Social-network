import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { addMessageActionCreator, } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';


// const DialogsContainer = (props) => {
    

//     //let dialogsElements = props.state.dialogsData.map( d => <DialogItem name={d.name} id={d.id} />  );
//     //let messagesElements = props.state.messageData.map( m => <Message message={m.message}/> );

//     //let newMessageElement = React.createRef();
    

//     return <StoreContext.Consumer> 
//         { 
//         (store)=>{ 
//     let state = store.getState().dialogsPage;
//     let onMessageChange = (text) =>
//     {
//         //let text = newMessageElement.current.value;
//         store.dispatch(updateNewMessageTextActionCreator(text));
        
//     }

//     let addMessage = (text) => 
//     {
//      store.dispatch(addMessageActionCreator(text));
        
//     }

//         return <Dialogs addMessageCreator ={addMessage} sendMessage = {onMessageChange} dialogsPage={state} />
//         }
//      }
//     </StoreContext.Consumer>
// }

let mapStateToProps=(state)=>
{
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps=(dispatch)=>
{
    return {
        addMessageCreator: (newMessageBody)=>{dispatch(addMessageActionCreator(newMessageBody));},
        //sendMessage: (text)=>{ dispatch(updateNewMessageTextActionCreator(text));},
        
    }
}

compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect 
)(Dialogs)

// let AuthRedirectComponent=withAuthRedirect(Dialogs)

// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect 
)(Dialogs);