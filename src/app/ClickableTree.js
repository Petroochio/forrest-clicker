import xs from 'xstream';
import { join } from 'ramda';
import { h } from '@cycle/dom';

import { aEntity } from './utils/AframeHyperscript';

// THESE SHOULD BE MODELS
const cylinderAttrs = {
  geometry: `primitive: cylinder;
             radius: 0.2;
             segmentsHeight: 1;
             segmentsRadial: 8;
             height: 1.4;`,
  material: 'flatShading: true; color: #452B22',
  position: '0 0 0',
};

const coneAttr1 = {
  geometry: `primitive: cone;
             radiusBottom: 0.5;
             radiusTop: 0;
             segmentsHeight: 1;
             segmentsRadial: 8;
             height: 0.9;`,
  material: 'flatShading: true; color: #098500',
  position: '0 1 0',
};

const coneAttr2 = {
  geometry: `primitive: cone;
             radiusBottom: 0.6;
             radiusTop: 0;
             segmentsHeight: 1;
             segmentsRadial: 8;
             height: 0.9;`,
  material: 'flatShading: true; color: #098500',
  position: '0 0.6 0',
};

const renderTree = [
  aEntity('.tree-part', { attrs: coneAttr1 }),
  aEntity('.tree-part', { attrs: coneAttr2 }),
  aEntity('.tree-part', { attrs: cylinderAttrs }),
];

function intent(sources) {
  const { DOM } = sources;
  const click$ = DOM.select('.tree-part').events('mouseup');

  return {
    click$,
  };
}

/** Get tree size from click events */
function model(actions) {
  const size$ = actions.click$
    .mapTo(0.05)
    .fold((r, delta) => r + delta, 0.20);

  return {
    size$,
  };
}

function treeAttrs(pos, state) {
  return {
    attrs: {
      position: `${pos}`,
      scale: `${state} ${state} ${state}`,
    },
  };
}

function view(pos$, state$) {
  return xs.combine(pos$.map(join(' ')), state$)
    .map(([p, s]) => aEntity('.click-tree', treeAttrs(p, s), renderTree));
}

/**
 * Clickable Tree component
 */
function ClickableTree(sources) {
  const { position$ } = sources;

  const actions = intent(sources);
  const state = model(actions);
  const vdom$ = view(position$, state.size$);

  return {
    DOM: vdom$,
    size$: state.size$,
  };
}

export default ClickableTree;
