// Particle System

import { Particle } from './Particle';

class ParticleSystem {
  constructor(){
    this.particles = [];
    this.ended = false;
    this.started = false;
  }

  addParticle(...args) {
    this.originName = args[2];
    this.particles.push(new Particle(args));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      this.started = true;
      p.display();
      p.isDead() && (this.particles.splice(i, 1));
    }

    if(this.particles.length == 0 && this.started){
      let originName = document.getElementById("originName"); // delete this name once it has ended.
      originName && (originName.remove());
      this.ended = true;
    }
  }

  currentParticles (){
    return this.particles;
  }
}

export { ParticleSystem };
