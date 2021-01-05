import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import Slider from "../components/Slider.js";

class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      beforeURL1: "",
      afterURL1: "",
      randomReporter1: "",
      randomCleaner1: "",

      beforeURL2: "",
      afterURL2: "",
      randomReporter2: "",
      randomCleaner2: "",

      beforeURL3: "",
      afterURL3: "",
      randomReporter3: "",
      randomCleaner3: "",

      randomTrash1: null,
      randomTrash2: null,
      randomTrash3: null
    };
  }
  componentDidMount() {
    this.landingPageFetch();
  }

  landingPageFetch = () => {
    fetch("http://localhost:3001/images", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          beforeURL1: data.beforeImage1.url,
          afterURL1: data.afterImage1.url,
          randomTrash1: data.randomTrash1,
          randomReporter1: data.randomReporter1,
          randomCleaner1: data.randomCleaner1,

          beforeURL2: data.beforeImage2.url,
          afterURL2: data.afterImage2.url,
          randomTrash2: data.randomTrash2,
          randomReporter2: data.randomReporter2,
          randomCleaner2: data.randomCleaner2,

          beforeURL3: data.beforeImage3.url,
          afterURL3: data.afterImage3.url,
          randomTrash3: data.randomTrash3,
          randomReporter3: data.randomReporter3,
          randomCleaner3: data.randomCleaner3
        });
      });
  };
  render() {
    return (
      <div className="landing_background">
        <nav id="landing_nav">
          <ul className="nav-links">
            <li>
              <h1 id="logo_landing_page">
                trash<span>app</span>
              </h1>
              <div id="logo_subtitle">be part of a cleaner world</div>
            </li>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/register">
              <li>Sign up</li>
            </Link>

            <Link to="/login">
              <li>Login</li>
            </Link>
          </ul>
        </nav>

        <div id="landingPageTitle"> be part of a cleaner world </div>
        <div id="blurb">
          help keep your city clean by posting and cleaning trash
        </div>
        <div id="slider_container">
          <div className="sliders">
            <figure>
              <Slider
                beforeURL={this.state.beforeURL1}
                afterURL={this.state.afterURL1}
              />
              <figcaption>
                {" "}
                <div>
                  <span style={{ fontSize: "15pt" }}>Reporter</span> <br></br>{" "}
                  {this.state.randomReporter1}
                </div>
                <div>
                  <span style={{ fontSize: "15pt" }}>Bounty</span> <br></br>$
                  {this.state.randomTrash1 && this.state.randomTrash1.bounty}
                </div>
                <div>
                  <span style={{ fontSize: "15pt" }}>Cleaner</span> <br></br>
                  {this.state.randomCleaner1}
                </div>
              </figcaption>
            </figure>
          </div>

          <div id="slider_mid">
            <figure>
              <Slider
                beforeURL={this.state.beforeURL2}
                afterURL={this.state.afterURL2}
              />
              <figcaption>
                {" "}
                <div>
                  <span style={{ fontSize: "15pt" }}>Reporter</span>
                  <br></br> {this.state.randomReporter2}
                </div>
                <div>
                  <span style={{ fontSize: "15pt" }}>Bounty</span>
                  <br></br>$
                  {this.state.randomTrash2 && this.state.randomTrash2.bounty}
                </div>
                <div>
                  <span style={{ fontSize: "15pt" }}>Cleaner</span> <br></br>
                  {this.state.randomCleaner2}
                </div>
              </figcaption>
            </figure>
          </div>
          <div className="sliders">
            <figure>
              <Slider
                beforeURL={this.state.beforeURL3}
                afterURL={this.state.afterURL3}
              />
              <figcaption>
                {" "}
                <div>
                  <span style={{ fontSize: "15pt" }}>Reporter</span>
                  <br></br> {this.state.randomReporter3}
                </div>
                <div>
                  <span style={{ fontSize: "15pt" }}>Bounty</span> <br></br>$
                  {this.state.randomTrash3 && this.state.randomTrash3.bounty}
                </div>
                <div>
                  <span style={{ fontSize: "15pt" }}>Cleaner</span> <br></br>
                  {this.state.randomCleaner3}
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
