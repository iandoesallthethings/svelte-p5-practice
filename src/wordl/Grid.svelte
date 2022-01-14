<script>
	import Letter from './Letter.svelte'

	export let length
	export let word
	export let turn
	export let guesses

	const cols = [...Array(length).keys()]
</script>

<div class="m-5">
	{#each guesses as guess, guessIndex}
		<div class="m-5 flex flex-row">
			{#each cols as col}
				<Letter {word} {turn} {guessIndex} letter={guess[col] || ' '} letterIndex={col} />
			{/each}
		</div>
	{/each}
</div>
