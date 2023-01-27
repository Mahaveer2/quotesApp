<script>
	import Quote from '../components/Quote/Quote.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { each } from 'svelte/internal';
	import Transition from '../components/Transition.svelte';
	let quoteIndex = 0;

	export let data;

	let quotes = data.data;

	setInterval(() => {
		quoteIndex++;
		if(quoteIndex >= quotes.length){
      quoteIndex = 0;
    }
	}, 5000);
</script>

		<h1>Welcome to music app</h1>
		{#each quotes as quote,i}
			{#if quoteIndex == i}
      <Transition>
				<div style="width:100%;display:flex;
				justify-content:center;align-items:center;">
				<a
					style="text-decoration: none;width:80%"
					href={`/quote/${quote.slug.current}`}
				>
					<Quote isFull={false} quote={quote} />
				</a>
			</div>
			</Transition>
      {/if}
		{/each}
