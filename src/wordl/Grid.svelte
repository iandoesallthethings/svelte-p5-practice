<script>
	import Letter from './Letter.svelte'
	import { gameState } from '../stores'

	export let colorFunction

	const cols = [...Array($gameState.length).keys()]
</script>

<div class="m-5">
	{#each $gameState.guesses as guess, guessIndex}
		<div class="m-5 flex flex-row">
			{#each cols as col}
				<Letter letter={guess[col] || ''} color={colorFunction(guess[col], { guess, position: col, unguessed: $gameState.turn <= guessIndex })} />
			{/each}
		</div>
	{/each}
</div>
