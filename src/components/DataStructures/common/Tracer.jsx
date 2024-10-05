/* eslint-disable class-methods-use-this */
import React from 'react';
import Renderer from './Renderer/index';

class Tracer {
  constructor(key, getObject, title, options) {
    this.key = key;
    this.getObject = getObject;
    this.title = title;
    if (options !== undefined) {
      this.arrayItemMagnitudes = options.arrayItemMagnitudes;
      this.largestValue = options.largestValue;
      this.size = options.size;
    }
    this.init();
    this.reset();
  }

  getRendererClass() {
    return Renderer;
  }

  init() {
  }

  render() {
    const RendererClass = this.getRendererClass();
    return (
      <RendererClass
        key={this.key}
        title={this.title}
        data={this}
        size={this.size}
        initialZoom={this.initialZoom}
      />
    );
  }

  set() {
  }

  // set visualiser size multiplier
  setSize(size) {
    this.size = size;
  }

  // set the initial zoom value
  // if you use more than one instance of the same tracer for your algorithm
  // you need to execute GlobalActions.LOAD_ALGORITHM to apply a different
  // value, e.g, Hashing, for the larger table to render with a smaller zoom,
  // each time the radio buttons are pressed, GlobalActions.LOAD_ALGORITHM has
  // to be executed
  setInitialZoom(zoom) {
    this.initialZoom = zoom;
  }

  reset() {
    this.set();
  }
}

export default Tracer;
