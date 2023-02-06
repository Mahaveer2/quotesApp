<script>
  let height = "";
  export let quotes;
  import Quote from "./Quote/Quote.svelte";
</script>

<div style="height:100vh" class="card-container">
	<div class="card-float" bind:clientHeight={height} style={`--height:${height}px`} >
		{#each quotes as quote}
			<div
				style="width:100%;display:flex;
						justify-content:center;align-items:center;"
			>
				<a style="text-decoration: none;width:80%" href={`/quote/${quote.slug.current}`}>
					<Quote isFull={false} {quote} />
				</a>
			</div>
		{/each}
	</div>
</div>