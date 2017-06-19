// Custom scale to deal with large size variations

import * as d3 from 'd3-scale';

let range = []
let customRange = amount => {
	for(let i = 1; i < 5; i++){
		range.push(Math.sqrt(i*amount));
	}
}

// 1/5
customRange(4)
// 2/5
customRange(16)
// 3/5
customRange(64)
// 4/5
customRange(256)
// 5/5
customRange(1024)

let scale = d3.scaleLinear()
.domain([0, 319, 1489, 4425, 10647, 22530, 43175.5, 79201.5, 141410, 250945, 445064, 783802,1388819, 2480681, 4575155, 8698149.75, 17303957, 37358074, 95410812, 353652138.8, 2249660890432])
.range([2, 2.8284271247461903, 3.4641016151377544, 4, 4, 5.656854249492381, 6.928203230275509, 8, 8, 11.313708498984761, 13.856406460551018, 16, 16, 22.627416997969522, 27.712812921102035, 32, 32, 45.254833995939045, 55.42562584220407, 64]);

console.log(range)

export { scale }
