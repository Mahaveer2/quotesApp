<script>
	import { onMount } from "svelte";
  import "./admin.scss";
  let search = "";
  let searching = false;
  let quotes = [];
  let loading = false;
	let sortBypending = false;
	let sortBytrending = false;
	let isSortedByTrending = false;
	let original_Quotes;

  async function postData(url = '', text) {
		const formData =new FormData();
		formData.append('search',text);
		// Default options are marked with *
    loading = true;
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
		let json = await response.json();
		quotes = json;
		original_Quotes = json;
		original_Quotes = original_Quotes;
		quotes = quotes.reverse();
		quotes = quotes;
    loading = false;
	}

	let sort = () => {
		sortBypending = !sortBypending;
		if(sortBypending){
			quotes= quotes.filter(quote => !quote.activated)
			quotes = quotes;
		}else{
			quotes = original_Quotes;
			quotes = quotes;
		}
	}

	let sortTrending = (sortBytrending) => {
		isSortedByTrending = !isSortedByTrending;
		 sortBytrending = !sortBytrending;
		if(sortBytrending){
			quotes= quotes.sort((a,b) => b.views - a.views);
			quotes = quotes.reverse();
			quotes = quotes;
		}
		if(!sortBytrending){
			quotes = original_Quotes;
			quotes = quotes;
		}
	}

	const searchDB = text => {
		setTimeout(() => {
			searching = true;
		},150)
		if(searching) {
			postData('/api/search',text);
			searching = false;
		}
	}
  postData('/api/search',"");

	onMount(() => {
		setInterval(() => {
    if(search == "" && !sortBypending && !isSortedByTrending){
			loading = false;
			postData('/api/search',""); 
			loading = false;
		}
  },6000)
	})
</script>

<input on:keyup={() => searchDB(search)} bind:value={search} type="text" placeholder="Search">
<div style="display:flex;gap:5px;overflow-x:scroll">
	<button class="chip" class:active={sortBypending} on:click={() => sort()} style="width:200px;height:30px;border-radius:20px;flex-direction:column;justify-content:center;align-items:center;">Sort by pending</button>
  <button class="chip" class:active={isSortedByTrending} on:click={() => sortTrending(sortBytrending)} style="width:200px;height:30px;border-radius:20px;flex-direction:column;justify-content:center;align-items:center;">Sort by trending</button>
</div>
<div class="grid-own" aria-busy={loading}>
  {#each quotes as quote}
<a href={`admin/quote/${quote.id}`} style="text-decoration:none;color:#fff !important;height:180px">
  <div class="quote">
		{#if !quote.activated}
			<span style="background:red;color:#fff;border-radius:20px;padding:2px;width:120px;display:flex;justify-content:center;align-items:center;">Pending</span>
		{/if}
    <span class="author">{quote.Author}</span>
    <p>{quote.quote}</p>
  </div>
</a>
{/each}
</div>

<style>
	.grid-own{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 4px;
	}

	@media screen and (max-width:768px){
		.grid-own{grid-template-columns: repeat(1,1fr);}
	}

	.chip{
		background:rgba(0,0,0,0.4);color:#fff;
		border:1px solid rgba(0,0,0,0.1);
		transition: .2s ease;
	}

	.chip.active{
		background:#fff;
		color:#000;
	}
</style>