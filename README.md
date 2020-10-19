# Trash-app

## Table of contents

- [General info](#general-info)
- [Reporting Trash](#reporting-trash)
- [Cleaning Trash](#cleaning-trash)
- [Technologies](#technologies)
- [Example of Use](#example-of-use)
- [Credits](#credits)

---

## General info

Trash-app is a web app that crowd-sources city cleanup by incentivizing reporting and cleaning of trash through a user generated, free-market economy.

---

## Reporting Trash

In order to report instances of trash, open your "Report" tab and complete the following steps:
1. Click the "SnapShot Location" button to save the location of the trash instance to your current location. This is just an initial location and you will have a chance to drag the icon to where you think best represents the trash's location later.

2. Fill out the "Description" field to better describe where and what the trash instance is, ex: "plastic bags and bottles in the tree line behind the Burger King".

3. Fill out the "Bounty" field, here you propose an amount of Karma Points (Kp$) that you are offering to whomever cleans this trash. The amount must not exceed your current Kp$ balance.

4. Click the "Report Trash" button and a trashcan icon will appear on the map representing your trash instance. If you feel that the location is not accurate, drag the icon accordingly. 

Your reported trash instance will now appear on both the map in your private "report" tab as well as the map in the public "clean" tab.

## Cleaning Trash

In order to clean instances of trash and gain Kp$, open up your "clean" tab and complete the following steps:
1. Travel to the location of the trash instance and clean up the trash.

2. While on location, verify your coordinates by clicking the "Verify Location" button. If your coordinates match up with the location in question and you have cleaned the trash instance, continue by clicking the "clean it!" button.

3. Upon clicking the "clean it!" button the reporter of the trash instance is notified of its cleaning. They then must confirm that the trash instance was indeed cleaned, upon confirmation a green check-mark icon will indicate its new confirmed status. 

4. As a cleaner you have the ability to rate the reporter at any time after you have successfully cleaned a trash instance. A trash instance will not be removed from the map until it has been both confirmed and rated.

## Technologies

The backend is powered by rails, using postgreSQL for data storage and JWT authentication. Requires the following [Ruby Gems](https://rubygems.org/):

- [bcrypt](https://rubygems.org/gems/bcrypt)
- [pg](https://rubygems.org/gems/postgresql)

The frontend is written in React, interacting with [Geolocation API](https://w3c.github.io/geolocation-api/) through the react-geolocated component in order to aquire user location. Plotting location is via Mapbox GL JS. Requires the following [Packages](https://www.npmjs.com/package/json-query):

- [react-geoloacted](https://www.npmjs.com/package/react-geolocated)
- [react-map-gl](https://www.npmjs.com/package/react-map-gl)

## Example of Use

Example of use:

- [Demo](https://www.youtube.com/watch?v=OyyNuxiHoUk&t=9s)

## Credits

**Vincent Marks** [LinkedIn](https://www.linkedin.com/in/vincent-marks-061115195/) // [Github](https://github.com/vimarks)
