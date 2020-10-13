import React from "react";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Wallet from "./components/Wallet";
import LandingPage from "./containers/LandingPage";
import { PrivateRoute } from "./PrivateRoute";
import CleanContainer from "./containers/CleanContainer";
import ReportContainer from "./containers/ReportContainer";
import TrophyRoom from "./components/TrophyRoom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }
  componentDidMount() {
    this.auth();
    console.log("cdm hit");
  }

  setAuth = () => {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated
    });
  };

  auth = () => {
    console.log("auth hit");
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("currentUser_id")
    ) {
      this.setState({
        isAuthenticated: true
      });
    }
  };
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/login">
              <Login setAuth={this.setAuth} auth={this.auth} />
            </Route>
            <PrivateRoute
              setAuth={this.setAuth}
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/clean"
              component={CleanContainer}
            />
            <PrivateRoute
              setAuth={this.setAuth}
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/report"
              component={ReportContainer}
            />
            <PrivateRoute
              setAuth={this.setAuth}
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/wallet"
              component={Wallet}
            />
            <PrivateRoute
              setAuth={this.setAuth}
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/trophy"
              component={TrophyRoom}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
