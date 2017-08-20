// Hierarchy is: 1) allCountries contains an array of all the Country instances.
// 2) A Country instance has a Particle System. 3) A Particle System has an
// array of particles to display.

import {p5Instance as p5} from './index';
import {Country} from './Country';
import {removeDiv} from './utils';
import {setCurrentInstrument} from './sounds';

// All the countries are store in this object
let allCountries = new Object();

// Object as middleware to control new Countries creation with the GUI
let countryOptions = {
  Country: null,
  CountryInstance: null,
  Elt: null,
  "Trade Type": null,
  CountryAndTrade: function () {
    return this.Country + this["Trade Type"]
  },
  Start: function () {
    if (!allCountries[this.CountryAndTrade()]) {
      this.CountryInstance = new Country([
        this.Country,
        this["Trade Type"],
        this.Elt
      ]);
      allCountries[this.CountryAndTrade()] = this.CountryInstance;
    }
  },
  "Clear All": function () {
    setCurrentInstrument(true);  // return to the first sound
    for (let country in allCountries) {
      allCountries[country].Stop();
    };
    removeDiv();
    allCountries = []; // Erase all countries
    p5.ellipse(1, 1, 1, 1); // bug? if not the screen freezes
  },
  UpdateColor: function (value) {
    if (allCountries[this.CountryAndTrade()]) {
      this.CountryInstance.Color = value; // All the next particles that will be created
      allCountries[this.CountryAndTrade()]
        .particles
        .forEach((p) => {
          p.color = value; // change the current ones
        })
    }
  },
  UpdateOpacity: function (value) {
    if (allCountries[this.CountryAndTrade()]) {
      this.CountryInstance = allCountries[this.CountryAndTrade()];
      this.CountryInstance.Opacity = value; // All the new particles that will be created
      allCountries[this.CountryAndTrade()]
        .particles
        .forEach((p) => {
          p.opacity = value; // change the current ones
        })
    }
  }
}

export {allCountries, countryOptions}
