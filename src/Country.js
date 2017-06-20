// Country class: creates a new particle system

import { ParticleSystem } from './ParticleSystem';
import * as latlng from './latlng.json';
import * as trade from './tradeData.json';
import { p5Instance as p5 } from './index';
import { scale } from './utils';


class Country {
  constructor(...args){
    args = args[0]

    this.Country = args[0];
    this.Speed = args[1];
    this.Opacity = args[3];
    this.Color = args[2];
    this.Trail = args[4];
    this.tradeType = args[5];
    this.showText = args[6];
    this.sound = args[7];

    this.trade = trade[this.Country][this.tradeType]
    this.system = new ParticleSystem();
    this.origin = latlng[this.Country];
    this.animationQue = []
    this.interval = 1;
    this.Start();
  }

  Start(){
    for(let destinationName in this.trade){
      if(latlng[destinationName]){
        let destination = latlng[destinationName]
        let size = scale(this.trade[destinationName])
        size = p5.constrain(size, 2, 64);
        this.animationQue.push(setTimeout(()=> {this.system.addParticle(this.origin, destination, this.Country, destinationName, size, this.Color, this.Opacity, this.Trail, this.tradeType, this.showText, this.sound)}, (this.interval * 5000)/this.Speed));

        this.interval += 1;
        this.particles = this.system.currentParticles();
      } else {
        console.warn(country + " not found :(");
      }
    }
    this.interval = 1;
  }
}

export { Country };
