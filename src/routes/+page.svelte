<script>
	import Quote from '../components/Quote/Quote.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';

	let url = 'https://picsum.photos/1920/1080';
	import quotes from '$lib/quotes.json';
	import { each } from 'svelte/internal';
	import Transition from '../components/Transition.svelte';
	let quoteIndex = 0;

	async function changeImage() {
		let res = await fetch('https://picsum.photos/1920/1080');
		return res.url;
	}

	setInterval(() => {
    if(quoteIndex >= quotes.length){
      quoteIndex = 0;
    }
		quoteIndex++;
	}, 5000);

	setInterval(async () => {
		url = await changeImage();
	}, 2 * 60 * 1000);
</script>

<div class="app">
	<img src={url} alt="A background picture" class="main-image" />
	<div class="container app-content">
		<h1>Welcome to music app</h1>
		{#each quotes as quote,i}
			{#if quoteIndex == i}
      <Transition>
				<a
					style="text-decoration: none; color:#fff;cursor:pointer;"
					href={`/quote/${quote.id}`}
				>
					<Quote isFull={false} quote={quote} />
				</a>
			</Transition>
      {/if}
		{/each}
	</div>
</div>
