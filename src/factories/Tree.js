import THREE from 'three';

const geom = new THREE.BoxGeometry(1, 3, 1);
const mat = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });
mat.shading = 1;

export default function () {
  return new THREE.Mesh(geom, mat);
}
