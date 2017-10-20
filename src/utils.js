// Util functions

import { scaleLinear } from 'd3-scale';
import { values } from 'd3-collection';
import { mean } from 'd3-array';


// Array of all valid imports 
let getIndexFromAllImportsSorted = value => {
  let importsdata = [115575, 135452, 206846, 240048, 254890, 256343, 258015, 273058, 315816, 354294, 359582, 363455, 373881, 433511, 643302, 698855, 703106, 719311, 733596, 775565, 887806, 903867, 922548, 943923, 1106003, 1182200, 1206554, 1285143, 1551276, 1612054, 1751044, 1753843, 2010815, 2042222, 2202892, 2332305, 2348912, 2365591, 2523604, 2527967, 2568900, 2944279, 3251496, 3335030, 3352942, 3456276, 3695405, 3822080, 4608654, 4672319, 4880172, 4890229, 5797234, 6262796, 6494658, 6537940, 6551772, 7592518, 7795819, 7816092, 9629220, 9924870, 10132272, 11325527, 11864893, 12263074, 12312120, 13053552, 13417763, 14371361, 15184408, 16270655, 16983771, 17513549, 17995214, 19055990, 19367722, 20463505, 21799634, 22946461, 23480356, 23672002, 24636851, 25360468, 29897750, 33682409, 38980044, 39411243, 46465799, 48679150, 71015377, 89967449, 95812509, 127876390, 131022454, 146750268, 159335700, 165120909, 178251019, 725643630];
  return importsdata.indexOf(value);
}

// Array of all valid Exports 
let getIndexFromAllExportsSorted = value => {
  let exportsdata = [21908,24247,62943,67271,144494,152108,187439,241237,280318,313154,399963,432138,514636,528755,543799,559253,588806,677279,691619,693235,714049,731849,910106,912986,928481,983877,1001378,1109238,1109451,1242506,1278309,1295663,1307448,1341518,1359558,1422079,1452236,1495691,1554773,1572666,1655957,1716317,1875314,1880394,1881384,1955692,2315102,2586668,3147813,3257175,3382898,3707052,3737086,3934095,4150242,4750393,5152639,5361020,5558230,5709373,6089012,6442151,6561714,6631023,6995289,7008191,7315501,7510261,8375042,8622289,8784352,8925455,9212639,10479762,10767888,14513177,15023573,15052057,15370257,15479973,16475968,17688750,18169111,28291261,30845810,31560662,31651161,32786214,34348901,35435891,35972517,55677472,66852995,70470251,104591912,115658053,117297187,145144906,185286390,684312269];
  return exportsdata.indexOf(value);
}


// Random Color
let randomColor = () => {
  let color = []
  for (let i = 0; i < 4; i++) {
    color.push(Math.floor(Math.random() * 255) + 0)
  }
  return color;
}

let colorPallet = () => {
  let index = 0;
  let hexColors = ["#1F313F", "#1C515C", "#16736F", "#309577", "#62B773", "#A2D56A", "#EEEF63"];
  let rgbColors = [
    [99, 171, 207, 1],
    [60, 190, 205, 1],
    [47, 206, 191, 1],
    [82, 220, 169, 1],
    [131, 230, 142, 1],
    [183, 236, 116, 1],
    [238, 239, 99, 1]
  ]
  return () => {
    index < rgbColors.length ? index++ : index = 1;
    return rgbColors[index - 1];
  }
}

// Remove all p tags
let removeDiv = () => {
  let elements = document.getElementsByTagName("p")
  while (elements[0]) elements[0].parentNode.removeChild(elements[0])
}

// Scale
let scale = scaleLinear()
  .domain([0, 319, 1489, 4425, 10647, 22530, 43175.5, 79201.5, 141410, 250945, 445064, 783802, 1388819, 2480681, 4575155, 8698149.75, 17303957, 37358074, 95410812, 353652138.8, 2249660890432])
  .range([2, 2.8284271247461903, 3.4641016151377544, 4, 4, 5.656854249492381, 6.928203230275509, 8, 8, 11.313708498984761, 13.856406460551018, 16, 16, 22.627416997969522, 27.712812921102035, 32, 32, 45.254833995939045, 55.42562584220407, 64]);

// Style elements
let showName = (value, id, position, color, origin) => {
  if (!document.getElementById(id)) {
    let el = document.createElement("p");
    el.id = id;
    el.innerHTML = value;
    el.style.left = position.x + 'px';
    el.style.top = position.y + 'px';
    el.style.zIndex = '20';
    if (origin) {
      el.style.background = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    } else {
      el.style.color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    }
    (origin) ? el.className += 'origin': el.className += 'partner';
    document.body.appendChild(el);
  }
  if (document.getElementById(id)) {
    let el = document.getElementById(id);
    el.style.left = position.x + 'px';
    el.style.top = position.y + 'px';
    if (origin) {
      el.style.background = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    } else {
      el.style.color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    }
  }
}

export { randomColor, removeDiv, scale, showName, colorPallet, getIndexFromAllImportsSorted, getIndexFromAllExportsSorted }