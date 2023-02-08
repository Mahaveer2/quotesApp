<script>
  export let quotes;
	let height = "";
  import Quote from "./Quote/Quote.svelte";
	let _quotes = quotes;
	let g = 0;

	let time = _quotes.length;

	function addElement() {
		_quotes = [..._quotes,...quotes];
    setTimeout(addElement, (quotes.length * 4000));
  }

  setTimeout(() => {
		addElement();
	},(_quotes.length * 4000))
</script>


<div style="height:100vh;width:100%;display:flex;position:relative" class="card-container">
	<div class="card-float" bind:clientHeight={height} style={`--height:${height}px;width:100%;display:flex;--speed:${_quotes.length}s`} >
		{#each _quotes as quote}
			<div
				style="width:100%;display:flex;
						justify-content:center;align-items:center;"
			>
				<a style="text-decoration: none;width:100%" href={`/quote/${quote.slug?.current}`}>
					<Quote isFull={false} {quote} />
				</a>
			</div>
		{/each}
	</div>
</div>

