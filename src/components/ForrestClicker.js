import { map, prop, clamp, T, F } from 'ramda';
import * as most from 'most';
import { h } from '@cycle/dom';

// Components
import Environment from './organisms/Environment';
import Camera from './organisms/Camera';
import { joinStreams, joinAllStreams } from '../utils/StreamHelpers';

const intent = ({ DOM }) =>
  ({
    plantClick$: DOM.select('#plant-tree').events('click'),
    mouseDown$: DOM.select('#app_container')
      .events('mousedown')
      .map(T),

    mouseUp$: DOM.select('#app_container')
      .events('mouseup')
      .map(F),

    mouseMove$: DOM.select('#app_container')
      .events('mousemove')
      .map(({ movementX, movementY }) => ({ x: movementX, y: movementY })),
  });

const model = ({ plantClick$, mouseUp$, mouseDown$, mouseMove$ }) => {
  const mouseUpDown$ = mouseUp$
    .merge(mouseDown$)
    .throttle(20);

  const clampYRot = clamp(-1, 1);
  const envProp$ = joinStreams(mouseUpDown$, mouseMove$)
    .filter(([hold, _]) => hold) // Transduce here
    .map(([_, rot]) => rot)
    .scan(
      (rot, mov) => ({ x: rot.x + mov.x, y: clampYRot(rot.y + mov.y) }),
      { x: 0, y: 0 },
    )
    .map(rotation => ({ rotation }))
    .startWith({ rotation: { x: 0, y: 0 } });

  return {
    envProp$,
    addTree$: plantClick$,
  };
};

const view = sceneEntity$ =>
  sceneEntity$.map(sceneEntities =>
    h('div',
      [
        h('section#ui', [h('button#plant-tree', 'Plant New Tree')]),
        h('a-scene', sceneEntities),
      ],
    ),
  );

const ForrestClicker = (sources) => {
  const { DOM } = sources;

  const action$ = intent(sources);
  const state$ = model(action$);
  const sceneEntityStreams = [
    Camera({ DOM, prop$: most.of({}) }),
    Environment({ DOM, prop$: state$.envProp$, addTree$: state$.addTree$ }),
  ];

  const sceneDom$ = joinAllStreams(map(prop('DOM'), sceneEntityStreams));
  const vdom$ = view(sceneDom$);

  return {
    DOM: vdom$,
  };
};

export default ForrestClicker;
