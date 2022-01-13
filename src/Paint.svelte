<script>
	import P5 from 'p5-svelte'

	let canvasSize = 500
	let image

	let autoplay = true
	let autoX = 0
	let autoY = 0
	let xStep = 10
	let yStep = 10

	let circleSize = 20
	let jitter = 0

	function wrap(num, min, max) {
		return num >= min ? num % max : ((num % max) + max) % max
	}

	function jitterValue(value) {
		return value + Math.random() * jitter - jitter / 2
	}

	function incrementAutoplay() {
		if (!autoplay) return
		autoX = wrap(autoX + xStep, 0, canvasSize)
		if (autoX == 0) autoY = wrap(autoY + yStep, 0, canvasSize)
	}

	const sketch = (p5) => {
		p5.preload = () => {
			image = p5.loadImage('./poke.png')
		}

		p5.setup = () => p5.createCanvas(canvasSize, canvasSize)

		p5.draw = () => {
			incrementAutoplay()

			const x = autoplay ? autoX : p5.mouseX
			const y = autoplay ? autoY : p5.mouseY

			// map canvas coordinates to image coordinates
			const mappedX = p5.map(x, 0, canvasSize, 0, image.width)
			const mappedY = p5.map(y, 0, canvasSize, 0, image.height)

			p5.noStroke()
			p5.fill(image.get(mappedX, mappedY)) // muh
			p5.circle(x, y, jitterValue(circleSize))
		}
	}
</script>

<div id="controls" class="max-w-prose my-5">
	<label>
		Circle Size
		<input type="range" bind:value={circleSize} min="0" max="50" step="0.1" />
		<input type="number" bind:value={circleSize} min="0" max="50" step="1" />
	</label>

	<label>
		Jitter
		<input type="range" bind:value={jitter} min="0" max="20" step="0.1" />
		<input type="number" bind:value={jitter} min="0" max="20" step="1" />
	</label>

	<label>
		<input type="checkbox" bind:checked={autoplay} />
		Autoplay
	</label>

	{#if autoplay}
		<label>
			X Step
			<input type="range" bind:value={xStep} min="1" max="50" step="0.1" />
			<input type="number" bind:value={xStep} min="1" max="50" step="1" />
		</label>
		<label>
			Y Step
			<input type="range" bind:value={yStep} min="1" max="50" step="0.1" />
			<input type="number" bind:value={yStep} min="1" max="50" step="1" />
		</label>
	{/if}
</div>
<div class="border border-black rounded-2xl shadow-xl w-min max-w-max overflow-hidden">
	<P5 {sketch} />
</div>

<style>
	label {
		@apply flex justify-between whitespace-nowrap;
	}

	input {
		@apply mx-2 bg-transparent pl-2;
	}
</style>
