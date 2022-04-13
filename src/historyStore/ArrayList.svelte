<script>
	export let arr
	export let label = ''
	export let current
</script>

<h4>{label}</h4>

<ul class="w-min flex items-center justify-items-center flex-col">
	{#each arr as element, i}
		<li class:list-disc={current === i}>
			{JSON.stringify(element)}
		</li>
	{/each}
</ul>
