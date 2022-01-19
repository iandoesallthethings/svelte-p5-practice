<script>
	import Modal from '../Modal.svelte'
	import Grid from './Grid.svelte'
	import Keyboard from './Keyboard.svelte'
	import Toggle from '../Toggle.svelte'
	import EmojiGrid from './EmojiGrid.svelte'
	import Stats from './Stats.svelte'

	import words from './words'
	import { stats, gameState, uiState } from '../stores'

	function reset() {
		gameState.reset()
		uiState.reset()
	}

	function type(e) {
		$gameState.error = ''
		$gameState.guesses[$gameState.turn] = ($gameState.guesses[$gameState.turn] + e.detail.key).slice(0, 5)
	}

	function backspace() {
		$gameState.error = ''
		$gameState.guesses[$gameState.turn] = $gameState.guesses[$gameState.turn].slice(0, -1)
	}

	function submit() {
		$gameState.error = ''
		if ($gameState.guesses[$gameState.turn].length < 5) return
		if (!words.hasOwnProperty($gameState.guesses[$gameState.turn])) return ($gameState.error = 'Not in dictionary.')
		$gameState.turn++
		if ($gameState.guesses[$gameState.turn - 1] === $gameState.word) return victory()
		if ($gameState.turn === 6) return defeat()
	}

	function victory() {
		$gameState.gameOver = true
		$uiState.endGameOpen = true
		$stats.wins++
		$stats.streak++
	}

	function defeat() {
		$gameState.gameOver = true
		$uiState.endGameOpen = true
		$stats.losses++
		$stats.streak = 0
	}

	function isInWord(letter, guess) {
		return guess.includes(letter) && $gameState.word.includes(letter)
	}

	function isCorrect(letter, position) {
		return $gameState.word[position] === letter
	}

	function isIncorrect(letter, guess) {
		return guess.includes(letter) && !$gameState.word.includes(letter)
	}

	const colors = {
		unguessed: () => `bg-gray-200 dark:bg-gray-600`,
		incorrect: () => `bg-gray-300 dark:bg-gray-700`,
		inWord: () => `bg-${$uiState.colorblindMode ? 'blue' : 'yellow'}-400 text-gray-800`,
		correct: () => `bg-${$uiState.colorblindMode ? 'red' : 'green'}-400 text-gray-800`
	}

	function colorLetter(letter, options = { guess: '', position: -1, unguessed: false }) {
		if (options.unguessed) return colors.unguessed()
		else if (isCorrect(letter, options.position, options.guess)) return colors.correct()
		else if (isInWord(letter, options.guess)) return colors.inWord()
		else return colors.incorrect()
	}

	function colorKey(letter, override = false) {
		let color = colors.unguessed()
		if (override) return colors.unguessed()

		for (let guess of $gameState.guesses) {
			if (isInWord(letter, guess)) color = isCorrect(letter, guess.indexOf(letter)) ? colors.correct() : colors.inWord()
			else if (isIncorrect(letter, guess)) color = colors.incorrect()
		}
		return color
	}
</script>

<Modal>
	<div slot="trigger" let:open>
		<button on:click={open} class="border-none">⚙️</button>
	</div>

	<div slot="content">
		<h2>Settings</h2>
		<Toggle store={uiState} property={'cheat'} label={'Debug/Cheat Mode'} />
		<Toggle store={uiState} property={'colorblindMode'} label={'Colorblind Mode'} />

		<Stats />
	</div>
</Modal>

<Modal show={$uiState.endGameOpen}>
	<div slot="content">
		<h1>
			{#if $gameState.guesses[$gameState.turn - 1] == $gameState.word}
				You win 🎉
			{:else}
				Yikes ❌
			{/if}
		</h1>

		<EmojiGrid />
		<button on:click={reset} class="p-2 rounded-md">Play Again</button>
	</div>
</Modal>

{#if $uiState.cheat}
	Answer: {$gameState.word}
	<button on:click={reset} class="p-1">reset</button>
{/if}

{$gameState.error}

{#if $gameState.gameOver}
	<span>
		<EmojiGrid showGrid={false} />
		<button on:click={reset} class="p-2 rounded-md">Play Again</button>
	</span>
{/if}

<Grid colorFunction={colorLetter} />

<Keyboard on:type={type} on:submit={submit} on:backspace={backspace} disabled={$gameState.gameOver} colorFunction={colorKey} />
