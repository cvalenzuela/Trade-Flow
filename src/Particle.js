// Base Particle

import { p5Instance as p5, map } from './index'

class Particle {
  constructor(origin, destination, originName, destinationName, size, color, opacity, trail, tradeType){
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
    this.opacity = opacity;
    this.trail = trail;
    this.destinationName = destinationName;
    this.originName = originName;
    this.tradeType = tradeType;
  }

  display() {

    // Get latlng everytime since the map can change
    this.posOrigin = map.latLng(this.origin.lat, this.origin.lng);
    this.posDestination = map.latLng(this.destination.lat, this.destination.lng);

    // Handle the size
    (this.size < this.maxSize && !this.reachSize) && (this.size += 1);
    this.size >= this.maxSize && (this.reachSize = true);
    (this.amount.x > 0.98 && this.reachSize) && (this.size -= 1);

    // Calculate distance and path
    if(this.amount.x < 1){
      (this.tradeType == 'imports') ? this.position.x = p5.lerp(this.posDestination.x, this.posOrigin.x, this.amount.x) : this.position.x = p5.lerp(this.posOrigin.x, this.posDestination.x, this.amount.x);
      this.amount.x += this.steps;
    }
    if(this.amount.y < 1){
      (this.tradeType == 'imports') ? this.position.y = p5.lerp(this.posDestination.y, this.posOrigin.y, this.amount.y) : this.position.y = p5.lerp(this.posOrigin.y, this.posDestination.y, this.amount.y);
      this.amount.y += this.steps;
    }

    // Particle's trail
    this.history.push(this.position.copy())
    this.history.length > this.trail && (this.history.splice(0, 1));
    for(let i = 0; i < this.history.length; i++){
      let pos = this.history[i];
      p5.fill(this.color[0], this.color[1], this.color[2], this.opacity/15*i);
      p5.ellipse(pos.x, pos.y, this.size, this.size);
    }

    // Showing text lags the whole application
    // Show origin country the whole time
    //p5.fill(this.color[0], this.color[1], this.color[2], 255);
    //p5.textSize(map.getZoom()*2);
    //p5.text(this.originName, this.posOrigin.x, this.posOrigin.y, 50, 10);

    // Show destination country only when the particle is really close and when the user choose to.
    //p5.fill(this.color[0], this.color[1], this.color[2], 255);
    //(this.amount.x > 0.90) && (p5.text(this.destinationName, this.posDestination.x, this.posDestination.y))

    // Actual Particle
    p5.fill(this.color[0], this.color[1], this.color[2], this.opacity);
    p5.ellipse(this.position.x, this.position.y, this.size, this.size);

    // If arrived, erase from particle array
    if(this.amount.x >= 1 && this.amount.y >= 1) {
      this.lifespan = -1;
    }
  };

  // Erase once it has arrived
  isDead() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }
}

export { Particle };
