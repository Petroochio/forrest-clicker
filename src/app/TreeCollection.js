import xs from 'xstream';
import { map, prop, append } from 'ramda';
import { h } from '@cycle/dom';
import Collection from '@cycle/collection';
import isolate from '@cycle/isolate';

import { aEntity } from './utils/AframeHyperscript';
import ClickableTree from './ClickableTree';

function view(tree$) {
  return tree$.map(trees => aEntity('.forrest', {}, trees));
}

function TreeCollection(sources) {
  const { DOM, addTree$ } = sources;
  const initialTree$ = xs.fromArray([[-1.1, 0, 0], [1.1, 0, 0], [0, -1.1, 0], [0, 1.1, 0]])
    .map(p => ({ position$: xs.of(p) }));

  const treeSources = { DOM };

  const tree$ = Collection(
    isolate(ClickableTree),
    treeSources,
    initialTree$,
    // prop('remove$'),
  );
  const treeDom$ = Collection.pluck(tree$, prop('DOM'));

  const vdom$ = view(treeDom$);

  return {
    DOM: vdom$,
  };
}

export default TreeCollection;
