/* Importing the Three.js Library so we can use its functions */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/* Getting the div from html. This is where Three.js will render our scene */
const canvas = document.querySelector("canvas.webgl");

// Create a scene
const scene = new THREE.Scene();

//Setting the background color of the scene
scene.background = new THREE.Color("Beige");

//Adding the orbit controls to the scene

/* Adding our 3D model */
//Loading the 3D model
const loader = new GLTFLoader();
loader.load("/Computer.glb", (gltf) => {
	scene.add(gltf.scene);
	/* Scaling the model */
	gltf.scene.scale.set(1, 1, 1);
	/* Positioning the model */
	gltf.scene.position.set(-6, -3, 0);
	/* Rotating the model  to to camera*/
	gltf.scene.rotation.y = Math.PI;
});

//Light
const light = new THREE.AmbientLight(0xffffff, 4);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 0, 5);

/* Adding the camera object to the scene */
scene.add(camera);

//Controls

/* Resizing canvas on window resize */
window.addEventListener("resize", () => {
	// Update sizes
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
/* Setting the renderer size to the full width of the webpage */
renderer.setSize(window.innerWidth, window.innerHeight);
//Setting the background color of the renderer
// renderer.setClearColor("beige", 1);

//Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

/* Animating the renderer to constantly show our 3D scene */
//animate
const tick = () => {
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};
tick();
