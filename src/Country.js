// Country class: creates a new particle system

import { ParticleSystem } from './ParticleSystem';
import * as latlng from './latlng.json';
import * as trade from './tradeData.json';
import { p5Instance as p5 } from './index';
import { scale } from './utils';
import { soundTypes, setCurrentInstrument } from './sounds';
import * as Tone from 'tone';

class Country {
  constructor(...args){
    args = args[0]

    this.Country = args[0];
    this.Color = args[1];
    this.Opacity = args[2];
    this.Trail = args[3];
    this.tradeType = args[4];
    this.showText = args[5];
    this.sound = args[6];

    this.trade = trade[this.Country][this.tradeType];
    this.system = new ParticleSystem();
    this.origin = latlng[this.Country];
    this.animationQue = []
    this.interval = 1;
    this.instrument = setCurrentInstrument(false);
    this.soundType = p5.random(soundTypes[this.instrument].sounds);
    this.Start();
  }

  Start(){

    // Create a shuffle array with the names of the destination countries
    let destinationCountries = p5.shuffle(Object.keys(this.trade), true);
    let currentDestinationCountry = 0;

    let loop = new Tone.Loop((time) => {
      let destinationName = destinationCountries[currentDestinationCountry];
      let destination = latlng[destinationName];
      if(latlng[destinationName]){
        let size = scale(this.trade[destinationName]);
        size = p5.constrain(size, 2, 64);
        this.system.addParticle(
          this.origin, 
          destination, 
          this.Country, 
          destinationName, 
          size, 
          this.Color, 
          this.Opacity, 
          this.Trail, 
          this.tradeType, 
          this.showText, 
          this.sound,
          this.soundType
        );
      } else {
        console.warn(destinationName + " not found :(");
      }
      if(currentDestinationCountry < destinationCountries.length){
        currentDestinationCountry++;
      }  
    }, '1n').start(soundTypes[this.instrument].tempo);


  }
}

export { Country };
