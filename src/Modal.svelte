<script>
	export let open = true
	export let closable = true

	function close() {
		if (closable) open = false
	}
</script>

{#if open}
	<div id="wrapper" on:mousewheel|preventDefault on:touchmove|preventDefault class="flex justify-center items-center">
		<div id="overlay" on:click={close} class="absolute top-0 left-0  w-screen h-screen bg-white bg-opacity-80 " />

		<div id="content" class=" flex flex-col min-w-prose bg-white rounded-lg shadow-lg border border-gray-100 p-10 z-50">
			<slot />
		</div>
	</div>
{/if}
