import React from "react";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Wallet from "./components/Wallet";
import About from "./components/About";
import MyTrash from "./components/MyTrash";
import LandingPage from "./containers/LandingPage";
import { PrivateRoute } from "./PrivateRoute";
import CleanContainer from "./containers/CleanContainer";
import ReportContainer from "./containers/ReportContainer";
import Nav from "./containers/Nav";
import TrophyRoom from "./components/TrophyRoom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      userWallet: null
    };
  }
  token = localStorage.getItem("token");
  // componentDidMount() {
  //   this.auth();
  // }

  setAuth = () => {
    this.setState({
      isAuthenticated: !this.state.isAuthenticated
    });
  };

  auth = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("currentUser_id")
    ) {
      this.setState({
        isAuthenticated: true
      });
      this.updateWallet();
    }
  };

  updateWallet = () => {
    fetch("https://trash-app-back.herokuapp.com/wallets/getUserWallet", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("currentUser_id")
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("from backend", data.wallet[0]);
        this.setState({
          userWallet: data.wallet[0]
        });
      });
  };
  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/register" component={Registration} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login">
                  <Login setAuth={this.setAuth} auth={this.auth} />
                </Route>
              </Switch>
            </div>
            <Route
              path="/"
              render={props =>
                props.location.pathname !== "/" &&
                props.location.pathname !== "/about" &&
                props.location.pathname !== "/login" &&
                props.location.pathname !== "/register" && (
                  <Nav
                    setAuth={this.setAuth}
                    userWallet={this.state.userWallet}
                  />
                )
              }
            />

            <PrivateRoute
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/clean"
              component={CleanContainer}
            />
            <PrivateRoute
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/report"
              component={ReportContainer}
            />

            <PrivateRoute
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/mytrash"
            >
              <MyTrash updateWallet={this.updateWallet} />
            </PrivateRoute>

            <PrivateRoute
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/wallet"
              component={Wallet}
            />
            <PrivateRoute
              isAuthenticated={this.state.isAuthenticated}
              exact
              path="/trophy"
              component={TrophyRoom}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
