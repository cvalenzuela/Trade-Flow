// Hierarchy is:
// 1) allCountries contains an array of all the Country instances.
// 2) A Country instance has a Particle System.
// 3) A Particle System has an array of particles to display.

import dat from './dat.gui'
import * as trade from './tradeData.json';
import * as countries from './all_countries_latlng.json';
import * as d3 from 'd3-scale';
import { ParticleSystem } from './ParticleSystem';
import { p5Instance as p5 } from './index'

let scale = d3.scaleLinear()
.domain([0, 319, 1489, 4425, 10647, 22530, 43175.5, 79201.5, 141410, 250945, 445064, 783802,1388819, 2480681, 4575155, 8698149.75, 17303957, 37358074, 95410812, 353652138.8, 2249660890432])
.range([2, 2.8284271247461903, 3.4641016151377544, 4, 4, 5.656854249492381, 6.928203230275509, 8, 8, 11.313708498984761, 13.856406460551018, 16, 16, 22.627416997969522, 27.712812921102035, 32, 32, 45.254833995939045, 55.42562584220407, 64]);

let allCountries = new Object();

class Country {
  constructor(country, speed, opacity, color){
    this.Country = country;
    this.Speed = speed;
    this.Opacity = opacity;
    this.Color = color;
    this.system = new ParticleSystem();
    this.particles = [];
    this.origin = countries[this.Country];
    this.tradeImports = trade[this.Country].imports;
    this.tradeExports = trade[this.Country].exports;
    this.interval = 1;
    this.Start();
  }

  Start(){
    for(let country in this.tradeImports){
      if(countries[country]){
        let destination = countries[country]
        let size = scale(this.tradeImports[country])
        size = p5.constrain(size, 2, 64);
        this.particles.push(setTimeout(()=> {this.system.addParticle(this.origin, destination, size, this.Color)}, this.interval *  this.Speed * 500));
        this.interval += 1;
      } else {
        console.warn(country + " not found :(");
      }
    }
    this.interval = 1;
  }
}

let countryOptions = {
  Country: 'Canada',
  Speed: 1,
  Opacity: 1,
  Color: [26, 114, 175],
  CountryInstance: null,
  Sound: true,
  Start: function() {
    if(!allCountries[this.Country]){
      this.CountryInstance = new Country(this.Country, this.Speed, this.Opacity, this.Color);
      allCountries[this.Country] = this.CountryInstance;
    }
  },
  Stop: function() {
    if(allCountries[this.Country]){
      delete allCountries[this.Country]
      p5.ellipse(1,1,1,1); // bug? if not the screen freezes
    }
  },
  Clear: function(){
    allCountries = [];
    p5.ellipse(1,1,1,1); // bug? if not the screen freezes
  }

}

let controller = new dat.GUI({
  width: 250,
});

let Countries = controller.addFolder('Countries');
Countries.add(countryOptions, 'Country', (() => { let c = []; for(var x in countries){ c.push(x)} return c.sort()})());
Countries.add(countryOptions, 'Speed', 1, 10);
Countries.add(countryOptions, 'Opacity', 0, 10);
Countries.addColor(countryOptions, 'Color');
Countries.add(countryOptions, 'Start');
Countries.add(countryOptions, 'Stop');
Countries.add(countryOptions, 'Sound');
controller.add(countryOptions, 'Clear');
Countries.open()

export { allCountries }
