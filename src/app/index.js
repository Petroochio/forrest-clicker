import { map, prop, clamp, T, F } from 'ramda';
import xs from 'xstream';
import { h } from '@cycle/dom';

import { aScene } from './utils/AframeHyperscript';

// Components
import Planet from './Planet';
import Camera from './Camera';

function intent(sources) {
  const { DOM, Time } = sources;
  const rootEl = DOM.select('#root');
  const plantClick$ = DOM.select('#plant-tree').events('click');
  const mouseDown$ = rootEl.events('mousedown').mapTo(true);
  const mouseUp$ = rootEl.events('mouseup').mapTo(false);
  const mouseMove$ = rootEl.events('mousemove')
    .map(({ movementX, movementY }) => ({ x: movementX, y: movementY }));

  return {
    plantClick$,
    mouseDown$,
    mouseUp$,
    mouseMove$,
  };
}

function model(sources, actions) {
  const { plantClick$, mouseUp$, mouseDown$, mouseMove$ } = actions;
  const mouseState$ = xs.merge(mouseUp$, mouseDown$)
    .compose(sources.Time.throttle(20));

  const clampYRot = clamp(-1, 1);
  const envProp$ = xs.combine(mouseState$, mouseMove$)
    .filter(([hold, _]) => hold)
    .map(([_, rot]) => rot)
    .fold(
      (rot, mov) => ({ x: rot.x + mov.x, y: clampYRot(rot.y + mov.y) }),
      { x: 0, y: 0 },
    )
    .map(rotation => ({ rotation }))
    .startWith({ rotation: { x: 0, y: 0 } });

  return {
    envProp$,
    addTree$: plantClick$,
  };
}

function view(state$) {
  return state$.map(sceneEntities =>
    h('div',
      [
        h('section#ui', [h('button#plant-tree', 'Plant New Tree')]),
        aScene(sceneEntities),
      ],
    ),
  );
}

function ForrestClicker(sources) {
  const { DOM } = sources;

  const actions = intent(sources);
  const state = model(sources, actions);

  const cam = Camera({ DOM, prop$: xs.of({}) });
  const planet = Planet({ DOM });
  const sceneDom$ = xs.combine(planet.DOM, cam.DOM);
  const vdom$ = view(sceneDom$);

  return {
    DOM: vdom$,
  };
}

export default ForrestClicker;
