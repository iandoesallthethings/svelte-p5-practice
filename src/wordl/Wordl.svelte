<script>
	import Modal from '../Modal.svelte'
	import Grid from './Grid.svelte'
	import Keyboard from './Keyboard.svelte'

	import answers from './answers'
	import words from './words'
	import cheat from './cheat'

	const length = 5

	let turn = 0
	let guesses = ['', '', '', '', '', '']
	let error = ''
	let word = answers[Math.floor(Math.random() * answers.length)]

	function reset() {
		gameOver = false
		endGameOpen = false
		turn = 0
		guesses = ['', '', '', '', '', '']
		error = ''
		word = answers[Math.floor(Math.random() * answers.length)]
	}

	function type(e) {
		error = ''
		guesses[turn] = (guesses[turn] + e.detail.key).slice(0, 5)
	}

	function backspace() {
		error = ''
		guesses[turn] = guesses[turn].slice(0, -1)
	}

	function submit() {
		error = ''
		if (!guesses[turn].length === 5) return
		if (!words.hasOwnProperty(guesses[turn])) return (error = 'Not in dictionary.')
		turn++
		if (turn === 6 || guesses[turn - 1] === word) {
			gameOver = true
			endGameOpen = true
		}
	}

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
	}

	function copyEmojiGrid() {
		navigator.clipboard.writeText(emojiGrid())
		error = 'Copied to clipboard.'
	}

	let settingsOpen = false
	let endGameOpen = false

	let gameOver = false
</script>

<Modal open={settingsOpen}>
	<span>
		Cheat?
		<input type="checkbox" bind:checked={$cheat} />
	</span>

	<button on:click={copyEmojiGrid} class="p-2 rounded-md">Share</button>
</Modal>

<Modal open={endGameOpen}>
	<h1>
		{#if guesses[turn - 1] == word}
			You win 🎉
		{:else}
			Yikes ❌
		{/if}
	</h1>

	<div>{emojiGrid()}</div>

	<div>
		<button on:click={copyEmojiGrid} class="p-2 rounded-md">Share</button>
		<button on:click={reset} class="p-2 rounded-md">Play Again</button>
	</div>
</Modal>

<button on:click={() => (settingsOpen = true)} class="border-none">⚙️</button>

{#if $cheat}
	Answer: {word}
{/if}

<Grid {length} {word} {turn} {guesses} />

{error}

{#if gameOver}
	<button on:click={reset} class="p-2 rounded-md">Play Again</button>
{/if}
<Keyboard on:type={type} on:submit={submit} on:backspace={backspace} disabled={gameOver} />
