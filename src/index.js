/*
Visualize and listen to Trade data
c.valenzuela
https://github.com/cvalenzuela
cvalenzuelab.com
2017
*/
import p5 from 'p5';
import Mappa from './p5maps';
import { allCountries } from './SystemManagment';
import key from './private';

const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  // style: 'mapbox://styles/mapbox/dark-v9'
}
let mappa = new Mappa('Leaflet');

const width = window.innerWidth;
const height = window.innerHeight;
let canvas, map;

const sketch = (p) => {

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    map = mappa.tileMap(options)
    map.append(canvas);
    p.noStroke();
    p.smooth();
    p.textFont("Helvetica");
    p.textAlign(p.CENTER)
  };

  p.draw = () => {
    p.clear();
    for(let country in allCountries){
      allCountries[country].system.run();
      if(allCountries[country].system.ended){
        delete allCountries[country]
      }
    }
  };

};

let p5Instance =  new p5(sketch);
export { p5Instance, map }
