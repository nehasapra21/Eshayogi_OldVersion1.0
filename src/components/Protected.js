import React from 'react'
import { Redirect, Route } from 'react-router-dom'
const Protected = ({ component: Component, ...rest }) => {
  let isLoggedin = localStorage.getItem('eSahyogiUser') ? true : false

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedin === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}
export default Protected
// this file will responsible for user access authentication
// This file further imported in app.js for guarding routers from unauthorized access
