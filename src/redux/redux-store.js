//const { createStore } = require("redux");
import {applyMiddleware, combineReducers, createStore,compose} from "redux"
import ProfileReducer from "./profile-reducer"
import DialogsReducer from "./dialogs-reducer"
import UsersReducer from "./users-reducer ";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
    profilePage:ProfileReducer,
    dialogsPage:DialogsReducer,
    usersPage:UsersReducer,
    auth:authReducer,
    form:formReducer,
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store=createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__=store

export default store