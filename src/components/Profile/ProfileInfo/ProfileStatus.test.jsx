import React from "react"
import {create} from "react-test-renderer"
import ProfileStatus from "./ProfileStatus"

describe("ProfileStatus component", ()=>{

    test("status fom props should be in the state", ()=>{
        const component = create(<ProfileStatus status ="new status"/> )
        const instance = component.getInstance();
        expect(instance.state.status).toBe("new status")
    });

    test("span shot be displayed with status", ()=>{
        const component = create(<ProfileStatus status ="new status"/> )
        const root = component.root
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    });

    test("input null", ()=>{
        const component = create(<ProfileStatus status ="new status"/> )
        const root = component.root
        //let input = root.findByType("input")
        //expect(input).toBeNull()
        expect(()=>{
            let input = root.findByType("input") 
        }).toThrow();
    });

    test("status fom props should be in the state2222", ()=>{
        const component = create(<ProfileStatus status ="new status"/> )
        const root = component.root
        const span = root.findByType("span");
        expect(span.children[0]).toBe("new status")
    });

    test("input should be dispayd in editMode instead of span", ()=>{
        const component = create(<ProfileStatus status ="new status"/> )
        const root = component.root

        const span = root.findByType("span");
        span.props.onDoubleClick()

        const input = root.findByType("input");

        expect(input.props.value).toBe("new status")
    });

    test("input should be dispayd in editMode instead of span", ()=>{
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status ="new status" updateStatus={ ()=>{} } /> )
        const instance = component.getInstance()
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    });

})