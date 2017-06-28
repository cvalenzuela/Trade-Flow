/*
Visualize and listen to Trade data
c.valenzuela
https://github.com/cvalenzuela
cvalenzuelab.com
2017
*/
import p5 from 'p5';
import Mappa from './p5maps';
import { allCountries } from './countryOptions';
import key from './private';
import { controller } from './controller';
import { countryOptions } from './countryOptions';

const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  renderWorldCopies: false,
  minZoom: 1,
  maxZoom: 5.5,
  maxBounds: [ [-180, -75], [180, 85] ],
  pitch: 0,
  //style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  style: 'mapbox://styles/cvalenzuela/cj463ywav008a2spldmk3n40c'
}
let mappa = new Mappa('Mapboxgl', key);

let width = window.innerWidth;
let height = window.innerHeight;
let canvas, map;

// View/Hide the overlay
document.getElementById('play').addEventListener("click", () =>{
  let overlays = document.getElementsByClassName('overlay');
  for(let i = 0; i < overlays.length; i++){
    overlays[i].style.display = 'none'
  }
}, false);
document.getElementById('getinfo').addEventListener("click", () =>{
  let overlays = document.getElementsByClassName('overlay');
  for(let i = 0; i < overlays.length; i++){
    overlays[i].style.display = 'block'
  }
}, false);


const sketch = (p) => {

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    map = mappa.tileMap(options)
    map.append(canvas);
    p.noStroke();
    p.smooth();
  };

  p.draw = () => {
    p.clear();

    for(let country in allCountries){
      allCountries[country].system.run(); // run as long as there are countries
      if(allCountries[country].system.ended){
        delete allCountries[country] // erase a country once it has ended
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(width, height);
  }

};

let p5Instance =  new p5(sketch);
export { p5Instance, map }
