import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./auth/style.css";

export default function About() {
  return (
    <div>
      <nav id="landing_nav">
        <ul className="nav-links">
          <li>
            <h1 id="logo_landing_page">
              trash<span>app</span>
            </h1>
            <div id="logo_subtitle">be part of a cleaner world</div>
          </li>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/register">
            <li>Sign up</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      </nav>
      <div id="aboutBody">
        <h3 className="aboutHeading">Purpose</h3>
        <p>
          Trash-app crowd-sources city cleanup by incentivizing reporting and
          cleaning of trash through a user generated, free-market economy.
        </p>
        <hr />
        <h3 className="aboutHeading">How to Report Trash</h3>
        <p>
          <ol>
            <li>
              Under the "Report" heading, fill out the "Report Some Trash" form
              and upload a upload a picture of the trash. Then click "Continue"
            </li>
            <li>
              Next you will save the location of your trash. On the map is an
              icon representing roughly where you currently are. Drag the icon
              to the precise location of the trash in question then click
              "Continue".
            </li>
            <li>
              After approving the information you provided, click "Publish".
              Your posting will now appear on the public "clean" tab as well as
              in your private "my trash" tab.
            </li>
          </ol>
        </p>
        <hr />
        <h3 className="aboutHeading">How to Clean Trash</h3>
        <p>
          <ol>
            <li>
              Using the map in the "clean" tab as reference, travel to the
              location of a trash instance.
            </li>
            <li>
              <b>While on location</b>, click "Clean Mode" on the selected trash
              instance.
            </li>
            <li>
              Next, verify that you are on location by clicking "Compare
              Location". If your coordinates match up with the location in
              question you will go on to the next step, otherwise you will be
              asked to "compare location" again.
            </li>
            <li>
              Upload "Before" and "After" pictures to prove that you have
              cleaned the trash instance. Upon review of your pictures the
              reporter will either confirm or deny that cleaning took place.
            </li>
            <li>
              Upon clicking the "clean it!" button the reporter of the trash
              instance is notified of its cleaning. They then must confirm that
              the trash instance was indeed cleaned, upon confirmation a green
              check-mark icon will replace the clock icon on the map, the trash
              card will turn from yellow to green, and the bounty amount will be
              transfered into your wallet.
            </li>
            {/*
            <li>
              As a cleaner you have the ability to rate the reporter at any time
              after you have successfully cleaned a trash instance. A trash
              instance will not be removed from the map until it has been both
              confirmed and rated.
            </li>
            */}
          </ol>
        </p>
      </div>
    </div>
  );
}
