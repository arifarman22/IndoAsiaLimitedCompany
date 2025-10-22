// three-scene.js script - Enhanced
let scene, camera, renderer, container;
let objects = [];
let particleSystem;
let isAnimating = true;

function initThree(containerId) {
  container = document.getElementById(containerId);
  if (!container) return;

  // Initialize scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);
  scene.fog = new THREE.Fog(0x0a0a0a, 10, 20);

  // Initialize camera
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 15;

  // Initialize renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xff4d94, 1, 100);
  pointLight.position.set(-5, -5, 5);
  scene.add(pointLight);

  // Create product models
  createProductModels();

  // Create particle system
  createParticleSystem();

  // Add orbit controls if available
  if (typeof THREE.OrbitControls !== 'undefined') {
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  // Start animation loop
  animate();

  // Add interaction
  container.addEventListener('click', () => {
    isAnimating = !isAnimating;
  });
}

function createProductModels() {
  // Main product - Enhanced Box with professional texture
  const geometry = new THREE.BoxGeometry(3, 3, 3);
  const textureLoader = new THREE.TextureLoader();
  
  // Create a professional texture with the company logo/name
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext('2d');
  
  // Background gradient
  const gradient = context.createLinearGradient(0, 0, 1024, 1024);
  gradient.addColorStop(0, '#0a0a0a');
  gradient.addColorStop(0.5, '#141414');
  gradient.addColorStop(1, '#1f1f1f');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 1024, 1024);
  
  // Add subtle pattern
  context.fillStyle = 'rgba(37, 99, 235, 0.1)';
  for (let i = 0; i < 20; i++) {
    context.fillRect(Math.random() * 1024, Math.random() * 1024, 2, 2);
  }
  
  // Company text with professional styling
  context.font = 'bold 120px Playfair Display';
  context.fillStyle = '#00d4ff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('BCI', 512, 400);
  
  context.font = '60px Source Sans Pro';
  context.fillStyle = '#ffffff';
  context.fillText('IMPORTS', 512, 550);
  
  // Add accent line
  context.strokeStyle = '#ff4d94';
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(300, 600);
  context.lineTo(724, 600);
  context.stroke();
  
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshPhongMaterial({ 
    map: texture,
    shininess: 150,
    specular: new THREE.Color(0x00d4ff),
    emissive: new THREE.Color(0x001122),
    emissiveIntensity: 0.1
  });
  
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);
  objects.push(cube);

  // Add floating geometric shapes around the main cube
  for (let i = 0; i < 8; i++) {
    const shapeType = Math.random();
    let shape;
    
    if (shapeType < 0.33) {
      // Sphere
      const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const sphereMaterial = new THREE.MeshPhongMaterial({ 
        color: i % 2 === 0 ? 0x00d4ff : 0xff4d94,
        shininess: 100,
        emissive: new THREE.Color(i % 2 === 0 ? 0x001133 : 0x330011),
        emissiveIntensity: 0.2
      });
      shape = new THREE.Mesh(sphereGeometry, sphereMaterial);
    } else if (shapeType < 0.66) {
      // Torus
      const torusGeometry = new THREE.TorusGeometry(0.6, 0.2, 8, 16);
      const torusMaterial = new THREE.MeshPhongMaterial({ 
        color: i % 2 === 0 ? 0x0099ff : 0xff6b9d,
        shininess: 80
      });
      shape = new THREE.Mesh(torusGeometry, torusMaterial);
    } else {
      // Octahedron
      const octaGeometry = new THREE.OctahedronGeometry(0.7);
      const octaMaterial = new THREE.MeshPhongMaterial({ 
        color: i % 2 === 0 ? 0x00bfff : 0xff8bb3,
        shininess: 120,
        wireframe: Math.random() > 0.5
      });
      shape = new THREE.Mesh(octaGeometry, octaMaterial);
    }
    
    shape.originalPosition = new THREE.Vector3(
      Math.cos((i / 8) * Math.PI * 2) * 8,
      (Math.random() - 0.5) * 4,
      Math.sin((i / 8) * Math.PI * 2) * 8
    );
    shape.position.copy(shape.originalPosition);
    shape.castShadow = true;
    shape.userData = { 
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      orbitSpeed: (Math.random() - 0.5) * 0.01,
      bobSpeed: Math.random() * 0.01 + 0.005
    };
    scene.add(shape);
    objects.push(shape);
  }
}

function createParticleSystem() {
  const particleCount = 1000;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 50;
    positions[i3 + 1] = (Math.random() - 0.5) * 50;
    positions[i3 + 2] = (Math.random() - 0.5) * 50;

    colors[i3] = Math.random() * 0.5 + 0.5; // R
    colors[i3 + 1] = Math.random() * 0.5 + 0.5; // G
    colors[i3 + 2] = Math.random() * 0.5 + 0.5; // B
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);
}

function onWindowResize() {
  if (!camera || !renderer || !container) return;
  
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (isAnimating) {
    const time = Date.now() * 0.001;
    
    // Enhanced main cube rotation with subtle pulsing
    objects[0].rotation.x += 0.005;
    objects[0].rotation.y += 0.01;
    objects[0].rotation.z += 0.002;
    
    // Add subtle scale pulsing to main cube
    const pulseScale = 1 + Math.sin(time * 2) * 0.05;
    objects[0].scale.setScalar(pulseScale);

    // Enhanced floating shapes animation
    for (let i = 1; i < objects.length; i++) {
      const object = objects[i];
      const userData = object.userData;
      
      // Individual rotation
      object.rotation.x += userData.rotationSpeed;
      object.rotation.y += userData.rotationSpeed * 1.5;
      object.rotation.z += userData.rotationSpeed * 0.5;
      
      // Complex orbital motion
      const orbitRadius = 8 + Math.sin(time * 0.5 + i) * 2;
      const orbitAngle = time * 0.2 + (i / objects.length) * Math.PI * 2;
      
      object.position.x = Math.cos(orbitAngle) * orbitRadius;
      object.position.z = Math.sin(orbitAngle) * orbitRadius;
      
      // Vertical bobbing motion
      object.position.y = object.originalPosition.y + Math.sin(time * userData.bobSpeed + i) * 2;
      
      // Subtle scale variation
      const scaleVariation = 1 + Math.sin(time * 3 + i) * 0.1;
      object.scale.setScalar(scaleVariation);
    }

    // Enhanced particle system with dynamic movement
    if (particleSystem) {
      particleSystem.rotation.x += 0.0005;
      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.z += 0.0002;
      
      // Dynamic particle size based on time
      const particleSize = 0.1 + Math.sin(time) * 0.05;
      particleSystem.material.size = particleSize;
    }
    
    // Camera subtle movement for more dynamic feel
    camera.position.x = Math.sin(time * 0.1) * 0.5;
    camera.position.y = Math.cos(time * 0.15) * 0.3;
    camera.lookAt(scene.position);
  }

  renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('three-container')) {
    initThree('three-container');
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    isAnimating = false;
  } else {
    isAnimating = true;
  }
});