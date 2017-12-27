import xs from 'xstream';
import { prop } from 'ramda';
import Collection from '@cycle/collection';
import isolate from '@cycle/isolate';

import { aEntity } from './utils/AframeHyperscript';
import ClickableTree from './ClickableTree';

function view(tree$) {
  return tree$.map(trees => aEntity('.forrest', {}, trees));
}

function TreeCollection(sources) {
  const { DOM, addTree$ } = sources;
  const initialTree$ = xs.fromArray([[-1.1, 0, 0], [1.1, 0, 0], [0, -1.1, 0], [0, 1.1, 0]]);

  const treeSources = { DOM };

  const newTree$ = addTree$
    .map(() => [Math.random() + 1, Math.random() - 2, 0]);

  const tree$ = Collection(
    isolate(ClickableTree),
    treeSources,
    xs.merge(initialTree$, newTree$).map(p => ({ position$: xs.of(p) })),
    // prop('remove$'),
  );
  const treeDom$ = Collection.pluck(tree$, prop('DOM'));

  const vdom$ = view(treeDom$);

  return {
    DOM: vdom$,
  };
}

export default TreeCollection;
