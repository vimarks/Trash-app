import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Nav from './containers/Nav'


export const PrivateRoute = ({ component: Component, isAuthenticated, setAuth, ...rest }) => {
  console.log(setAuth)
  return(
    <div>
      <Nav setAuth={setAuth} />
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated === true ?
          <Component {...rest} {...props} /> : <Redirect to="/login" />
        }
      />
    </div>
  )
}
