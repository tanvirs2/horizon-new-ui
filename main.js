import * as THREE from './node_modules/three/build/three.module.min.js';




/*

// Scene Setup
const scene = new THREE.Scene();

// Set a light background color
scene.background = new THREE.Color(0xeeeeee); // Light gray background

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer Setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the planet geometry
const geometry = new THREE.SphereGeometry(5, 32, 32);

// Create a material (use a solid color instead of wireframe)
const material = new THREE.MeshStandardMaterial({
    color: 0x44aa88, // A greenish color for the planet
    roughness: 0.6,
    metalness: 0.1
});

// Create the planet mesh
const planet = new THREE.Mesh(geometry, material);

// Add the planet to the scene
scene.add(planet);

// Create a PointLight
const pointLight = new THREE.PointLight(0xffffff, 1.5, 100); // White light with intensity 1.5
pointLight.position.set(10, 10, 10); // Set light position

// Add the point light to the scene
scene.add(pointLight);

// Add a light helper to visualize the light position
const lightHelper = new THREE.PointLightHelper(pointLight, 1); // 1 is the size of the helper
scene.add(lightHelper);

// Add ambient light to illuminate the planet evenly
const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft light for better visibility
scene.add(ambientLight);

// Position the camera
camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the planet for effect
    planet.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation
animate();
*/


































// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Bubble geometry
const bubbleGeometry = new THREE.SphereGeometry(0.2, 32, 32);

// Function to create a cluster of bubbles with a specific color
function createBubbleCluster(count, xOffset, yOffset, zOffset, color) {
    const cluster = new THREE.Group();

    const bubbleMaterial = new THREE.MeshBasicMaterial({
        color: color,
        opacity: 0.6,
        transparent: true,
    });

    for (let i = 0; i < count; i++) {
        const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
        bubble.position.set(
            Math.random() * 2 - 1 + xOffset, // Random position around the cluster's center
            Math.random() * 2 - 1 + yOffset,
            Math.random() * 2 - 1 + zOffset
        );
        cluster.add(bubble);
    }

    return cluster;
}

// Create clusters with different bubble counts and colors
const cluster1 = createBubbleCluster(70, -2, 0, 0, 0x00aaff); // Blue
const cluster2 = createBubbleCluster(15, 3, 2, 0, 0xff6347); // Tomato Red
const cluster3 = createBubbleCluster(10, 0, -2, -3, 0x32cd32); // Lime Green
const cluster4 = createBubbleCluster(5, 2, -3, 3, 0x9932cc); // Dark Orchid

// Add clusters to the scene
scene.add(cluster1);
scene.add(cluster2);
scene.add(cluster3);
scene.add(cluster4);

// Set camera position
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the scene for a dynamic effect
    scene.rotation.y += 0.005;

    // Render the scene
    renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
