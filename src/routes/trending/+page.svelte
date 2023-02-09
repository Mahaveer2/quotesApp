<script>
	import Quote from '../../components/Quote/Quote.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { each } from 'svelte/internal';
	import Transition from "../../components/Transition.svelte";

	export let data;

	let quotes = data.data;
</script>

<h1>Top ten quotes</h1>
<div>
{#each quotes as quote}
	<div
		style="width:100%;display:flex;
				justify-content:center;align-items:center;margin-bottom:15px"
	>
		<a style="text-decoration: none;width:100%" href={`/quote/${quote.id}`}>
			<Quote category={quote.category} isFull={false} showAuthor={true} {quote} />
		</a>
	</div>
{/each}
</div>