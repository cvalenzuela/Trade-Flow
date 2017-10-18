// Custom GUI without dat.gui.js

import { validCountries } from './validCountries';
import { countryOptions } from './countryOptions';
import { randomColor, removeDiv } from './utils';
import { removeAllCountriesFromTimeline } from './Timeline';
let mobile = require('is-mobile');

let currentSelectedCountry = document.getElementById("currentSelectedCountry");
let currentSelectedTrade = document.getElementById("currentSelectedTrade");
let countryList = document.getElementById("countryList");
let warning = document.getElementById("warning");
let selectedCountry = null;
let selectedCountries = {};
let name;

// Add all Valid Countries to the dropdown
validCountries.sort();
validCountries.forEach((country) => {
  let element = document.createElement("div");
  element.className = "country";
  element.dataset.name = country;
  element.appendChild(document.createTextNode(country));
  countryList.appendChild(element)
});

// Get element containing all countries
let showCountriesBtn = () => {
  document.getElementById("countryList").classList.toggle("show");
}
// Get element containing all trades
let showTradeBtn = () => {
  document.getElementById("tradeList").classList.toggle("show");
}

// Function to trigger when a country is selected: Get country and it's data-name property
let allCountriesDropwdown = document.getElementsByClassName("country");
let selectCountry = function(element) {
  name = this.getAttribute("data-name");
  selectedCountry = element.srcElement;
  currentSelectedCountry.innerHTML = name;
  countryOptions.Country = name;
};
// Function to trigger when a trade is selected: Get trade type and it's data-name property
let tradeTypeDropwdown = document.getElementsByClassName("tradeType");
let selectTrade = function(element) {
  let type = this.getAttribute("data-name");
  currentSelectedTrade.innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
  countryOptions["Trade Type"] = type;
  for (let country in selectedCountries) {
    if (selectedCountries[country][type]) {
      selectedCountries[country].elt.style.color = '#3e3c3c';
    } else {
      selectedCountries[country].elt.style.color = '#c7c7c7';
    }
  };
};

// Add event-listenr for each country.
for (let i = 0; i < allCountriesDropwdown.length; i++) {
  allCountriesDropwdown[i].addEventListener('click', selectCountry, false);
}
// Add event-listenr for trade types
for (let i = 0; i < tradeTypeDropwdown.length; i++) {
  tradeTypeDropwdown[i].addEventListener('click', selectTrade, false);
}

// If clicked outside of the button
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Start visualizing a country
let startCountry = () => {
  if (!countryOptions.Country) {
    warning.style.display = 'block';
    warning.style.display = 'block';
    warning.innerHTML = "Please select a Country";
  } else if (!countryOptions["Trade Type"]) {
    warning.style.display = 'block';
    warning.innerHTML = "Please select a Trade Type";
  } else {
    if (!selectedCountries[name]) {
      selectedCountries[name] = {}
    }
    selectedCountries[name][countryOptions["Trade Type"]] = true;
    selectedCountries[name].elt = selectedCountry;
    warning.style.display = 'none';
    selectedCountry.style.color = '#3e3c3c';
    countryOptions.Elt = selectedCountry;
    countryOptions.Start();
  }
}

// Clear visualizing a country
let clearAll = () => {
  for (let country in selectedCountries) {
    selectedCountries[country].elt.style.color = '#c7c7c7';
  };
  selectedCountries = {};
  removeAllCountriesFromTimeline();
  countryOptions["Clear All"]();
}

// Hide stuff when mobile
if (mobile()) {
  let info = document.getElementById('info');
  let ui = document.getElementById('ui');
  let hideUI = document.getElementById('hideUI');
  info.style.display = 'none';
  ui.style.top = '1em';
  hideUI.style.display = 'block';
}

let showHideUI = () => {
  let hidden = false;
  let hideUIButton = document.getElementById('hideUIButton');
  let about = document.getElementById('aboutBtn');
  let UIs = document.getElementsByClassName('ui');

  return () => {
    hideUIButton.innerHTML = 'Options';
    about.style.display = 'none';
    if (hidden) {
      for (let i = 0; i < UIs.length; i++) {
        UIs[i].style.display = 'none'
      }
    } else {
      about.style.display = 'inline';
      hideUIButton.innerHTML = 'Hide Options';
      for (let i = 0; i < UIs.length; i++) {
        UIs[i].style.display = 'block'
      }
    }
    hidden = !hidden;
  }
}

let showAboutMobile = () => {
  let overlays = document.getElementsByClassName('overlay');
  let showingAbout = false;

  return () => {
    if (showingAbout) {
      for (let i = 0; i < overlays.length; i++) {
        overlays[i].style.display = 'none'
      }
    } else {
      document.getElementById('start').innerHTML = 'Resume';
      for (let i = 0; i < overlays.length; i++) {
        overlays[i].style.display = 'block'
      }
    }
    showingAbout = !showingAbout;
  }
}

// Quick way to debug with a preset country. ONLY FOR DEVELOPMENT
// let overlays = document.getElementsByClassName('overlay');
// for(let i = 0; i < overlays.length; i++){
//   overlays[i].style.display = 'none'
// }
// let demoCountry = () =>{
//   let countries = document.getElementsByClassName("country");
//   let name = countries[2].getAttribute('data-name');
//   selectedCountry = countries[2];
//   currentSelectedCountry.innerHTML = name;
//   countryOptions.Country = name;

//   let types = document.getElementsByClassName("tradeType")
//   let type = types[0].getAttribute("data-name");
//   currentSelectedTrade.innerHTML = type.charAt(0).toUpperCase() + type.slice(1);
//   countryOptions["Trade Type"] = type;

//   selectedCountry.style.color = '#3e3c3c';
//   selectedCountries.push(selectedCountry);
//   countryOptions.Elt = selectedCountry;
//   // countryOptions.Start();
// }
// setTimeout(function(){
//   demoCountry();
// },1000)

export { showCountriesBtn, showTradeBtn, startCountry, clearAll, showHideUI, showAboutMobile };