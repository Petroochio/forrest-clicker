// Aframe setup
import 'aframe';
import run from '@cycle/run';
import { makeDOMDriver } from '@cycle/dom';
import { timeDriver } from '@cycle/time';

import './aframe-addons';
import ForrestClicker from './app';

function makeDrivers() {
  const drivers = {
    DOM: makeDOMDriver('#root'),
    Time: timeDriver,
  };
  return drivers;
}

window.onload = () => run(ForrestClicker, makeDrivers());
