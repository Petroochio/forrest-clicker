// Aframe setup
import 'aframe';
import 'kframe';
import 'aframe-mouse-cursor-component';
import Cycle from '@cycle/most-run';
import { makeDOMDriver } from '@cycle/dom';
// Main Component
import ForrestClicker from './components/ForrestClicker';

const main = ForrestClicker;
const makeDrivers = () =>
  ({
    DOM: makeDOMDriver('#app_container'),
  });

window.onload = () => Cycle.run(main, makeDrivers());
