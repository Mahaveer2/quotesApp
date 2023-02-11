<script>
	import { goto } from '$app/navigation';
	import Transition from '../../components/Transition.svelte';
	import { PrismaClient } from '@prisma/client';
	export let data;
	
	let msg = "";
	let chars = "";
	let categories = data.categories;
	let busy = false;

	
	async function createQuote(e) {
		e.preventDefault()
		busy = true;
		const formData = new FormData(e.target)
		const response = await fetch("api/create", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
		e.target.reset()
		busy = false;
		msg = "Thank you for your Original Quote, this is being verified by our Admin Team"
		setTimeout(() => msg="",2000);
	}

	function countChar(){

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num)
}
		if(chars.length >= 200){

		}
	}
</script>

<h1>Post a Quote</h1>

<form aria-busy={busy} aria-disabled={busy} on:submit={e => createQuote(e)}>
	<p style="color: #fff;">Do you have an original Quote you would like to see it published. Simply Type in your Quote, once our Team verifies it is original and from you, we will post on the site.</p>
	<textarea bind:value={chars} maxlength="200" required  name="quote" on:keydown={countChar} type="text" placeholder="Quote" />
	<textarea required name="description" type="text" placeholder="Description" />
	<input required  name="author" type="text" placeholder="Author" />
	<input required  name="name" type="text" placeholder="Full name" />
	<input required  name="email" type="email" placeholder="Your Email" />
	<select required  name="categoryid" id="">
		{#each categories as category}
			<option value={category.id} placeholder="Select a category">{category.title}</option>
		{/each}
		<option disabled value="Select a category" placeholder="Select a category"
			>Select a category</option
		>
	</select>
	<button class="btn-transparent" aria-busy={busy} disabled={busy} type="submit"
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
