import { writable, get } from 'svelte/store'

export default function snapshotStore(initialValue, storeType = writable) {
	const store = storeType(initialValue)

	const history = [get(store)]
	let historyIndex = 0

	function setStoreToHistoryIndex() {
		store.set(history[historyIndex])
	}

	return {
		subscribe: store.subscribe,

		set(newValue) {
			historyIndex++
			history[historyIndex] = newValue
			setStoreToHistoryIndex()
			history.splice(historyIndex + 1)
		},
		undo() {
			if (historyIndex < 1) return

			historyIndex--
			setStoreToHistoryIndex()
		},
		redo() {
			if (historyIndex >= history.length - 1) return
			historyIndex++
			setStoreToHistoryIndex()
		}
	}
}
