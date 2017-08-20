// Custom GUI without dat.gui.js

import { validCountries } from './validCountries';
import { countryOptions } from './countryOptions';
import { randomColor, removeDiv } from './utils';

let currentSelectedCountry = document.getElementById("currentSelectedCountry");
let currentSelectedTrade = document.getElementById("currentSelectedTrade");
let countryList = document.getElementById("countryList");
let warning = document.getElementById("warning");
let selectedCountry = null;
let selectedCountries = [];

// Add all Valid Countries to the dropdown
validCountries.sort();
validCountries.forEach((country)=>{
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

// Function to trigger when a country is selected: Get all countries and it's data-name property
let allCountriesDropwdown = document.getElementsByClassName("country");
let selectCountry = function(element) {
    let name = this.getAttribute("data-name");
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
let startCountry = () =>{
  if(!countryOptions.Country){
    warning.style.display = 'block';
    warning.style.display = 'block';
    warning.innerHTML = "Please select a Country";
  } else if (!countryOptions["Trade Type"]){
    warning.style.display = 'block';
    warning.innerHTML = "Please select a Trade Type";
  } else {
    warning.style.display = 'none';
    selectedCountry.style.color = '#3e3c3c';
    selectedCountries.push(selectedCountry);
    countryOptions.Elt = selectedCountry;
    countryOptions.Start();
    countryOptions.Color = randomColor();
  }
}

// Clear visualizing a country
let clearAll = () =>{
  selectedCountries.forEach((country)=>{
    country.style.color = '#c7c7c7';
  })
  countryOptions["Clear All"]();
}

export { showCountriesBtn, showTradeBtn, startCountry, clearAll };