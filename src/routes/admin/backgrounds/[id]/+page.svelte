<script>
	import { each } from 'svelte/internal';
	import { toast } from '@zerodevx/svelte-toast'
	import { onMount } from 'svelte';
	import '../style.scss';
	import { goto } from '$app/navigation';
  export let data;
  const { id } = data;
	let showImage = false;
	let container;
	let img;
	let image;
	let input;
	let form;
	let deleting = false;
	let busy = false;
	let placeholder;


	function onChange() {
		const file = input.files[0];

		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);
				img = reader.result;
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	}

	async function cancel() {
		form.reset();
		showImage = false;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		busy = true;
		const formData = new FormData();
		const data = {
			token: localStorage.getItem('admin'),
			image:img,
      id:id,
		}

		let res = await fetch(`/api/postbackground`, {
			method: 'POST',
			headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		});

		e.target.reset();
		showImage = false;
		toast.push("Changed Background")
    goto("../backgrounds");
		busy = false;
		let json = await res.json();
	};

</script>

<h1>Change Background</h1>

<form class="myform" bind:this={form} on:submit={(e) => handleSubmit(e)}>
  <input
    bind:this={input}
    on:change={onChange}
    disabled={busy}
    required
    class="hidden contrast"
    name="image"
    id="file-to-upload"
    type="file"
    accept=".png,.jpg"
  />
  <button aria-busy={busy} disabled={busy} class="upload-btn contrast" type="submit"
    >Upload</button
  >
</form>
<div bind:this={container}>
  {#if showImage && !busy}
    <img class="preview" bind:this={image} src="" alt="Preview" />
    <button class="abort" on:click={cancel}>Cancel</button>
  {:else}
    
  {/if}
</div>