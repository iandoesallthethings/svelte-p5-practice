<script>
	import { afterUpdate } from 'svelte'

	export let word
	export let turn
	export let letter
	export let guessIndex
	export let letterIndex

	let background = 'bg-gray-200 dark:bg-gray-900'

	function calculateBackground() {
		if (turn <= guessIndex) background = 'bg-gray-200 dark:bg-gray-600'
		else if (letter === word[letterIndex]) background = 'bg-green-400 text-gray-800'
		else if (word.includes(letter)) background = 'bg-yellow-400 text-gray-800'
		else background = 'bg-gray-400 dark:bg-gray-700'
	}

	afterUpdate(calculateBackground)
</script>

<div class="mx-2 py-2 w-10 h-10 rounded-md shadow-md capitalize {letter === '?' ? 'text-gray-300' : ''} {background} transition">
	{letter}
</div>
