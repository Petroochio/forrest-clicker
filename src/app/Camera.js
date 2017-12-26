import xs from 'xstream';
import { aEntity } from './utils/AframeHyperscript';

function view() {
  return xs.of(aEntity({
    attrs: {
      position: '0 0 2',
      camera: true,
      'mouse-events': true,
    },
  }));
}

function Camera() {
  const sinks = {
    DOM: view(),
  };

  return sinks;
}

export default Camera;
