<script>
	import { afterUpdate, createEventDispatcher } from 'svelte'
	import { shortcut } from './shortcut'

	export let key // aka letter?
	export let disabled
	export let color = 'bg-gray-200 dark:bg-gray-600'

	const dispatch = createEventDispatcher()

	function type() {
		if (disabled) return
		dispatch('type', { key })
	}
</script>

<button on:click={type} use:shortcut={{ key: key }} class="{color} {disabled ? 'text-gray-200 bg-gray-100' : ''} p-2 m-1 border-none rounded-md shadow-sm capitalize">
	{#if key == 'Backspace'}
		{'<'}
	{:else if key == 'Enter'}
		{'>'}
	{:else}
		{key}
	{/if}
</button>
