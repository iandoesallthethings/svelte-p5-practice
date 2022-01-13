<script>
	import { afterUpdate } from 'svelte'

	export let word
	export let turn
	export let letter
	export let guessIndex
	export let letterIndex

	let background = 'bg-gray-200'

	function calculateBackground() {
		if (turn <= guessIndex) background = 'bg-gray-200'
		else if (letter === word[letterIndex]) background = 'bg-green-400'
		else if (word.includes(letter)) background = 'bg-yellow-400'
	}

	afterUpdate(calculateBackground)
</script>

<div class="mx-2 py-2 w-12 rounded-md shadow-md capitalize {letter === '?' ? 'text-gray-300' : ''} {background}">
	{letter}
</div>
