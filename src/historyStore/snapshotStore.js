import { writable, get } from 'svelte/store'

function clone(object) {
	return JSON.parse(JSON.stringify(object))
}

export default function snapshotStore(initialValue, storeType = writable) {
	const store = storeType(initialValue)

	const history = [clone(get(store))]
	const historyStore = writable(history)
	let historyIndex = 0

	function setStoreToHistoryIndex() {
		store.set(clone(history[historyIndex]))
	}

	return {
		history: historyStore,
		index: historyIndex,

		subscribe: store.subscribe,
		set(newValue) {
			historyIndex++
			history[historyIndex] = newValue
			historyStore.set(history)
			history.splice(historyIndex + 1)
			setStoreToHistoryIndex()
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
