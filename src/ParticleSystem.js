// Particle System

import { Particle } from './Particle';

class ParticleSystem {
  constructor(){
    this.particles = [];
    this.ended = false;
    this.started = false;
  }

  addParticle(origin, destination, originName, destinationName, size, color, opacity, trail, tradeType) {
    this.particles.push(new Particle(origin, destination, originName, destinationName, size, color, opacity, trail, tradeType));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      this.started = true;
      p.display();
      p.isDead() && (this.particles.splice(i, 1));
    }

    if(this.particles.length == 0 && this.started){
      this.ended = true;
    }
  }

  currentParticles (){
    return this.particles;
  }
}

export { ParticleSystem };
