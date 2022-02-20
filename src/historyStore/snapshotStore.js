import { writable, get } from 'svelte/store'

function clone(object) {
	return JSON.parse(JSON.stringify(object))
}

export default function snapshotStore(initialValue, storeType = writable) {
	const store = storeType(initialValue)

	const history = [clone(get(store))]
	const historyStore = writable(history)
	let historyIndex = 0
	let historyIndexStore = writable(historyIndex)

	function setStoreToHistoryIndex() {
		store.set(clone(history[historyIndex]))
	}

	return {
		history: historyStore,
		index: historyIndexStore,

		subscribe: store.subscribe,
		set(newValue) {
			historyIndex++
			history[historyIndex] = newValue
			historyStore.set(history)
			historyIndexStore.set(historyIndex)
			history.splice(historyIndex + 1)
			setStoreToHistoryIndex()
		},
		undo() {
			if (historyIndex < 1) return

			historyIndex--
			historyIndexStore.set(historyIndex)
			setStoreToHistoryIndex()
		},
		redo() {
			if (historyIndex >= history.length - 1) return
			historyIndex++
			historyIndexStore.set(historyIndex)
			setStoreToHistoryIndex()
		}
	}
}
