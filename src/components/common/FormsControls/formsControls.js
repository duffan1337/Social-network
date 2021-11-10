import React from 'react'
import { Field } from 'redux-form'
import styles from './formsControls.module.css'

export const Textarea =({input, meta, ...props}) =>
{
    const hasError = (meta.error && meta.touched)
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError &&<span>
                {meta.error}
            </span>}

        </div>
    )
}



export const Input =({input, meta, ...props}) =>
{
    const hasError = (meta.error && meta.touched)
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError &&<span>
                {meta.error}
            </span>}

        </div>
    )
}


export const Element = (Element) => ({input, meta, ...props}) =>
{
    const hasError = (meta.error && meta.touched)
    
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <Element {...input} {...props}/>
            </div>
            {hasError &&<span>
                {meta.error}
            </span>}

        </div>
    );
};

export const createField = (placeholder, name, validators, component,props={},text = "" ) =>(
    <div>
        <Field placeholder={placeholder} name={name}
        validators={validators}
        component={component}
        {...props} />{text}
    </div>
    )
