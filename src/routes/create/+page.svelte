<script>
	import { createClient as client } from '$lib/SanityClient';
	import { goto } from '$app/navigation';
	import Transition from '../../components/Transition.svelte';
	import { v4 as uuidv4 } from 'uuid';
	let Author = '';
	let handle = false;
	let Quote = '';
	let _category = '';
	let msg = '';
	let email = '';
	let name = '';
	let desc = '';

	export let data;

	const createQuote = ({ quote, author,_desc }) => {
		const doc = {
			_type: 'Quotes',
			Author: author,
			quote: quote,
			email:email,
			name:name,
			active:false,
			description:_desc,
			views:0,
			slug: {
				_type: 'slug',
				current: uuidv4()
			},
			category: [
				{
					_type: 'reference',
					_ref: _category,
					_key: uuidv4()
				}
			]
		};

		client
			.create(doc)
			.then((res) => {
				msg = 'Thank you for your Original Quote, this is being verified by our Admin Team';
				setTimeout(() => {
					msg = '';
				},3000)
				handle = false;
				Author = "";
				email ="";
				desc = "";
				name ="";
				Quote = "";
				_category ="";
			})
			.catch((error) => console.error(error));
	};

	const handleSubmit = () => {
		handle = true;
		if ((Author == '') | (Author == ' ')) {
			alert('Please enter valid Author name');
			return false;
		}
		createQuote({ quote: Quote, author: Author ,_desc:desc});
	};
</script>

<h1>Post a Quote</h1>

<form aria-busy={handle} aria-disabled={handle} on:submit|preventDefault={handleSubmit}>
	<p style="color: #fff;">Do you have an original Quote you would like to see it published. Simply Type in your Quote, once our Team verifies it is original and from you, we will post on the site.</p>
	<input required bind:value={email} type="email" placeholder="Email" />
	<input required bind:value={name} type="text" placeholder="Name" />
	<input required bind:value={Author} type="text" placeholder="Author" />
	<textarea required bind:value={Quote} type="text" placeholder="Quote" />
	<textarea required bind:value={desc} type="text" placeholder="Description" />
	<select required bind:value={_category} name="" id="">
		{#each data.data as category}
			<option value={category._id} placeholder="Select a category">{category.title}</option>
		{/each}
		<option disabled value="Select a category" placeholder="Select a category"
			>Select a category</option
		>
	</select>
	<button class="btn-transparent" aria-busy={handle} disabled={handle} type="submit"
		>Submit Quote</button
	>
</form>
{#if msg}
	<Transition>
		<div class="msg">
			{msg}
		</div>
	</Transition>
{/if}

<style>
	.btn-transparent {
		background-color: rgba(255, 255, 255, 1);
		color: #000;
		outline: none;
		border: none;
	}

	.btn-transparent:hover {
		background-color: rgba(155, 155, 155);
	}

	.msg {
		position: fixed;
		bottom: 20px;right: 10.7%;
		padding: 10px 20px;
		background-color: rgba(0, 157, 255, .8);
		border: 1px solid rgba(34, 174, 255, 0.6);
		border-radius: 4px;
	}

	.btn-transparent:focus {
		box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.8);
	}
</style>
