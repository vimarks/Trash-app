# Trash-App

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Examples of Use](#examples-of-use)
- [Credits](#credits)

---

## General info

Trash-App is A web app that crowd-sources city cleanup by incentivizing reporting and cleaning of trash through a user generated, free-market economy.

---

## Technologies

The backend is powered by rails, using postgreSQL for data storage and JWT authentication. Requires the following [Ruby Gems](https://rubygems.org/):

- [bcrypt](https://rubygems.org/gems/bcrypt)
- [pg](https://rubygems.org/gems/postgresql)

The frontend is written in React, interacting with [Geolocation API](https://w3c.github.io/geolocation-api/) through the react-geolocated component in order to aquire user location. Plotting location is via Mapbox GL JS. Requires the following [Packages](https://www.npmjs.com/package/json-query):

- [react-geoloacted](https://www.npmjs.com/package/react-geolocated)
- [react-map-gl](https://www.npmjs.com/package/react-map-gl)

## Examples of Use

Examples of use:

![](/images/game_start.gif)

![](/images/login_play.gif)

![](/images/endNscores.gif)

## Credits

**Vincent Marks** [LinkedIn](https://www.linkedin.com/in/vincent-marks-061115195/) // [Github](https://github.com/vimarks)
