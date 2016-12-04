import { h } from '@cycle/dom';
import isolate from '@cycle/isolate';

import { joinStreams } from '../../utils/StreamHelpers';

const cylinderAttrs = {
  material: 'flatShading: true;',
  position: '0 0 0',
  rotation: '90 0 0',
  radius: '0.2',
  color: '#452B22',
  height: '1.4',
  'segments-height': '1',
  'segments-radial': '8',
};

const coneAttr1 = {
  material: 'flatShading: true;',
  position: '0 0 -1',
  rotation: '-90 0 0',
  color: '#098500',
  height: '0.9',
  'radius-top': '0',
  'radius-bottom': '0.5',
  'segments-height': '1',
  'segments-radial': '8',
};

const coneAttr2 = {
  material: 'flatShading: true;',
  position: '0 0 -0.6',
  rotation: '-90 0 0',
  color: '#098500',
  height: '0.9',
  'radius-top': '0',
  'radius-bottom': '0.6',
  'segments-height': '1',
  'segments-radial': '8',
};

const renderTree = [
  h('a-cone', { attrs: coneAttr1 }),
  h('a-cone', { attrs: coneAttr2 }),
  h('a-cylinder', { attrs: cylinderAttrs }),
];

/** Get all click events on current tree */
const intent = DOM =>
  DOM.select('.clickable-tree')
  .events('click');

/** Get tree size from click events */
const model = click$ =>
  click$.startWith(1)
  .constant(0.05)
  .scan((r, delta) => r + delta, 0.20);

const view = (prop$, state$) =>
  joinStreams(prop$, state$)
  .map(([props, state]) =>
    h('a-entity.clickable-tree',
      { attrs: { position: `${props.position}`, 'look-at': '0 0 0', scale: `${state} ${state} ${state}` } },
      renderTree,
    ),
  );

/**
 * Clickable Tree component
 */
const ClickableTree = (sources) => {
  const { DOM, prop$ } = sources;

  const change$ = intent(DOM);
  const state$ = model(change$);
  const vtree$ = view(prop$, state$);

  return {
    DOM: vtree$,
    size$: state$,
  };
};

const IsolatedClickableTree = sources => isolate(ClickableTree)(sources);
export default IsolatedClickableTree;
