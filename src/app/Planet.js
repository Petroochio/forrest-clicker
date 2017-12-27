import xs from 'xstream';
import { h } from '@cycle/dom';
import { clamp } from 'ramda';

import { aEntity, aSky } from './utils/AframeHyperscript';
import TreeCollection from './TreeCollection';

/** Contains all static environment elements */
const earthProps = {
  attrs: {
    material: 'flatShading: true; color: #2C58FF',
    geometry: 'primitive: sphere; radius: 1; segmentsWidth: 15; segmentsHeight: 15;',
  },
};

function intent(sources) {
  const { Time, DOM } = sources;
}

function model(actions) {

}

function view(prop$, tree$) {
  return xs.combine(prop$, tree$).map(([props, trees]) =>
    h(
      'a-entity',
      { attrs: { position: '0 0 -5', rotation: `0 ${props.rotation.x} 0` } },
      [
        aEntity('#earth', earthProps),
        aSky({ attrs: { color: '#000022' } }),
        trees,
      ]
    ));
}

function Planet(sources) {
  const trees = TreeCollection(sources);

  return {
    DOM: view(sources.rotation$, trees.DOM),
  };
}

export default Planet;
