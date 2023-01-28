<script>
	import Quote from '../../components/Quote/Quote.svelte';
	import Transition from '../../components/Transition.svelte';
	export let data;
	let quotes = data.data;

  let search = (search) => {
    if(search.length == 0){
      quotes = data.data;
    }
    quotes = data.data.filter( quote => {
      const regex = new RegExp(`^${search}`,'gi');
      return quote.quote.match(regex) || quote.Author.match(regex);
    })
  };
</script>

<h1>Search Quotes</h1>
<form on:submit|preventDefault={() => {}}>
	<input on:keyup={(e) => search(e.target.value)} type="text" placeholder="Search quotes by author or quote" />
</form>

{#each quotes as quote, i}
		<Transition>
			<div
				style="width:100%;display:flex;
        margin-top:10px;
				justify-content:center;align-items:center;"
			>
				<a class="card" href={`/quote/${quote.slug.current}`}>
					<article>
            {quote.Author}
            <p>
              {quote.quote}
            </p>
          </article>
				</a>
			</div>
		</Transition>
{/each}

<style>
  .card{
    text-decoration: none;
    width: 100%;
    color: #fff;
  }
</style>