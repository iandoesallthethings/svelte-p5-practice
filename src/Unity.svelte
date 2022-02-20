<script>
	import { onMount } from 'svelte'

	let canvas
	let skybox
	let cube

	function getMouseFromCenter(e, containerRect) {
		return {
			x: e.clientX - containerRect.left - containerRect.width / 2,
			y: e.clientY - containerRect.top - containerRect.height / 2
		}
	}

	function getCenter(elementRect, containerRect, offset = { x: 0, y: 0 }) {
		return {
			x: containerRect.width / 2 - elementRect.width / 2 + offset.x,
			y: containerRect.height / 2 - elementRect.height / 2 + offset.y
		}
	}

	function doParallax(e) {
		const canvasRect = canvas.getBoundingClientRect()
		const cubeRect = cube.getBoundingClientRect()
		const skyboxRect = skybox.getBoundingClientRect()

		const mouse = getMouseFromCenter(e, canvasRect)
		const skyboxCenter = getCenter(skyboxRect, canvasRect, { x: 0, y: -canvasRect.height * 0.2 })
		const cubeCenter = getCenter(cubeRect, canvasRect, { x: cubeRect.width * 0.1, y: cubeRect.height * 0.1 })

		skybox.style.left = skyboxCenter.x - mouse.x / 10 + 'px'
		skybox.style.top = skyboxCenter.y - mouse.y / 10 + 'px'

		cube.style.left = cubeCenter.x + mouse.x / 10 + 'px'
		cube.style.top = cubeCenter.y + mouse.y / 10 + 'px'
	}

	onMount(() => {
		const canvasRect = canvas.getBoundingClientRect()
		doParallax({
			clientX: canvasRect.left + canvasRect.width / 2,
			clientY: canvasRect.top + canvasRect.height / 2
		})
	})
</script>

<figure bind:this={canvas} on:pointermove={doParallax}>
	<img bind:this={skybox} src="unity-skybox.png" class="skybox" alt="The default Unity skybox" />

	<img bind:this={cube} src="default-cube.png" class="cube" alt="The Blender default cube" />
</figure>

<style>
	figure {
		@apply w-full h-full relative rounded-xl overflow-hidden shadow-inner border border-gray-600;
	}

	.cube,
	.skybox {
		position: absolute;
		max-width: unset;
		height: auto;
	}

	.cube {
		width: 50%;
	}

	.skybox {
		min-width: 120%;
		min-height: 120%;
	}
</style>
