/*
Visualize and listen to Trade data
c.valenzuela
https://github.com/cvalenzuela
cvalenzuelab.com
2017
*/
import p5 from 'p5';
import Mappa from './mappa';
import { allCountries } from './countryOptions';
import key from './private';
// import { controller } from './controller'; // Uncomment this for dat.gui interfce
import { showCountriesBtn, showTradeBtn, startCountry, clearAll, showHideUI, showAboutMobile } from './gui';
import { countryOptions } from './countryOptions';

const options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  renderWorldCopies: false,
  minZoom: 1,
  maxZoom: 5.5,
  maxBounds: [ [-180, -75], [180, 85] ],
  pitch: 15,
  //style: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png' // debug leaflet
  //style: 'mapbox://styles/cvalenzuela/cj463ywav008a2spldmk3n40c' // original black
  style: 'mapbox://styles/cvalenzuela/cj65qb6616hoj2rr822iwpwx5' // Terminal
  //style: 'mapbox://styles/cvalenzuela/cj5n001zq3wwp2smux7pdrpkq' // decimal
}
let mappa = new Mappa('Mapboxgl', key);
let width = window.innerWidth;
let height = window.innerHeight;
let canvas, map;
let bearing = 0;
let moveMap = false;
let reachFullRotation = false;
let animateBtn = document.getElementById('animateMapButton');

// View/Hide the overlay
document.getElementById('start').addEventListener("click", () =>{
  let overlays = document.getElementsByClassName('overlay');
  for(let i = 0; i < overlays.length; i++){
    overlays[i].style.display = 'none'
  }
}, false);
document.getElementById('getinfo').addEventListener("click", () =>{
  let overlays = document.getElementsByClassName('overlay');
  document.getElementById('start').innerHTML = 'Resume';
  for(let i = 0; i < overlays.length; i++){
    overlays[i].style.display = 'block'
  }
}, false);

const sketch = (p) => {

  p.setup = () => {
    canvas = p.createCanvas(width, height);
    map = mappa.tileMap(options);
    map.overlay(canvas);
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
    if(moveMap){
      bearing > 350 && (reachFullRotation = true);
      bearing < 3 && (reachFullRotation = false);
      reachFullRotation ? bearing -= 0.01 : bearing += 0.01;
      map.map.easeTo({
        bearing: bearing,
        zoom: 1.4
      });
    }
  };

  p.windowResized = () => {
    // p.resizeCanvas(p.windowWidth, p.windowHeight);
    // map.resizeMap(canvas);
  }
};

let animateMap = () =>{
  moveMap = !moveMap;
  if(moveMap) {
    animateBtn.innerHTML = 'Stop Map Movement';
  } else {
    map.map.flyTo({
      bearing: 0,
      zoom: 2,
      speed: 0.6
    });
    animateBtn.innerHTML = 'Animate Map';
  }
}

let p5Instance =  new p5(sketch);
window.showCountriesBtn = showCountriesBtn;
window.showTradeBtn = showTradeBtn;
window.startCountry = startCountry;
window.clearAll = clearAll;
window.showHideUI = showHideUI();
window.showAboutMobile = showAboutMobile();
window.animateMap = animateMap;
export { p5Instance, map}
