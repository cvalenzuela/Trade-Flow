// Timeline

let timeline = document.getElementById('timeline');
let importsTimeline = document.getElementById('importsTimeline');
let exportsTimeline = document.getElementById('exportsTimeline');

// Add a country to the timeline
let addCountryToTimeline = (country, tradeType, c) => {
  let countryDiv = document.createElement('div');
  countryDiv.id = 'timeline' + country + tradeType;
  countryDiv.className = 'countryInTimeline';
  countryDiv.innerText = country;
  countryDiv.style.background = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;
  if (tradeType == 'exports') {
    exportsTimeline.appendChild(countryDiv);
  } else {
    importsTimeline.appendChild(countryDiv);
  }
}

// Remove a country from the timeline
let removeCountryFromTimeline = (country, tradeType) => {
  let countryDiv = document.getElementById(`timeline${country}${tradeType}`);
  if (tradeType == 'exports') {
    exportsTimeline.removeChild(countryDiv);
  } else {
    importsTimeline.removeChild(countryDiv);
  }
}

// Remove all countries from timelien
let removeAllCountriesFromTimeline = () => {
  let elements = document.getElementsByClassName('countryInTimeline');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

export { addCountryToTimeline, removeCountryFromTimeline, removeAllCountriesFromTimeline };