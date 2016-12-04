/**
 * Contains all static environment elements
 */
import * as most from 'most';
import { h } from '@cycle/dom';

const view = prop$ =>
  most.of(
    h('a-entity', { attrs: { camera: true, 'mouse-cursor': true } }),
  );

/**
 * Environment component
 */
const Camera = (sources) => {
  const { prop$ } = sources;

  const vtree$ = view(prop$);
  return {
    DOM: vtree$,
  };
};

export default Camera;
