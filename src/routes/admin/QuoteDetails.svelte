<script>
  import "./admin.scss";
  let search = "";
  let searching = false;
  let quotes = [];
  let loading = false;
	let sortBypending = false;
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
</script>

<input on:keyup={() => searchDB(search)} bind:value={search} type="text" placeholder="Search">
<button on:click={() => sort()} style="width:120px;height:30px;border-radius:20px;flex-direction:column;justify-content:center;align-items:center;">Pending</button>
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
</style>