import { writable } from 'svelte/store'

// Example action function:
// function sumAction(newValue) {
// 	return {
// 		apply: (oldValue) => oldValue + newValue,
// 		reverse: (oldValue) => oldValue - newValue
// 	}
// }

export default function actionStore(initialValue, action, storeType = writable) {
	const store = storeType(initialValue)

	const history = []
	let historyIndex = 0

	return {
		subscribe: store.subscribe,
		do(value) {
			historyIndex++
			history[historyIndex] = action(value)

			history.splice(historyIndex + 1)

			store.update((value) => history[historyIndex].apply(value))
		},

		undo() {
			if (historyIndex < 1) return

			store.update((value) => history[historyIndex].reverse(value))
			historyIndex--
		},

		redo() {
			if (historyIndex >= history.length - 1) return

			historyIndex++
			store.update((value) => history[historyIndex].apply(value))
		}
	}
}
