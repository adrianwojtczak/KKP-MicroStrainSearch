function checkCollision(newPosition, existingLights, minDistance = 40) {
	for (const light of existingLights) {
		const rect = light.getBoundingClientRect();
		const existingPos = {
			x: rect.left,
			y: rect.top,
		};

		const distance = Math.sqrt(
			Math.pow(newPosition.x - existingPos.x, 2) + Math.pow(newPosition.y - existingPos.y, 2)
		);

		if (distance < minDistance) {
			return true;
		}
	}
	return false;
}

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('christmas-lights-container');
	const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
	const numberOfLights = 50;

	function createLight() {
		const light = document.createElement('div');
		light.className = 'christmas-light';
		light.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		return light;
	}

	function positionLight(light) {
		let position;
		let attempts = 0;
		const maxAttempts = 50;

		do {
			const side = Math.floor(Math.random() * 4);
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			let x, y;

			switch (side) {
				case 0: // Top
					x = Math.random() * viewportWidth;
					y = 0;
					break;
				case 1: // Right
					x = viewportWidth - 20; // Adjust for light width
					y = Math.random() * viewportHeight;
					break;
				case 2: // Bottom
					x = Math.random() * viewportWidth;
					y = viewportHeight - 20; // Adjust for light height
					break;
				case 3: // Left
					x = 0;
					y = Math.random() * viewportHeight;
					break;
			}

			position = { x, y };
			attempts++;
		} while (checkCollision(position, Array.from(container.children)) && attempts < maxAttempts);

		light.style.left = `${position.x}px`;
		light.style.top = `${position.y}px`;
	}

	function updateLightsPositions() {
		const lights = container.children;
		Array.from(lights).forEach(light => {
			positionLight(light);
		});
	}

	// Initial creation of lights
	for (let i = 0; i < numberOfLights; i++) {
		const light = createLight();
		positionLight(light);
		container.appendChild(light);
	}

	// Update positions when window is resized
	window.addEventListener('resize', updateLightsPositions);
});
