<script>
	import { each } from 'svelte/internal';
	import { toast } from '@zerodevx/svelte-toast'
	let loading = false;
	import { onMount } from 'svelte';
	import './style.scss';
	let showImage = false;
	let container;
	let img;
	let image;
	let input;
	let form;
	let deleting = false;
	let busy = false;
	let placeholder;
	let backgrounds = [];

	const loadBackgrounds = async () => {
		loading = true;
		const res = await fetch('/api/getbackgrounds');
		let _backgrounds = await res.json();
		if (_backgrounds.length) {
			backgrounds = _backgrounds;
			backgrounds = backgrounds;
		}
		loading = false;
	};

	onMount(() => loadBackgrounds());

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
			image:img
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
		toast.push("Uploaded Background")
		busy = false;
		let json = await res.json();
		loadBackgrounds();
	};

	const deleteBG = async (id,url) => {
		deleting = true;
		let ok = confirm('Are you sure you want to delete?');
		if (!ok) {
			deleting = false;
			return false;
		}
		const formData = new FormData();
		formData.append('id', id);
		formData.append('token', localStorage.getItem('admin'));
		formData.append('url',url);
		let res = await fetch(`/api/deletebackground`, {
			method: 'POST',
			body: formData
		});
		let json = await res.json();
		if (json.status == 200) {
			loadBackgrounds();
			deleting = false;
			toast.push("Deleted background")
		}
	};

</script>

<div class="container" aria-busy={loading}>
	<div style="margin-top:20px" aria-busy={deleting} class="grid">
		{#each backgrounds as background}
			<div class="background">
				<span style="margin:5px">{background.page}</span>
				<a href={`backgrounds/${background.id}`}>
					<img alt="Background Image" src={`${background.url}`} /></a>
			</div>
		{/each}
	</div>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr) !important;
		gap:20px;
		height: 100vh;
	}

	@media screen and (max-width: 768px) {
		.grid {
			display: grid;
			grid-template-columns: repeat(1, 1fr) !important;
		}
	}
</style>
