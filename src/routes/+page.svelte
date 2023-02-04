<script>
	import Quote from '../components/Quote/Quote.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { each } from 'svelte/internal';
	import Transition from '../components/Transition.svelte';

	export let data;

	let quotes = data.data;
	quotes = quotes.filter(quote => quote.active);
</script>

<h1>Welcome to Quotic</h1>
<div style="height:100vh" class="card-container">
	<div class="card-float">
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