// Base Particle

import { p5Instance as p5, map } from './index'

class Particle {
  constructor(origin, destination, size, color){
    this.origin = origin;
    this.destination = destination;
    this.amount = p5.createVector(0,0);
    this.position = p5.createVector(0,0);
    this.steps = 0.003;
    this.size = 0;
    this.maxSize = size;
    this.reachSize = false;
    this.history = [];
    this.color = color;
  }

  display() {
    this.posOrigin = map.latLng(this.origin.lat, this.origin.lng);
    this.posDestination = map.latLng(this.destination.lat, this.destination.lng);

    (this.size < this.maxSize && !this.reachSize) && (this.size += 1);
    this.size >= this.maxSize && (this.reachSize = true);
    (this.amount.x > 0.98 && this.reachSize) && (this.size -= 1);

    if(this.amount.x < 1){
      this.position.x = p5.lerp(this.posOrigin.x, this.posDestination.x, this.amount.x);
      this.amount.x += this.steps;
    }
    if(this.amount.y < 1){
      this.position.y = p5.lerp(this.posOrigin.y, this.posDestination.y, this.amount.y);
      this.amount.y += this.steps;
    }

    this.history.push(this.position.copy())
    this.history.length > 10 && (this.history.splice(0, 1));

    for(let i = 0; i < this.history.length; i++){
      let pos = this.history[i];
      p5.fill(this.color[0], this.color[1], this.color[2], i*5);
      p5.ellipse(pos.x, pos.y, this.size, this.size);
    }

    p5.fill(this.color[0], this.color[1], this.color[2]);
    p5.ellipse(this.position.x, this.position.y, this.size, this.size);

    if(this.amount.x >= 1 && this.amount.y >= 1) {
      this.lifespan = -1;
    }
  };

  isDead() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
}

export { Particle };
