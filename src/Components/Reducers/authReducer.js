import * as jwt_decode from "jwt-decode"

export function authReducer(state, action) {
  if (!state) {
    if (!localStorage.authToken) {
      return {}
    } else {
      action.type = "AUTH_LOGIN"
      action.token = localStorage.authToken
    }
  }

  if (action.type === "AUTH_LOGIN") {
    const jwt = action.token
    const data = jwt_decode(jwt)
    console.log(data)
    localStorage.setItem("authToken", jwt)
    return { jwt: jwt, data: data }
  }
  if (action.type === "AUTH_LOGOUT") {
    localStorage.setItem("authToken", "")
    return {}
  }
  if (action.type === "INVALID_LOGIN") {
    return "Не верный Email или пароль"
  }
  if (action.type === "INVALID_EMAIL") {
    
    return action.message
  }

  return state
}