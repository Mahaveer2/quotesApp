<script>
  export let quotes;
	let height = "";
  import Quote from "./Quote/Quote.svelte";
	let _quotes = quotes;
	let g = 0;

	let time = _quotes.length;
</script>


<div style="height:100vh;width:100%;display:flex;position:relative;flex-direction:column;gap:10px;" class="card-container">
	<div class="card-float" bind:clientHeight={height} style={`--height:250px;width:100%;display:flex;--speed:${_quotes.length}s;`} >
		{#each _quotes as quote}
		<span class="quote-card-main">
			<a  style="text-decoration: none;width:100%" href={`/quote/${quote.id}`}>
				<Quote isFull={false} {quote} />
			</a>
		</span>
	{/each}
		{#each _quotes as quote}
		<span class="quote-card-main">
			<a style="text-decoration: none;width:100%;" href={`/quote/${quote.id}`}>
				<Quote isFull={false} {quote} />
			</a>
		</span>
	{/each}
	{#each _quotes as quote}
		<span class="quote-card-main">
			<a style="text-decoration: none;width:100%;" href={`/quote/${quote.id}`}>
				<Quote isFull={false} {quote} />
			</a>
		</span>
	{/each}
	</div>
</div>

