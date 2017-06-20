// dat.GUI Controller

import dat from './dat.gui';
import { validCountries } from './validCountries';
import { countryOptions } from './countryOptions';
import { randomColor, removeDiv } from './utils';

let controller = new dat.GUI({
  width: 280,
  autoPlace: false
});

let customContainer = document.getElementById('gui');
customContainer.appendChild(controller.domElement);

let Countries = controller.addFolder('Countries');
let selectedCountry = Countries.add(countryOptions, 'Country', (() => {
  let c = []; validCountries.forEach((e)=>{c.push(e)}); return c.sort()
})());
let type = Countries.add(countryOptions, 'Trade Type', ["imports", "exports"]);
let speed = Countries.add(countryOptions, 'Speed', 1, 50).listen();
let opacity = Countries.add(countryOptions, 'Opacity', 0, 255).listen();
let trail = Countries.add(countryOptions, 'Trail', 0, 30).listen();
let color = Countries.addColor(countryOptions, 'Color').listen();
let showText = Countries.add(countryOptions, 'Show Text (slow)');
let sound = Countries.add(countryOptions, 'Sound').listen();
Countries.add(countryOptions, 'Start');
Countries.add(countryOptions, 'Stop');

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

showText.onChange(function(value) {
  countryOptions.UpdateShowText(value)
  if(!value){
    removeDiv()
  }
});

opacity.onChange(function(value) {
  countryOptions.UpdateOpacity(value)
});

trail.onChange(function(value) {
  countryOptions.UpdateTrail(value)
});

sound.onChange(function(value) {
  countryOptions.UpdateSound(value)
});


export { controller };
