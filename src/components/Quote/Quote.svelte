<script>
	export let quote;
	export let isFull;
	import './quote.scss';
	export let category;
	import { createClient as client } from '$lib/SanityClient.js';
	import { getCategory } from '$lib/functions';
	import { onMount } from 'svelte';

	$:  cat = [];

	async function getCategories(ref) {
		let data = await getCategory(ref);
		return data;
	}

	onMount(async () => {
		if(category){
			category.forEach( async (c) => {
				cat.push( await getCategories(c._ref));
				cat = cat;
			})
		}
	})

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
</script>

{#if !isFull}
	<blockquote on:click={() => addView(quote._id)} class={`${!isFull && 'notfull'}`}>
		<p>
			{quote.quote}
		</p>
	</blockquote>
{:else}
	<blockquote>
		<p>
			{quote.quote}
		</p>
		<cite>{quote.Author}</cite>
		<span style="width:100px;height:0;background:red;padding:0;margin:0;">
			<small style="color:#fff">
				Views: {quote.views}
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
</style>
