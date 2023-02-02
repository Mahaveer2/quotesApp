<script>
	import { createClient as client } from '$lib/SanityClient';
	import { goto } from '$app/navigation';

	let Author = "";
	let handle = false;
	let Quote = '';
	let _category = "";

	export let data;
	console.log(data);

	function uuidv4() {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
			(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
		);
	}

  let slug = uuidv4();
	const createQuote = ({ quote, author }) => {
		const doc = {
			_type: 'Quotes',
      Author: author,
			quote: quote,
      slug:{
        _type:"slug",
        current:slug,
      },
			category:[{
				_type:"reference",
				_ref:_category,
				_key:uuidv4(),
			}]
		};

		client.create(doc).then((res) => {
			goto('quote/'+slug);
		}).catch(error => console.error(error));
	};

	const handleSubmit = () => {
		handle = true;
		if(Author == ""| Author == " "){
			alert("Please enter valid Author name")
			return false;
		}
    createQuote({ quote:Quote,author:Author});
  };
</script>

<h1>Post a Quote</h1>

<form aria-busy={handle} aria-disabled={handle} on:submit|preventDefault={handleSubmit}>
	<input required bind:value={Author} type="text" placeholder="Author" />
	<textarea required bind:value={Quote} type="text" placeholder="Quote" />
	<select required bind:value={_category} name="" id="">
		{#each data.data as category}
		<option value={category._id} placeholder="Select a category">{category.title}</option>	
		{/each}
		<option disabled value="Select a category" placeholder="Select a category">Select a category</option>
	</select>
	<button class="btn-transparent" aria-busy={handle} disabled={handle} type="submit">Submit Quote</button>
</form>


<style>
	.btn-transparent{
		background-color: rgba(255,255,255,1);
		color: #000;
		outline: none;
		border: none;
	}

	.btn-transparent:hover{
		background-color: rgba(155,155,155);
	}

	.btn-transparent:focus{
		box-shadow: 0 0 2px 2px rgba(255,255,255,.8);
	}
</style>