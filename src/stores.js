import localStore from './localStore.ts'
import answers from './wordl/answers'

const initialUiState = {
	currentDemo: 0,
	cheat: true,
	darkMode: true,
	colorblindMode: false,
	endGameOpen: false,
	keyboardLayout: 'us'
}

const initialGameState = {
	length: 5,
	turn: 0,
	guesses: ['', '', '', '', '', ''],
	error: '',
	word: answers[Math.floor(Math.random() * answers.length)],
	gameOver: false
}

const stats = localStore('stats', { wins: 0, losses: 0, streak: 0 })

const uiState = localStore('ui-state', initialUiState)
uiState.reset = () => uiState.set(initialUiState)

const gameState = localStore('game-state', initialGameState)
gameState.reset = () => gameState.set(initialGameState)

export { stats, gameState, uiState }
