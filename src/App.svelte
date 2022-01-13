<script>
	import EyeOfSauron from './EyeOfSauron.svelte'
	import Paint from './Paint.svelte'
	import Wordl from './wordl/Wordl.svelte'

	export let name

	let demos = [Wordl, Paint, EyeOfSauron]
	let currentDemo = demos[0]
</script>

<main class="flex flex-col items-center">
	<h1>Bello {name}!</h1>

	<nav class="flex flex-col my-10">
		<h2>Demos:</h2>
		<span class="flex flex-row justify-between">
			{#each demos as demo}
				<label class="cursor-pointer mx-4">
					<input type="radio" bind:group={currentDemo} value={demo} class="hidden" />
					<span class="p-1 peer-checked:border rounded-md"> {demo.name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')} </span>
				</label>
			{/each}
		</span>
	</nav>

	<svelte:component this={currentDemo} />
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	h2 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
