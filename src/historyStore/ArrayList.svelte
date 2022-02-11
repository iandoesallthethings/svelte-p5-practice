<script>
	export let arr
</script>

{#each arr as element}
	<ul>{JSON.stringify(element)}</ul>
{/each}
