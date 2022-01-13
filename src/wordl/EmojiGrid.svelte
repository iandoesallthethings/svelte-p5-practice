<script>
	export let guesses
	export let word
	export let showGrid = true

	function emojiGrid() {
		return guesses
			.map((guess) =>
				guess
					.split('')
					.map((letter, letterIndex) => {
						if (letter === word[letterIndex]) return '🟩'
						else if (word.includes(letter)) return '🟨'
						else return '⬛️'
					})
					.join('')
			)
			.join('\n')
			.trim()
	}

	function copyToClipboard(text) {
		navigator.clipboard.writeText(text)
		error = 'Copied to clipboard.'
	}
</script>

{#if showGrid}
	<div class="whitespace-pre-line my-2">{emojiGrid()}</div>
{/if}
<button on:click={() => copyToClipboard(emojiGrid())} class="p-2 rounded-md">Share</button>
