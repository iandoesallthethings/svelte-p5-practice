<script>
	export let show = false
	export let closable = true

	export function open() {
		show = true
	}
	export function close() {
		if (closable) show = false
	}
</script>

<slot name="trigger" {open} />

{#if show}
	<div id="wrapper" on:mousewheel|preventDefault on:touchmove|preventDefault class="flex justify-center items-center">
		<div id="overlay" on:click={close} class="absolute top-0 left-0  w-screen h-screen bg-white bg-opacity-80 " />

		<div class="flex flex-col min-w-prose bg-white rounded-lg shadow-lg border border-gray-100 p-10 z-50">
			<slot name="content" {close} />
		</div>
	</div>
{/if}

{#if false}<slot />{/if}
