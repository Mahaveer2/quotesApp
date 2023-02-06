<script>
	export let quote;
	export let isFull;
	export let showAuthor;
	import './quote.scss';
	export let category;
	import { createClient as client } from '$lib/SanityClient.js';
	import { getCategory } from '$lib/functions';
	import { onMount } from 'svelte';
	const speak = (text) => {
		let utterance = new SpeechSynthesisUtterance(text);
		speechSynthesis.speak(utterance);
	};
	$: cat = [];

	async function getCategories(ref) {
		let data = await getCategory(ref);
		return data;
	}

	onMount(async () => {
		if (category) {
			category.forEach(async (c) => {
				cat.push(await getCategories(c._ref));
				cat = cat;
			});
		}
	});

	const addView = (id) => {
		client
			.patch(id) // Document ID to patch
			.set({ active: true }) // Shallow merge
			.inc({ views: 1 }) // Increment field by count
			.commit() // Perform the patch and return a promise
			.then((updated) => {})
			.catch((err) => {
				console.error(err);
			});
	};
</script>

{#if !isFull}
	<blockquote on:click={() => addView(quote._id)} class={`${!isFull && 'notfull'}`}>
		<p>
			{quote.quote}
		</p>
		{#if showAuthor}
		<cite>{quote.Author}</cite>
		{/if}
	</blockquote>
{:else}
	<blockquote>
		<button on:click={() => speak(quote.quote)} class="speaker">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
			</svg>
		</button>
		<p>
			{quote.quote}			
		</p>
		<cite>{quote.Author}</cite>
		<p  style="font-size:18px;font-family:arial;max-width:100%">{quote?.description}</p>
		<span style="width:100px;height:0;background:red;padding:0;margin:0;">
			<small style="color:#fff">
				Views: {quote.views++}
			</small>
			
		</span>
		{#if category}
			<div class="flexer">
				{#each cat as _category}
					<a style="color:#fff" href={`../category/${_category[0].slug.current}`}>
						<div class="category">{_category[0].title}</div>
					</a>
				{/each}
			</div>
		{/if}
		
	</blockquote>
{/if}

<style>
	blockquote{
		position: relative;
	}
	.flexer {
		display: flex;
		justify-content: space-between;
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

	.speaker{
		width: 50px;
		background-color: transparent;
		padding: 0;
		height: 50px;
		display: flex;
		justify-content: center;
		position: absolute;
		left: 90%;
		top: 20%;
		background: #ffafbd; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#ffc3a0,
			#ffafbd
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#ffc3a0,
			#ffafbd
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		border-radius: 50%;
		color: #fff;
		cursor: pointer;
		font-size: 18px;
		align-items: center;
		transition: .2s ease;

		border: none;outline: none;
		font-size: 30px;
	}


	.animate-pulse{
		transition: .2s ease;
		animation: pulse 2s linear infinite;
	}

	@keyframes pulse{
		0%{

		}
		80%{
			box-shadow: 0 0 0 12px rgba(255, 28, 138, 0.246);
		}
	}

	.speaker svg {
		width: 27px;
		height: 27px;
	}


	.speaker:focus{
		box-shadow: none;
	}

	.speaker:hover{
		color: rgb(255, 255, 255 );
	}
</style>
