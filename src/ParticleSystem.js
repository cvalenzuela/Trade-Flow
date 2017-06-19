// Particle System

import { Particle } from './Particle';

class ParticleSystem {
  constructor(){
    this.particles = [];
  }

  addParticle(origin, destination, size, color) {
    this.particles.push(new Particle(origin, destination, size, color));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.display();
      p.isDead() && (this.particles.splice(i, 1));
    }
  }

  clear(){
    this.particles = []
  }

  changeColor(){

  }
}

export { ParticleSystem };
