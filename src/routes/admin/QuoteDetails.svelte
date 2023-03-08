<script>
	import { onMount } from 'svelte';
	import './admin.scss';
	let search = '';
	let searching = false;
	let quotes = [];
	let loading = false;
	export let categories;
	let sortBypending = false;
	let isBusy = false;
	let sortBytrending = false;
	let isSortedByTrending = false;
	let original_Quotes;

	async function postData(url = '', text) {
		const formData = new FormData();
		formData.append('token', localStorage.getItem('token'));
		formData.append('search', text);
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
		if (sortBypending) {
			quotes = quotes.filter((quote) => !quote.activated);
			quotes = quotes;
		} else {
			quotes = original_Quotes;
			quotes = quotes;
		}
	};

	let sortTrending = (sortBytrending) => {
		isSortedByTrending = !isSortedByTrending;
		sortBytrending = !sortBytrending;
		if (sortBytrending) {
			quotes = quotes.sort((a, b) => b.views - a.views);
			quotes = quotes.reverse();
			quotes = quotes;
		}
		if (!sortBytrending) {
			quotes = original_Quotes;
			quotes = quotes;
		}
	};

	const searchDB = (text) => {
		setTimeout(() => {
			searching = true;
		}, 150);
		if (searching) {
			postData('/api/search', text);
			searching = false;
		}
	};
	postData('/api/search', '');
	original_Quotes = quotes;
	const handleCategory = (e) => {
		if(e.value == "All"){
			isBusy = false;
			quotes = original_Quotes;
			return false;
		}
		isBusy = true;
		let _quotes = original_Quotes.filter(c => c?.category[0]?.id == Number(e.value));
		quotes = _quotes;
		quotes = quotes;
	};

	onMount(() => {
		setInterval(() => {
			if (search == '' && !sortBypending && !isSortedByTrending && !isBusy) {
				loading = false;
				postData('/api/search', '');
				loading = false;
			}
		}, 6000);
	});

	const trimText = (str) => {
		if (str.length > 120) {
			return {
				long:true,
				text:str.slice(0, 120),
			}
		} else {
			return {
				long:false,
				text:str,
			};
		}
	};
</script>

<input style="margin-top:20px" on:keyup={() => searchDB(search)} bind:value={search} type="text" placeholder="Search" />
<span>Sort by Category</span>
<select on:change={(e) => handleCategory(e.target)}>
	<option value="All" selected>All</option>
	{#each categories as category}
			<option value={category.id} placeholder="Select a category">{category.title}</option>
	{/each}
</select>
<div style="display:flex;gap:5px;overflow-x:scroll">
	<button
		class="chip"
		class:active={sortBypending}
		on:click={() => sort()}
		style="width:200px;height:30px;border-radius:20px;flex-direction:column;justify-content:center;align-items:center;"
		>Sort by pending</button
	>
	<button
		class="chip"
		class:active={isSortedByTrending}
		on:click={() => sortTrending(sortBytrending)}
		style="width:200px;height:20px;border-radius:20px;flex-direction:column;justify-content:center;align-items:center;"
		>Sort by trending</button
	>
</div>
<table aria-busy={loading}>
	<thead>
		<tr>
			<th style="width:10%" scope="col">Id</th>
			<th style="width:80%" scope="col">Quote</th>
			<th style="width:80%" scope="col">Views</th>
			<th style="width:10%" scope="col">Pending</th>
		</tr>
	</thead>
	<tbody>
		{#each quotes as quote}
		<tr style="width:100%">
			<th >
				<a href={`admin/quote/${quote.id}`} style="text-decoration:none;color:#fff !important;width:100% !important">{quote.id}</a>
				</th>
			
			<td>
				<a href={`admin/quote/${quote.id}`} style="text-decoration:none;color:var(--primary) !important;width:100% !important">{quote.id}
				{quote.quote}</a>
			</td>
			<td>{quote.views}</td>
			<td>
				{#if !quote.activated}
				<span
					style="background:red;color:#fff;border-radius:20px;font-size:16px;padding:1px;width:120px;display:flex;justify-content:center;align-items:center;"
					>Pending</span
				>
				{:else}
				<span
					style="background:green;color:#fff;border-radius:20px;font-size:16px;padding:1px;width:120px;display:flex;justify-content:center;align-items:center;"
					>Active</span
				>
			{/if}
		
			</td>
		</tr>
		{/each}
	</tbody>
</table>
<!-- <div class="grid-own" aria-busy={loading}>
	{#each quotes as quote}
		<a href={`admin/quote/${quote.id}`} style="text-decoration:none;color:#fff !important;position:relative;height:210px">
			<div class="quote" style="height:210px">
				{#if !quote.activated}
					<span
						style="background:red;color:#fff;border-radius:20px;font-size:16px;padding:1px;width:120px;display:flex;justify-content:center;align-items:center;position:absolute;top:8%;right:8%"
						>Pending</span
					>
				{/if}
				<span class="author">{quote.Author}</span>
				<p>{#if trimText(quote.quote).long}
					{trimText(quote.quote).text} 
					<a>...Read More</a>
					{:else}
					{trimText(quote.quote).text}
				{/if}</p>
			</div>
		</a>
	{/each}
</div> -->

<style>
	.grid-own {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}

	@media screen and (max-width: 768px) {
		.grid-own {
			grid-template-columns: repeat(1, 1fr);
		}
	}

	.chip {
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.1);
		transition: 0.2s ease;
	}

	.chip.active {
		background: #fff;
		color: #000;
	}

table,td,tbody,tr,th{
	border-color: #fff !important;
}

td a:hover{
	opacity: 0.7;
}

table{
	width:100% !important;
	background-color: #00000080;
	margin-top:50px;
}
</style>
