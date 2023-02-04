<script>
	import Quote from '../components/Quote/Quote.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { each } from 'svelte/internal';
	import Transition from '../components/Transition.svelte';
	import { createClient as client } from '$lib/SanityClient.js';
	export let data;

	const addView = (id) => {
		client
			.patch(id) // Document ID to patch
			.set({ active: true }) // Shallow merge
			.inc({ views: 1 }) // Increment field by count
			.commit() // Perform the patch and return a promise
			.then((updated) => {})
			.catch((err) => {
				console.error(err)
			});
	};

	let quotes = data.data;
	quotes = quotes.filter((quote) => quote.active);
	console.log(quotes);
</script>

<h1>Welcome to Quotic</h1>
<div style="height:100vh" class="card-container">
	<div class="card-float">
		{#each quotes as quote}
			<div
				style="width:100%;display:flex;
						justify-content:center;align-items:center;"
			>
				<a
					on:click={() => addView(quote._id)}
					style="text-decoration: none;width:80%"
					href={`/quote/${quote.slug.current}`}
				>
					<Quote isFull={false} {quote} />
				</a>
			</div>
		{/each}
	</div>
</div>
