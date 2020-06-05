import {  connect } from "react-redux"
import {actionLogin,actionRegister} from "../../Reducers/Actions/actionRegistration"
import {LoginForm} from "../SignInForm/SignInForms"
import {RegistrationForm} from "../SignUpForm/SignUpForm"

export const CLoginForm = connect(null, { onLogin: actionLogin })(LoginForm)
export const CRegForm = connect(null, { onReg: actionRegister })(RegistrationForm)