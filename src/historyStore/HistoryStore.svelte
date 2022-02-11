<script>
	// Made with help from lihautan
	// https://www.youtube.com/watch?v=d2xsgavIDiQ

	import { tweened } from 'svelte/motion'
	import actionStore from './actionStore'
	import snapshotStore from './snapshotStore'
	import shortcut from '../shortcut'
	import { round } from '../helpers'
	import ArrayList from './ArrayList.svelte'

	let value

	function sumAction(newValue) {
		return {
			apply: (oldValue) => oldValue + newValue,
			reverse: (oldValue) => oldValue - newValue
		}
	}

	const actionHistoryStore = actionStore(0, sumAction) // Or pass tweened as third argument
	const actionHistory = actionHistoryStore.history

	const snapshotHistoryStore = snapshotStore(0)
	const numberHistory = snapshotHistoryStore.history

	const objectSnapshotHistoryStore = snapshotStore({ value: 0 })
	const objectHistory = objectSnapshotHistoryStore.history

	function add() {
		if (!value) return

		actionHistoryStore.do(value)
		$snapshotHistoryStore += value
		$objectSnapshotHistoryStore.value += value

		value = null
	}

	function undo() {
		actionHistoryStore.undo()
		snapshotHistoryStore.undo()
		objectSnapshotHistoryStore.undo()
	}

	function redo() {
		actionHistoryStore.redo()
		snapshotHistoryStore.redo()
		objectSnapshotHistoryStore.redo()
	}
</script>

<span>
	<input bind:value type="number" />

	<button on:click={add} use:shortcut={{ code: 'Enter' }}>Add</button>
	<button on:click={undo} use:shortcut={{ control: true, code: 'KeyZ' }}>undo</button>
	<button on:click={redo} use:shortcut={{ control: true, shift: true, code: 'KeyZ' }}>redo</button>
</span>

<div class="flex flex-row space-x-10 my-10 border border-gray-300 rounded-sm p-2">
	<div>
		Tracking Actions:
		<h1>{round($actionHistoryStore, 2)}</h1>
		<ArrayList arr={$actionHistory} />
	</div>
	<div>
		Tracking Snapshots:
		<h1>{round($snapshotHistoryStore, 2)}</h1>
		<ArrayList arr={$numberHistory} />
	</div>
	<div>
		Snapshots with JSON Objects:
		<h1>{round($objectSnapshotHistoryStore.value, 2)}</h1>
		<ArrayList arr={$objectHistory} />
	</div>
</div>
