<script>
	import { createEventDispatcher } from 'svelte'
	import { shortcut } from './shortcut'

	export let key
	export let disabled

	const dispatch = createEventDispatcher()

	function type() {
		if (disabled) return
		dispatch('type', { key })
	}
</script>

<button on:click={type} use:shortcut={{ key: key }} class="p-2 m-1 rounded-md shadow-sm capitalize {disabled ? 'text-gray-200 bg-gray-100' : ''}">
	{#if key == 'Backspace'}
		{'<'}
	{:else if key == 'Enter'}
		{'>'}
	{:else}
		{key}
	{/if}
</button>
