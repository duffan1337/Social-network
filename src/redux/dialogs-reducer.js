const ADD_MESSAGE = 'ADD-MESSAGE'; 

let initialState = {
    dialogsData: [
        { id: 1, name: 'Ivan' },
        { id: 2, name: 'Dima' },
        { id: 3, name: 'zenya' },
        { id: 4, name: 'kostya' },
    ],
    messageData: [
        { id: 1, message: 'hi' },
        { id: 2, message: 'im from russia' },
        { id: 3, message: 'i love you' },
    ],
}

 export const DialogsReducer = (state = initialState, action) =>
{

     if (action.type ===ADD_MESSAGE)
    {
        let stateCopy={
            ...state,
            messageData:[...state.messageData, {id:6,message:action.Message}]
        }
        return stateCopy;
    }
    return state;
}

export const addMessageActionCreator =  (message) =>
{
    return{
        type: ADD_MESSAGE, Message: message
    }
}



export default DialogsReducer