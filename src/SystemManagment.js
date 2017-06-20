// Hierarchy is:
// 1) allCountries contains an array of all the Country instances.
// 2) A Country instance has a Particle System.
// 3) A Particle System has an array of particles to display.

import dat from './dat.gui'
import * as trade from './tradeData.json';
import * as latlng from './latlng.json';
import { validCountries } from './validCountries'
import * as d3 from 'd3-scale';
import { ParticleSystem } from './ParticleSystem';
import { p5Instance as p5 } from './index'

let scale = d3.scaleLinear()
.domain([0, 319, 1489, 4425, 10647, 22530, 43175.5, 79201.5, 141410, 250945, 445064, 783802,1388819, 2480681, 4575155, 8698149.75, 17303957, 37358074, 95410812, 353652138.8, 2249660890432])
.range([2, 2.8284271247461903, 3.4641016151377544, 4, 4, 5.656854249492381, 6.928203230275509, 8, 8, 11.313708498984761, 13.856406460551018, 16, 16, 22.627416997969522, 27.712812921102035, 32, 32, 45.254833995939045, 55.42562584220407, 64]);

let allCountries = new Object();
window.allCountries = allCountries
let randomColor = () => {
  let color = []
  for(let i = 0; i < 4; i++){
    color.push(Math.floor(Math.random() * 255) + 0)
  }
  return color;
}

// Country class: creates a new particle system.
class Country {
  constructor(country, speed, color, opacity, trail, tradeType){
    this.Country = country;
    this.Speed = speed;
    this.Opacity = opacity;
    this.Color = color;
    this.Trail = trail;
    this.system = new ParticleSystem();
    this.origin = latlng[this.Country];
    this.animationQue = []
    this.trade = trade[this.Country][tradeType]
    this.tradeType = tradeType;
    this.interval = 1;
    this.Start();
  }

  Start(){
    for(let destinationName in this.trade){
      if(latlng[destinationName]){
        let destination = latlng[destinationName]
        let size = scale(this.trade[destinationName])
        size = p5.constrain(size, 2, 64);
        this.animationQue.push(setTimeout(()=> {this.system.addParticle(this.origin, destination, this.Country, destinationName, size, this.Color, this.Opacity, this.Trail, this.tradeType)}, (this.interval * 5000)/this.Speed));

        this.interval += 1;
        this.particles = this.system.currentParticles();
      } else {
        console.warn(country + " not found :(");
      }
    }
    this.interval = 1;
  }
}

// Object as middleware to control new Countries creation with the GUI
let countryOptions = {
  Country: 'Canada',
  Speed: 10,
  Opacity: 150,
  Color: randomColor(),
  CountryInstance: null,
  Sound: true,
  Trail: 5,
  "Trade Type": "imports",
  CountryAndTrade: function(){return this.Country + this["Trade Type"]},
  Start: function() {
    if(!allCountries[this.CountryAndTrade()]) {
      this.CountryInstance = new Country(this.Country, this.Speed, this.Color, this.Opacity, this.Trail, this["Trade Type"]);
      allCountries[this.CountryAndTrade()] = this.CountryInstance;
    }
  },
  Stop: function() {
    if(allCountries[this.CountryAndTrade()]){
      // Clear all future timeouts (just this country)
      for(let i = 0; i < allCountries[this.CountryAndTrade()].animationQue.length ;i++){
        clearTimeout(allCountries[this.CountryAndTrade()].animationQue[i])
      }

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
    }

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
      this.CountryInstance = allCountries[this.Country];
      this.CountryInstance.Opacity = value; // All the new particles that will be created
      allCountries[this.CountryAndTrade()].particles.forEach((p) => {
        p.opacity = value; // change the current ones
      })
    }
  },
  UpdateTrail: function(value) {
    if(allCountries[this.CountryAndTrade()]){
      this.CountryInstance = allCountries[this.Country];
      this.CountryInstance.Trail = value; // All the new particles that will be created
      allCountries[this.CountryAndTrade()].particles.forEach((p) => {
        p.trail = value; // change the current ones
      })
    }
  }
}

// dat.GUI Controller
let controller = new dat.GUI({
  width: 250,
});

let Countries = controller.addFolder('Countries');
let selectedCountry = Countries.add(countryOptions, 'Country', (() => {
  let c = []; validCountries.forEach((e)=>{c.push(e)}); return c.sort()
})());
let type = Countries.add(countryOptions, 'Trade Type', ["imports", "exports"]);
let speed = Countries.add(countryOptions, 'Speed', 1, 50).listen();
let opacity = Countries.add(countryOptions, 'Opacity', 0, 255).listen();
let trail = Countries.add(countryOptions, 'Trail', 0, 30).listen();
let color = Countries.addColor(countryOptions, 'Color').listen();
Countries.add(countryOptions, 'Start');
Countries.add(countryOptions, 'Stop');
Countries.add(countryOptions, 'Sound');
controller.add(countryOptions, 'Clear All');
Countries.open()

// Event Listeners
color.onChange(function(value) {
  countryOptions.UpdateColor(value)
});

selectedCountry.onChange(function(value) {
  countryOptions.Color = randomColor();
});

type.onChange(function(value) {
  countryOptions.Color = randomColor();
});

speed.onChange(function(value) {
  countryOptions.UpdateSpeed(value)
});

opacity.onChange(function(value) {
  countryOptions.UpdateOpacity(value)
});

trail.onChange(function(value) {
  countryOptions.UpdateTrail(value)
});

export { allCountries }
