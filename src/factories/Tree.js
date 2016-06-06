import THREE from 'three';

const geom = new THREE.BoxGeometry(2, 2, 2);
const mat = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });

export default function () {
  return new THREE.Mesh(geom, mat);
}
