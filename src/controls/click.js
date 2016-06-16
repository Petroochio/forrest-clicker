import THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouseCastVector = new THREE.Vector2(0, 0);

export const doRaycastIntersect = (camera, entities, x, y) => {
  mouseCastVector.set(x, y);
  raycaster.setFromCamera(mouseCastVector, camera);
  const result = raycaster.intersectObjects(entities)[0];
  if (result) result.object.scale.multiplyScalar(1.03);
};
