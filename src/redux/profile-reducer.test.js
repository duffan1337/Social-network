import ProfileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";
import ReactDOM from "react-dom"
import App from '../App'
import React from "react"

let state = {
    posts: [
        { id: 1, message: 'My name is Ivan', likesCount: 12 },
        { id: 2, message: 'i kill everything', likesCount: 22 },
    ],
}

it("count of post should be incremented ", ()=>{
    let action = addPostActionCreator("ivan")
    let newState = ProfileReducer(state,action)
    expect(newState.posts.length).toBe(3);

});

it("message of new post should be ivan ", ()=>{
    let action = addPostActionCreator("ivan")
    let newState = ProfileReducer(state,action)
    expect(newState.posts[2].message).toBe("ivan");
});

it("after deleting length of message should be decrement  ", ()=>{
    let action = deletePost(1)

    let newState = ProfileReducer(state,action)
    expect(newState.posts.length).toBe(1)
});

it("after deleting length of message should be decrement if id id incorrect ", ()=>{
    let action = deletePost(1000)

    let newState = ProfileReducer(state,action)
    expect(newState.posts.length).toBe(2)
});

