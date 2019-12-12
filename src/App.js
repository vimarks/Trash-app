import React from 'react';
import MapContainer from './components/MapContainer';
import Registration from './components/auth/Registration';
import Login from './components/auth/Login';
import Nav from './containers/Nav'
import CleanContainer from './containers/CleanContainer'
import ReportContainer from './containers/ReportContainer'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class App extends React.Component {
    render() {
        return (
          <div>

          <Router>
              <Nav />
              <Switch>

                <Route path="/clean" component={CleanContainer}/>
                <Route path="/report" component={ReportContainer}/>
                <Route path="/register" component={Registration}/>
                <Route path="/login" component={Login}/>

              </Switch>

          </Router>
          </div>


        )
  }
}

export default App
