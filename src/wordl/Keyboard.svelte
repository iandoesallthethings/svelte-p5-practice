<script>
	import { createEventDispatcher } from 'svelte'
	import { uiState } from '../stores'

	import Key from './Key.svelte'

	export let colorFunction
	export let disabled = false

	export const keyboardLayouts = {
		us: [
			['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
			['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
			['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
		],
		dvorak: [
			['p', 'y', 'f', 'g', 'c', 'r', 'l'],
			['a', 'o', 'e', 'u', 'i', 'd', 'h', 't', 'n', 's'],
			['Backspace', 'q', 'j', 'k', 'x', 'b', 'm', 'w', 'v', 'z', 'Enter']
		],
		azerty: [
			['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
			['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
			['Backspace', 'w', 'x', 'c', 'v', 'b', 'n', 'Enter']
		],
		norsk: [
			['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'å'],
			['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ø', 'æ'],
			['Backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
		]
	}

	$: layout = keyboardLayouts[$uiState.keyboardLayout] || keyboardLayouts.us

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
				<Key {key} on:type={type} {disabled} color={colorFunction(key)} />
			{/each}
		</div>
	{/each}
</div>

<select bind:value={$uiState.keyboardLayout} class="bg-gray-600 my-2">
	{#each Object.entries(keyboardLayouts) as [layout, _]}
		<option value={layout}> {layout} </option>
	{/each}
</select>
