<script>
	import Quote from '../../components/Quote/Quote.svelte';
	import Transition from '../../components/Transition.svelte';
	export let data;
	let quotes = data.data;
	let categories = data.categories;

	async function postData(url = '', text) {
		const formData =new FormData();
		formData.append('search',text);
		// Default options are marked with *
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
		let json = await response.json();
		quotes = json;
		quotes = quotes;
	}

	const search = text => {
		setTimeout(() => {
			postData('/api/search',text);
		},150)
	}
</script>

<h1>Search Quotes</h1>
<form on:submit|preventDefault={() => {}}>
	<input
		name="search"
		on:keyup={(e) => search(e.target.value)}
		type="text"
		placeholder="Search quotes by author or quote"
	/>
</form>

<div>
	Categories
	<div class="flexer">
		{#each categories as category}
			<a style="color:#fff;" href={`category/${category.slug.current}`}>
				<div class="category">{category.title}</div>
			</a>
		{/each}
	</div>
</div>
<br>
{#each quotes as quote, i}
	<Transition>
		<div
			style={`width:100%;display:flex;--delay:${i * 1000}ms;
				justify-content:center;align-items:center;`}
		>
			<a class="card" href={`/quote/${quote.slug.current}`}>
					{quote.Author}
					<p>
						{quote.quote}
					</p>
			</a>
		</div>
	</Transition>
{/each}

<style>
	.card {
		text-decoration: none;
		width: 100%;
		color: #fff;
		margin-bottom: 1px;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 8px;
		padding: 30px;
		display: flex;
		margin-bottom: 10px;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
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
		overflow-x: scroll;
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	.flexer::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	.category {
		font-size: 18px;
		background-color: rgba(0, 0, 0, 0.3);
		box-shadow: 2px 2px 2px rgba(44, 44, 44, 0.3);
		padding: 6px 20px;
		border-radius: 20px;
		display: flex; widows: 100%;
		cursor: pointer;
	}
</style>
