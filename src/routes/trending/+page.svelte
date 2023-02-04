<script>
	import Quote from '../../components/Quote/Quote.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { each } from 'svelte/internal';
	import Transition from "../../components/Transition.svelte";

	export let data;

	let quotes = data.data.sort((a,b) => Number(a.views) - Number(b.views)).reverse();
</script>

<h1>Top ten quotes</h1>
<div>
{#each quotes as quote}
	<div
		style="width:100%;display:flex;
				justify-content:center;align-items:center;"
	>
		<a style="text-decoration: none;width:80%" href={`/quote/${quote.slug.current}`}>
			<Quote category={quote.category} isFull={false} {quote} />
		</a>
	</div>
{/each}
</div>