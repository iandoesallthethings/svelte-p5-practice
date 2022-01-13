<script>
	import Modal from '../Modal.svelte'
	import Grid from './Grid.svelte'
	import Keyboard from './Keyboard.svelte'
	import Toggle from '../Toggle.svelte'
	import EmojiGrid from './EmojiGrid.svelte'
	import Stats from './Stats.svelte'

	import answers from './answers'
	import words from './words'
	import { cheat, stats } from '../stores'

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
		if (guesses[turn].length < 5) return
		if (!words.hasOwnProperty(guesses[turn])) return (error = 'Not in dictionary.')
		turn++
		if (guesses[turn - 1] === word) return victory()
		if (turn === 6) return defeat()
	}

	function victory() {
		gameOver = true
		endGameOpen = true
		$stats.wins++
		$stats.streak++
	}

	function defeat() {
		gameOver = true
		endGameOpen = true
		$stats.losses++
		$stats.streak = 0
	}

	let endGameOpen = false
	let gameOver = false
</script>

<Modal show={endGameOpen}>
	<div slot="content">
		<h1>
			{#if guesses[turn - 1] == word}
				You win 🎉
			{:else}
				Yikes ❌
			{/if}
		</h1>

		<EmojiGrid {guesses} {word} />
		<button on:click={reset} class="p-2 rounded-md">Play Again</button>
	</div>
</Modal>

<Modal>
	<div slot="trigger" let:open>
		<button on:click={open} class="border-none">⚙️</button>
	</div>

	<div slot="content">
		<h2>Settings</h2>
		<Toggle store={cheat} label={'Debug/Cheat Mode'} />

		<Stats />
	</div>
</Modal>

{#if $cheat}
	Answer: {word}
{/if}

{error}

{#if gameOver}
	<span>
		<EmojiGrid {guesses} {word} showGrid={false} />
		<button on:click={reset} class="p-2 rounded-md">Play Again</button>
	</span>
{/if}

<Grid {length} {word} {turn} {guesses} />

<Keyboard on:type={type} on:submit={submit} on:backspace={backspace} disabled={gameOver} />
