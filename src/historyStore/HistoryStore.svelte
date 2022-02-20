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
	const actionIndex = actionHistoryStore.index

	const snapshotHistoryStore = snapshotStore(0)
	const numberHistory = snapshotHistoryStore.history
	const numberIndex = snapshotHistoryStore.index

	const objectSnapshotHistoryStore = snapshotStore({ value: 0 })
	const objectHistory = objectSnapshotHistoryStore.history
	const objectIndex = objectSnapshotHistoryStore.index

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

<div class="flex flex-row space-x-10 my-10 border border-gray-300 rounded-sm p-2 justify-center divide-x">
	<div class="column">
		<h4>Tracking Actions:</h4>
		<h1>{round($actionHistoryStore, 2)}</h1>
		<ArrayList label="history" arr={$actionHistory} />
	</div>

	<div class="column">
		<h4>Tracking Snapshots:</h4>
		<h1>{round($snapshotHistoryStore, 2)}</h1>
		<ArrayList label="history" arr={$numberHistory} current={$numberIndex} />
	</div>

	<div class="column">
		<h4>Tracking Snapshots with JSON Objects:</h4>
		<h1>{round($objectSnapshotHistoryStore.value, 2)}</h1>
		<ArrayList label="history" arr={$objectHistory} current={$objectIndex} />
	</div>
</div>

<style>
	.column {
		@apply flex flex-col justify-items-center text-center;
	}
</style>
