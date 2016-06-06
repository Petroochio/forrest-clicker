// Lib
import THREE, { Clock, Scene, WebGLRenderer } from 'three';

// Local
import { Tree } from './factories';

const clock = new Clock();
const scene = new Scene();
const renderer = new WebGLRenderer({ antialias: true });

let renderSpace;
let camera;

const update = () => {
  const dt = clock.getDelta();
  requestAnimationFrame(update);
  scene.rotation.y += dt * 0.5;
  renderer.render(scene, camera);
};

// Initialize Functions
const makeCamera = () =>
  new THREE.PerspectiveCamera(
    45,
    renderSpace.clientWidth / renderSpace.clientHeight,
    1,
    1000);

export const init = () => {
  renderSpace = document.getElementById('renderer');

  camera = makeCamera();
  camera.position.z = 10;
  camera.position.y = 7;
  camera.lookAt(new THREE.Vector3());

  scene.add(Tree());

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x444444));

  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(renderSpace.clientWidth, renderSpace.clientHeight);
  renderSpace.appendChild(renderer.domElement);

  requestAnimationFrame(update);
};

export default {
  init,
};
