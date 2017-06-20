// Util functions

import * as d3 from 'd3-scale';

// Random Color
let randomColor = () => {
  let color = []
  for(let i = 0; i < 4; i++){
    color.push(Math.floor(Math.random() * 255) + 0)
  }
  return color;
}

// Remove all p tags
let removeDiv = () => {
  let elements = document.getElementsByTagName("p")
  while (elements[0]) elements[0].parentNode.removeChild(elements[0])
}

// Scale
let scale = d3.scaleLinear()
.domain([0, 319, 1489, 4425, 10647, 22530, 43175.5, 79201.5, 141410, 250945, 445064, 783802,1388819, 2480681, 4575155, 8698149.75, 17303957, 37358074, 95410812, 353652138.8, 2249660890432])
.range([2, 2.8284271247461903, 3.4641016151377544, 4, 4, 5.656854249492381, 6.928203230275509, 8, 8, 11.313708498984761, 13.856406460551018, 16, 16, 22.627416997969522, 27.712812921102035, 32, 32, 45.254833995939045, 55.42562584220407, 64]);

// Style elements
let showName = (value, position, color, origin) => {
  if(!document.getElementById(value)){
    let el = document.createElement("p");
    el.id = value;
    el.innerHTML = value;
    el.style.left = position.x + 'px';
    el.style.top = position.y + 'px';
    if(origin){
      el.style.background = 'rgb(' + color[0] + ',' + color[1]  + ',' + color[2] + ')';
    } else {
      el.style.color = 'rgb(' + color[0] + ',' + color[1]  + ',' + color[2] + ')';
    }
    (origin) ? el.className += 'origin' : el.className += 'partner';
    document.body.appendChild(el);
  }
  if(document.getElementById(value)){
    let el = document.getElementById(value);
    el.style.left = position.x + 'px';
    el.style.top = position.y + 'px';
    if(origin){
      el.style.background = 'rgb(' + color[0] + ',' + color[1]  + ',' + color[2] + ')';
    } else {
      el.style.color = 'rgb(' + color[0] + ',' + color[1]  + ',' + color[2] + ')';
    }
  }
}

export { randomColor, removeDiv, scale, showName}
