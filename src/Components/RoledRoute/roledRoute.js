import React from "react"
import {Redirect ,Route} from "react-router-dom"
import { connect } from "react-redux"
const RoledRoute = ({ fallback, auth, roles, ...props }) => {
    const OriginalComponent = props.component
    const CheckComponent = ({ history, ...p }) => {
      if (!auth) {
        return <Redirect to={fallback} />
      }
      const acl = auth.sub.acl
      if (acl.some((element) => roles.includes(element))) {
        return (<OriginalComponent {...p} />)
      }
      return <Redirect to={fallback} />
    }
    return (<> <Route {...props} component={CheckComponent} /></>)
  }
  export const CRoledRoute = connect((state) => ({ auth: state.auth.data }))(RoledRoute)