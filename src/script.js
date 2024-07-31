import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

/**
 * Base
 */
// Debug
const gui = new Pane({ title: "Tweaks ('h' to hide)" });

//Debug object
const debugObject = {
  backColor: "#000206",
  color: "#6f00e0",
  material: "/textures/matcaps/7.png",
};

window.addEventListener("keydown", (event) => {
  if (event.key == "h") {
    gui.expanded = !gui.expanded;
  }
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(debugObject.color, 4.348, 13);
// scene.fog;

const sceneGui = gui.addFolder({ title: "Scene Tweaks" });
const fogTweaks = sceneGui.addFolder({ title: "Fog" });
fogTweaks.addBinding(scene.fog, "color", { color: { type: "float" } });
fogTweaks.addBinding(scene.fog, "near", { min: 0, max: 100, step: 0.001 });
fogTweaks.addBinding(scene.fog, "far", { min: 0, max: 100, step: 0.005 });

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
let matcapTexture = textureLoader.load(debugObject.material);
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const objGui = gui.addFolder({ title: "Object Tweaks" });
objGui
  .addBinding(debugObject, "material", {
    options: {
      1: "/textures/matcaps/1.png",
      2: "/textures/matcaps/2.png",
      3: "/textures/matcaps/3.png",
      4: "/textures/matcaps/4.png",
      5: "/textures/matcaps/5.png",
      6: "/textures/matcaps/6.png",
      7: "/textures/matcaps/7.png",
      8: "/textures/matcaps/8.png",
      9: "/textures/matcaps/9.png",
      10: "/textures/matcaps/10.png",
      11: "/textures/matcaps/11.png",
      12: "/textures/matcaps/12.png",
    },
  })
  .on("change", () => {
    matcapTexture = textureLoader.load(debugObject.material);
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    updateMaterial();
  });

/**
 * Fonts
 */
const fontLoader = new FontLoader();
let text;
fontLoader.load("/fonts/JetBrains_Mono_NL_Regular.json", (font) => {
  const textGeometry = new TextGeometry("</3js\n is Awesome>", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   (textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.02) * 0.5
  // );

  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  material.wireframe = true;

  objGui.addBinding(material, "wireframe");

  text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const boxGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);

    donut.position.x = (Math.random() - 0.5) * 15;
    donut.position.y = (Math.random() - 0.5) * 15;
    donut.position.z = (Math.random() - 0.5) * 15;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.z = Math.random() * Math.PI;

    const scaleValue = Math.random();
    donut.scale.set(scaleValue, scaleValue, scaleValue);

    const box = new THREE.Mesh(boxGeometry, material);

    box.position.x = (Math.random() - 0.5) * 15;
    box.position.y = (Math.random() - 0.5) * 15;
    box.position.z = (Math.random() - 0.5) * 15;

    box.rotation.x = Math.random() * Math.PI;
    box.rotation.z = Math.random() * Math.PI;

    box.scale.set(scaleValue, scaleValue, scaleValue);

    scene.add(donut, box);
  }
});

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  "./textures/environmentMap/kloppenheim_06_puresky_2k.hdr",
  (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;

    // scene.background = environmentMap;
    scene.environment = environmentMap;
  }
);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setClearColor(debugObject.backColor);

const backgroundTweaks = sceneGui.addFolder({ title: "Background" });
backgroundTweaks.addBinding(debugObject, "backColor").on("change", () => {
  renderer.setClearColor(debugObject.color);
});

// Smooth Rotation
let mouseX = 0;
let mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

document.addEventListener("mousemove", (event) => {
  mouseX = (event.clientX - windowHalfX) / 100;
  mouseY = (event.clientY - windowHalfY) / 100;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  scene.rotation.x = Math.sin(elapsedTime) * 0.3;
  scene.rotation.y = Math.cos(elapsedTime) * 0.3;

  // Rotate text mesh
  if (text) {
    text.rotation.x = Math.sin(elapsedTime) * 0.2;
    text.rotation.y = Math.cos(elapsedTime) * 0.2;
  }

  // // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Update matcap material
function updateMaterial() {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.matcap = matcapTexture;
      child.material.needsUpdate = true;
    }
  });
}
