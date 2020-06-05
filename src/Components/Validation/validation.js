import React from "react"
import { connect } from "react-redux"

import { actionInvalidEmail, actionInvalidLogin } from "../Reducers/Actions/actionRegistration"

const InvalidMessage = ({ message }) => {
    
    if (typeof message === "object") {
        message = ""
    }

    return (<p style={{ color: "red", margin: "10px" }}>{message}</p>)
}
const InvalidMessageforSignIn = ({ message }) => {
    
    if (typeof message === "object") {
        message = ""
    }
    return (<p style={{ color: "red", margin: "10px" }}>{message}</p>)
}

export const CInvalidMessage = connect((state) => ({ message: state.auth }), { onInvalid: actionInvalidEmail })(InvalidMessage)
export const CInvalidMessageForSignIn = connect((state) => ({ message: state.auth }), { onInvalid: actionInvalidLogin })(InvalidMessageforSignIn)