<script lang="ts">
	export let store
	export let property
	export let label
</script>

<div
	on:click={() => ($store[property] = !$store[property])}
	class="flex items-center justify-between w-full block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-600  cursor-pointer space-x-4"
>
	<button
		class="{$store[property]
			? 'bg-denim-400'
			: 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ring-none "
	>
		<span
			class="{$store[property]
				? 'translate-x-5'
				: 'translate-x-0'} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
		>
			<i class="fas fa-{$store[property] ? 'moon' : 'sun'}" />
		</span>
	</button>

	<div>{label}</div>
</div>
