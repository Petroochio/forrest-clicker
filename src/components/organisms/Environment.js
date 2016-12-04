/** Contains all static environment elements */
import { map, prop, append } from 'ramda';
import * as most from 'most';
import { h } from '@cycle/dom';

import EVN_ATTR from '../../constants/EnvironmentAttr';
import { joinAllStreams } from '../../utils/StreamHelpers';
import GenerateTree from '../../utils/GenerateTree';
import ClickableTree from '../molecules/ClickableTree';

const earthProps = {
  attrs: {
    radius: EVN_ATTR.earthRadius,
    material: 'flatShading: true;',
    'segments-height': '15',
    'segments-width': '15',
    color: '#2C58FF',
  },
};

const view = (prop$, trees$) =>
  joinAllStreams([prop$, trees$])
  .map(([props, trees]) =>
    h('a-entity',
      { attrs: { position: '0 0 -5', rotation: `0 ${props.rotation.x} 0` } },
      [
        h('a-sphere#earth', earthProps),
        h('a-sky', { attrs: { color: '#000022' } }),
        ...trees,
      ],
    ),
  );

/**
 * Environment component
 */
const Environment = (sources) => {
  const { DOM, prop$, addTree$ } = sources;

  const clickTreeStreams = [
    ClickableTree({ DOM, prop$: most.of({ position: '2.1 0 0' }) }),
    ClickableTree({ DOM, prop$: most.of({ position: '-2.1 0 0' }) }),
    ClickableTree({ DOM, prop$: most.of({ position: '0 2.1 0' }) }),
    ClickableTree({ DOM, prop$: most.of({ position: '0 -2.1 0' }) }),
  ];

  const clickTree$ = addTree$
    .map(() => ClickableTree({ DOM, prop$: most.of(GenerateTree()) }))
    .map(prop('DOM'))
    .scan((acc, curr) => {
      acc.push(curr);
      return acc;
    }, [])
    // .map(map(prop('DOM')))
    .map(joinAllStreams)
    .tap(x => console.info(x))
    .switch()
    .tap(x => console.info(x))
    .startWith([]);
    // .map(map(most.join));
    // .chain(trees => most.combine((...t) => t, ...map(prop('DOM'), trees)));

  // const clickTree$ = addTree$
  //   .map(() => ClickableTree({ DOM, prop$: most.of(GenerateTree()) }))
  //   .map(prop('DOM'))
  //   .join()
  //   .scan((acc, t) => append(t, acc), []);

  // clickTree$.forEach(x => console.info(x));

  const trees$ = joinAllStreams(map(prop('DOM'), clickTreeStreams));
  trees$.forEach(x => console.info(x));
  const vtree$ = view(prop$, clickTree$);
  return {
    DOM: vtree$,
  };
};

export default Environment;
