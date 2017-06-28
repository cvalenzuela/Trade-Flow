// Hierarchy is:
// 1) allCountries contains an array of all the Country instances.
// 2) A Country instance has a Particle System.
// 3) A Particle System has an array of particles to display.

import { p5Instance as p5 } from './index';
import { Country } from './Country';
import { randomColor, removeDiv } from './utils';

// All the countries are store in this object
let allCountries = new Object();

// Object as middleware to control new Countries creation with the GUI
let countryOptions = {
  Country: 'Chile',
  Speed: 3,
  Opacity: 200,
  Color: randomColor(),
  CountryInstance: null,
  Sound: true,
  Trail: 5,
  "Show Text (slow)": false,
  "Trade Type": "exports",
  CountryAndTrade: function(){return this.Country + this["Trade Type"]},
  Start: function() {
    if(!allCountries[this.CountryAndTrade()]) {
      this.CountryInstance = new Country([this.Country, this.Speed, this.Color, this.Opacity, this.Trail, this["Trade Type"], this["Show Text (slow)"], this.Sound]);
      allCountries[this.CountryAndTrade()] = this.CountryInstance;
    }
  },
  Stop: function() {
    if(allCountries[this.CountryAndTrade()]){
      // Clear all future timeouts (just this country)
      for(let i = 0; i < allCountries[this.CountryAndTrade()].animationQue.length ;i++){
        clearTimeout(allCountries[this.CountryAndTrade()].animationQue[i])
      };

      removeDiv();
      delete allCountries[this.CountryAndTrade()]
      p5.ellipse(1,1,1,1); // bug? if not the screen freezes
    }
  },
  "Clear All": function() {
    // Clear all future timeouts (from all countries)
    for(let country in allCountries){
      for(let i = 0; i < allCountries[country].animationQue.length ;i++){
        clearTimeout(allCountries[country].animationQue[i])
      }
    };
    removeDiv()
    allCountries = []; // Erase all countries
    p5.ellipse(1,1,1,1); // bug? if not the screen freezes
  },
  UpdateColor: function(value) {
    if(allCountries[this.CountryAndTrade()]){
      this.CountryInstance.Color = value; // All the next particles that will be created
      allCountries[this.CountryAndTrade()].particles.forEach((p) => {
        p.color = value; // change the current ones
      })
    }
  },
  UpdateSpeed: function(value) {
    this.Stop();
    this.Start();
  },
  UpdateOpacity: function(value) {
    if(allCountries[this.CountryAndTrade()]){
      this.CountryInstance = allCountries[this.CountryAndTrade()];
      this.CountryInstance.Opacity = value; // All the new particles that will be created
      allCountries[this.CountryAndTrade()].particles.forEach((p) => {
        p.opacity = value; // change the current ones
      })
    }
  },
  UpdateTrail: function(value) {
    if(allCountries[this.CountryAndTrade()]){
      this.CountryInstance = allCountries[this.CountryAndTrade()];
      this.CountryInstance.Trail = value; // All the new particles that will be created
      allCountries[this.CountryAndTrade()].particles.forEach((p) => {
        p.trail = value; // change the current ones
      })
    }
  },
  UpdateShowText: function(value){
    if(allCountries[this.CountryAndTrade()]){
      this.CountryInstance = allCountries[this.CountryAndTrade()];
      this.CountryInstance.showText = value; // All the next particles that will be created
      allCountries[this.CountryAndTrade()].particles.forEach((p) => {
        p.showText = value; // change the current ones
      })
    }
  },
  UpdateSound: function(value){
    if(allCountries[this.CountryAndTrade()]){
      this.CountryInstance = allCountries[this.CountryAndTrade()];
      this.CountryInstance.sound = value; // All the next particles that will be created
      allCountries[this.CountryAndTrade()].particles.forEach((p) => {
        p.sound = value; // change the current ones
      })
    }
  }
}

export { allCountries, countryOptions }
