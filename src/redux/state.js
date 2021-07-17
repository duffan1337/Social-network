import ProfileReducer from './profile-reducer';
import DialogsReducer from './dialogs-reducer';

let store = {
    _state: 
    {
        profilePage: {
            posts: [
                { id: 1, message: 'My name is Ivan', likesCount: 12 },
                { id: 2, message: 'i kill everything', likesCount: 22 },
            ],
            newPostText: 'roscha'
        },
    
        dialogsPage: {
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
     },
    _callSubscriber()
    {
        console.log('213');
    },

    dispatch(action) {

        this._state.profilePage = ProfileReducer(this._state.profilePage, action)
        this._state.dialogsPage = DialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state);
     
    },

    subscribe(observer) 
    {
        this._callSubscriber = observer;
    },
    getState()
    {
        return this._state
    }

}



export default store;

window.store = store;
