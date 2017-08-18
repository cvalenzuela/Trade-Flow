// Sound from tone.js
// To change if sounds are played randomly or always the same sound, go to file Country.js

import * as Tone from 'tone';
import { p5Instance as p5 } from './index';

// Bmp
Tone.Transport.bpm.value = 108;
Tone.Transport.start();

// Filter
// Docs: https://tonejs.github.io/docs/#Filter
var frequencyIncrease = 250; // This is the increment to frequency everytime a new country is added.
var filter = new Tone.Filter({
  type: "lowpass",
  frequency: 350,
  rolloff: -48,
  Q: 1,
  gain: 0
}).toMaster();

// Freeverb
// Docs: https://tonejs.github.io/docs/#Freeverb
var roomSizeIncrease = 0.1; // This is the increment to roomSize everytime a new country is added.
var dampeningIncrease = 250; // This is the increment to dampening everytime a new country is added.
var wetIncrease = 0.1; // This is the increment to wet everytime a new country is added.
var freeverb = new Tone.Freeverb({
  roomSize: 0.1,
  dampening: 10,
  wet: 0.2
}).toMaster();

let instrumentOrder = 1;

// This will run everytime a new country is added
let setCurrentInstrument = (reset) => {
  // This is just for debug
  console.log("===============")
  console.log('filter frequency: ', filter.frequency.input.value);
  console.log('freeverb room Size', freeverb.roomSize.input.value);
  console.log('freeverb dampening', freeverb.dampening.input.value);

  // Increase the variables for filter or freeverb
  filter.frequency.input.value += frequencyIncrease; // Increase for frequency in filter

  freeverb.dampening.input.value += dampeningIncrease; // Increase for dampening in freeverb
  freeverb.roomSize.input.value > 0.8 ? roomSizeIncrease = 0 : roomSizeIncrease = 0.1; // Logic so roomSize doesn't go over 0.8
  freeverb.roomSize.input.value += roomSizeIncrease;  // Increase for roomSize in freeverb

  if(reset){
    instrumentOrder = 1;
  }
  // Each country gets a different sound based on the position it was clicked.
  switch(instrumentOrder){
    case 1:
      instrumentOrder++;
      return 'mono'
    case 2:
      instrumentOrder++;
      return 'poly'
    case 3:
      instrumentOrder++;
      return 'newDrum'
    case 4:
      instrumentOrder++;
      return 'HiMono'
    case 5:
      instrumentOrder++;
      return 'LowMono'
    case 6:
      instrumentOrder++;
      return 'HiPoly'
    default:
      instrumentOrder = 2;
      return 'mono'
      break;
  }
}

// The mp3 files are loaded here.
let createSoundGroup = (size, group) => {
  let arr = [];

  // This loads all files in the folder /mp3. The name should match the pattern: Tradeflow_1mono_1.mp3
  for(let i = 1; i <= size; i++){
    arr.push(new Tone.Player({
    "url" : "./mp3/Tradeflow_" + group + "_" + i + ".mp3",
    "loop" : false,
    "volume": -4,
  }).connect(filter).connect(freeverb)); // To take the filter or freeverb off, just remove the .connect(filter) or .connect(freeverb)
  }
  return arr;
}

// This actually loads all the files, no need to change anything here.
let soundTypes = {
  mono: {
    sounds: createSoundGroup(5, '1mono'),
    tempo: '1n'
  },
  poly: {
    sounds: createSoundGroup(7, '2poly'),
    tempo: '2n'
  },
  newDrum: {
    sounds: createSoundGroup(10, '3newDrum'),
    tempo: '3n'
  },
  HiMono: {
    sounds: createSoundGroup(8, '4HiMono'),
    tempo: '4n'
  },
  LowMono: {
    sounds: createSoundGroup(4, '5LowMono'),
    tempo: '5n'
  },
  HiPoly: {
    sounds: createSoundGroup(7, '6HiPoly'),
    tempo: '6n'
  }
}

let playSound = (soundType) => {
  soundType.start();
}

export { playSound, soundTypes, setCurrentInstrument};
