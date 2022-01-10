<script>
	import P5 from 'p5-svelte'

	let width = 55
	let height = 55
	let hue = 150
	let canvasSize = 400

	let autoPlay = false

	function wrap(num, min, max) {
		return num >= min ? num % max : ((num % max) + max) % max
	}

	function stepValue(value, stepAmount = 10, wrapValue = canvasSize) {
		const step = Math.random() * stepAmount - stepAmount / 2
		return Math.floor(wrap(value + step, 0, wrapValue))
	}

	function stepHue() {
		hue = stepValue(hue, 10, 255)
	}

	function clamp(num, min, max) {
		return Math.min(Math.max(num, min), max)
	}

	function setParams(event) {
		const bounds = event.target.getBoundingClientRect()
		width = clamp(event.clientX - bounds.left, 0, canvasSize)
		height = clamp(event.clientY - bounds.top, 0, canvasSize)
		stepHue()
	}

	function stepEverything() {
		stepHue()
		width = stepValue(width, 6, canvasSize)
		height = stepValue(height, 6, canvasSize)
	}

	const sketch = (p5) => {
		p5.preload = () => {}
		p5.setup = () => p5.createCanvas(canvasSize, canvasSize)

		p5.draw = () => {
			if (autoPlay) stepEverything()

			p5.noStroke()
			p5.fill(p5.color(`hsl(${hue}, 100%, 50%)`))
			p5.ellipse(p5.width / 2, p5.height / 2, width, height)
		}
	}
</script>

<div class="max-w-prose">
	<label>
		Width
		<input type="range" bind:value={width} on:input={stepHue} min="10" max="canvasSize" step="0.01" />
		{width}
	</label>
	<label>
		Height
		<input type="range" bind:value={height} on:input={stepHue} min="10" max="canvasSize" step="0.01" />
		{height}
	</label>
	<label>
		Hue
		<input type="range" bind:value={hue} min="0" max="255" step="1" />
		{hue}
	</label>

	<label>
		<input type="checkbox" bind:checked={autoPlay} />
		Autoplay
	</label>
</div>

<div on:mousemove={setParams} class="border border-black rounded-2xl shadow-xl w-min max-w-max overflow-hidden">
	<P5 {sketch} />
</div>

<style>
	label {
		@apply flex items-center;
	}

	input {
		@apply mx-2;
	}
</style>
