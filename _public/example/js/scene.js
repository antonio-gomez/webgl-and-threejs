/*
|--------------------------------------------------------------------------
| Scene
|--------------------------------------------------------------------------
| Three.js Scene
|
*/

;(function(){

	'use strict';

	var scene, camera, loader, renderer, container;
	var ambientLight, pointLight, directionalLightRight, directionalLightLeft;

	if(!init()) animate();

	function init() {

		// Container
		container = document.createElement('div');
		document.body.appendChild(container);

		//Scene
		scene = new THREE.Scene();

		//Camera
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		scene.add(camera);

		//Renderer
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha : true
		});	
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		//Light rig
		setupLightRig();

		//Load geometry
		loadGeometry();

		//Animate
		animate();

		//Window resize listener
		window.addEventListener('resize', onWindowResize, false);	
	}

	function setupLightRig() {

		ambientLight = new THREE.AmbientLight(0x111111);
		scene.add(ambientLight);

		pointLight = new THREE.PointLight(0x666666, 1);
		scene.add(pointLight);

		directionalLightRight = new THREE.DirectionalLight( 0xF0F0F0 );
		directionalLightRight.position.set(1, 1, 1).normalize();
		scene.add( directionalLightRight );

		directionalLightLeft = new THREE.DirectionalLight( 0xF0F0F0 );
		directionalLightLeft.position.set(-1, 1, -1).normalize();
		scene.add( directionalLightLeft );
	}

	function loadGeometry() {

		loader = new THREE.ObjectLoader();

		loader.load('geometry/sandiegojs_logo.json', function(geometry) {
			geometry.scale.x = geometry.scale.y = geometry.scale.z = 0.4;
			scene.add(geometry);
		});
	}

	function render() {

		var timer = Date.now() * 0.0007;

		camera.position.x = Math.cos(timer) * 10;
		camera.position.y = Math.cos(timer) * -5;
		camera.position.z = Math.sin(timer) * 20;

		camera.lookAt(scene.position);
		renderer.render(scene, camera);
	}

	function animate() {

		render();
		requestAnimationFrame(animate);
	}

	function onWindowResize() {
		
		//Camera aspect ratio
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		// Renderer
		renderer.setSize( window.innerWidth, window.innerHeight );
	}	

})();
