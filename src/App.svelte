<script>
	import EyeOfSauron from './EyeOfSauron.svelte'
	import Paint from './Paint.svelte'
	import Wordl from './wordl/Wordl.svelte'
	import Toggle from './Toggle.svelte'
	import Unity from './Unity.svelte'
	import HistoryStore from './historyStore/HistoryStore.svelte'
	import { uiState } from './stores'

	export let name

	let demos = [Wordl, Paint, EyeOfSauron, HistoryStore, Unity]
	// let currentDemo = demos[0]

	function indexOfDemo(demo) {
		const demoNames = demos.map((d) => d.name)
		return demoNames.indexOf(demo.name)
	}
</script>

<div id="theme" class={$uiState.darkMode ? 'dark' : ''}>
	<main class="relative flex flex-col items-center dark:bg-gray-800 dark:text-gray-200 h-screen w-screen">
		<h1>Bello {name}!</h1>
		<div class="absolute right-0 top-0">
			<Toggle store={uiState} property={'darkMode'} label={'Dark Mode'} />
		</div>

		<nav class="flex flex-col my-2">
			<span class="flex flex-row items-center justify-between overflow-x-scroll">
				<h3>Demos:</h3>
				{#each demos as demo}
					<label class="cursor-pointer mx-2 whitespace-nowrap flex items-center">
						<input type="radio" bind:group={$uiState.currentDemo} value={indexOfDemo(demo)} class="hidden" />
						<span class="p-1 peer-checked:border rounded-md"> {demo.name.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')} </span>
					</label>
				{/each}
			</span>
		</nav>

		<svelte:component this={demos[$uiState.currentDemo]} />
	</main>
</div>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3.5em;
		font-weight: 100;
	}
	h2 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}
	h3 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}
	h4 {
		color: #ff3e00;
		font-size: 1.5em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
