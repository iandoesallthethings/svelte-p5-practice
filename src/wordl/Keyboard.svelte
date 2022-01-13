<script>
	import { createEventDispatcher } from 'svelte'
	import Key from './Key.svelte'

	export let disabled = false

	const layout = [
		['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
		['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
		['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
	]

	const dispatch = createEventDispatcher()

	function type(e) {
		if (disabled) return
		const key = e.detail.key
		switch (key) {
			case 'Enter':
				dispatch('submit')
				break
			case 'Backspace':
				dispatch('backspace')
				break
			default:
				dispatch('type', { key })
				break
		}
	}
</script>

<div class="flex flex-col">
	{#each layout as row}
		<div class="flex flex-row justify-center">
			{#each row as key}
				<Key {key} on:type={type} {disabled} />
			{/each}
		</div>
	{/each}
</div>
