import React, { Component } from "react";
import "./auth/style.css";

export default function About() {
  return (
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
            In the "report" tab click the "SnapShot Location" button to save the
            location of the trash instance to your current location. This is
            just an initial location and you will have a chance to drag the icon
            to where you think best represents the trash's location later.
          </li>
          <li>
            Fill out the "Description" field to better describe where and what
            the trash instance is, ex: "plastic bags and bottles in the tree
            line behind the Burger King".
          </li>
          <li>
            Fill out the "Bounty" field, here you propose an amount of Karma
            Points (Kp$) that you are offering to whomever cleans this trash.
            The amount must not exceed your current Kp$ balance.
          </li>
          <li>
            Click the "Report Trash" button and a trashcan icon will appear on
            the map representing your trash instance. If you feel that the
            location is not accurate, drag the icon accordingly.
          </li>
          <li>
            Your reported trash instance will now appear on both the map in your
            private "report" tab as well as the map in the public "clean" tab.{" "}
            <b>Double clicking trash instances will display their stats.</b>
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
            While on location, verify your coordinates by clicking the "Verify
            Location" button. If your coordinates match up with the location in
            question and you have cleaned the trash instance, continue by
            clicking the "clean it!" button.
          </li>
          <li>
            Upon clicking the "clean it!" button the reporter of the trash
            instance is notified of its cleaning. They then must confirm that
            the trash instance was indeed cleaned, upon confirmation a green
            check-mark icon will indicate its new confirmed status.
          </li>
          <li>
            As a cleaner you have the ability to rate the reporter at any time
            after you have successfully cleaned a trash instance. A trash
            instance will not be removed from the map until it has been both
            confirmed and rated.
          </li>
        </ol>
      </p>
    </div>
  );
}
