<script>
	import { each } from 'svelte/internal';
	import { onMount } from 'svelte';
	import './style.scss';
	let showImage = false;
	let container;
	let image;
	let input;
	let form;
	let placeholder;
	let backgrounds = [];

	const loadBackgrounds = async () => {
		const res = await fetch('/api/getbackgrounds');
		let _backgrounds = await res.json();
		if (_backgrounds.length) {
			backgrounds=_backgrounds;
			backgrounds = backgrounds;
		}
	};

	onMount(() => loadBackgrounds());

	function onChange() {
		const file = input.files[0];

		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);
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

	async function uploadFunction(imgBase64) {
		const data = {};
		console.log('uploading');
		showImage = false;
		const imgData = imgBase64.split(',');
		data['tokens'] = localStorage.getItem('admin');
		data['image'] = imgData[1];
		let res = await fetch(`/api/postbackground`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});
		let json = res.json();
		console.log(json);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		formData.append('token', localStorage.getItem('token'));

		let res = await fetch(`/api/postbackground`, {
			method: 'POST',
			body: formData
		});
		e.target.reset();
		showImage = false;
		let json = await res.json();
		loadBackgrounds();
	};

	const deleteBG = async (path) => {
		let ok = confirm('Are you sure you want to delete?');
		if (!ok) {
			return false;
		}
		backgrounds = [];
		const formData = new FormData();
		formData.append('path', path);
		formData.append('token', localStorage.getItem('token'));

		let res = await fetch(`/api/deletebackground`, {
			method: 'POST',
			body: formData
		});
		let json = await res.json();
		if (json.status == 200) {
			loadBackgrounds();
			console.log('deleted background');
		}
	};
</script>

<div class="container">
	<form class="myform" bind:this={form} on:submit={(e) => handleSubmit(e)}>
		<input
			bind:this={input}
			on:change={onChange}
			required
			class="hidden contrast"
			name="image"
			id="file-to-upload"
			type="file"
			accept=".png,.jpg"
		/>
		<button class="upload-btn contrast" type="submit">Upload</button>
	</form>
	<div bind:this={container}>
		{#if showImage}
			<img class="preview" bind:this={image} src="" alt="Preview" />
			<button class="abort" on:click={cancel}>Cancel</button>
		{:else}
			<span bind:this={placeholder}>Image Preview</span>
		{/if}
	</div>
	<div class="grid">
		{#each backgrounds as background}
			<div class="background">
				<img alt="Background Image" src={`/backgrounds/${background}`} />
				<button on:click={() => deleteBG(background)} class="delete">Delete</button>
			</div>
		{/each}
	</div>
</div>
