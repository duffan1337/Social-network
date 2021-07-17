import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm } from 'redux-form'
import { Textarea, Element} from '../common/FormsControls/formsControls';
import { maxLengthCreator, required} from '../../utils/validators/validators';

const Dialogs = (props) => {
    let state = props.dialogsPage
    let dialogsElements = state.dialogsData.map( d => <DialogItem name={d.name} id={d.id} />  );
    let messagesElements = state.messageData.map( m => <Message message={m.message}/> );

    let newMessageElement = React.createRef();
    
    const addNewMessage = (values)=>{
        props.addMessageCreator(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div> { messagesElements } </div>
                <div>
                     <AddMessageReduxForm onSubmit={addNewMessage}/>
                </div>
            </div>
            
        </div>
    )

    
}
const Textarea1 = Element("textarea")
let maxLength10 = maxLengthCreator(10)

const AddMessageForm = (props) =>{
    return  <form onSubmit={props.handleSubmit}>
                <Field component={Textarea1} name={"newMessageBody"}  placeholder ='Enter your message' validate={[required, maxLength10]}/>
                <button >send</button>
            </form>
}

const AddMessageReduxForm = reduxForm({
    form:'dialogAddMessageForm'
})(AddMessageForm) 


export default Dialogs; 