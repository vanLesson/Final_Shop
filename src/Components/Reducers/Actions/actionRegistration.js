import React from "react"
import {GQL } from "../../GQL/gql"
import {actionFetch} from "../Actions/actionGoods"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
    login: state.auth.data && state.auth.data.sub.login,
  })

export function actionLogin(login, password) {
  return (async dispatch => {
    try {
      let token = await dispatch(actionFetch("login", GQL(
        `query login($login: String, $password: String){
            login(login: $login, password: $password)
        }`,
        { login, password }
      )))

      dispatch(actionAuthLogin(token.data.login))
    }
    catch (e) {
      dispatch(actionInvalidLogin(e))
    }
  })
}

export function actionRegister(login, password) {
  return (async dispatch => {
    let reg = await dispatch(actionFetch("reg", GQL(
      `mutation reg($login: String, $password: String){
            UserUpsert(user: {login:$login, password: $password})
            {_id 
              login
            }
        }`,
      { login, password }
    )
    ))
    
    reg.errors ? await dispatch(actionInvalidEmail(reg.errors[0])) : await dispatch(actionLogin(login, password))
  })
}
export const actionInvalidEmail = ({ message }) => ({ type: "INVALID_EMAIL", message })

export const actionInvalidLogin = ({ message }) => ({ type: "INVALID_LOGIN", message })

const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token })

const UserName = ({ login }) => login ? <a>{login}</a> : <span>Anon</span>

export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" })

export const CUserName = connect(mapStateToProps)(UserName)

export const CLogoutButton = connect(
  (state) => ({ children: "logout", disabled: !state.auth.data }),
  {
    onClick: actionAuthLogout,
  }
)("button")

