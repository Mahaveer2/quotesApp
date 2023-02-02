<script>
	import Quote from '../../components/Quote/Quote.svelte';
	import Transition from '../../components/Transition.svelte';
	export let data;
	let quotes = data.data;
	let categories = data.categories;
	console.log(categories);

	let search = (search) => {
		if (search.length == 0) {
			quotes = data.data;
		}
		quotes = data.data.filter((quote) => {
			const regex = new RegExp(`^${search}`, 'gi');
			return quote.quote.match(regex) || quote.Author.match(regex);
		});
	};
</script>

<h1>Search Quotes</h1>
<form on:submit|preventDefault={() => {}}>
	<input
		on:keyup={(e) => search(e.target.value)}
		type="text"
		placeholder="Search quotes by author or quote"
	/>
</form>

<div>
  Categories
  <div class="flexer"> 
    {#each categories as category}
	<a style="color:#fff" href={`category/${category.slug.current}`}>
		<div class="category">{category.title}</div>
	</a>
{/each}
  </div>
</div>

{#each quotes as quote, i}
	<Transition>
		<div
			style={`width:100%;display:flex;--delay:${i * 1000}ms;
				justify-content:center;align-items:center;`}
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
	.card {
		text-decoration: none;
		width: 100%;
		color: #fff;
	}

	article,
	input {
		background-color: rgba(0, 0, 0, 0.5);
	}

	.flexer {
		display: flex;
    gap: 20px;
		margin-top: 20px;
		width: 100%;
	}
	.category {
		font-size: 18px;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 6px 20px;
		border-radius: 20px;
		cursor: pointer;
	}
</style>

