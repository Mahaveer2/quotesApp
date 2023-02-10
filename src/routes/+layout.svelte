<script>
	import { onMount } from 'svelte';
	import AudioPlayer from '../components/AudioPlayer.svelte';
	import Loader from '../components/Loader/Loader.svelte';
	import Navbar from '../components/Navbar/Navbar.svelte';
	import './app.scss';
	import { page } from '$app/stores';
	import QuoteMain from '../components/QuoteMain.svelte';

	export let data;
	let { settings } = data;
	let { musicUrl } = data;

	let quotes = data.quotes;
	let backgrounds = data.data;
	let currentIndex = 0;
	let quoteArray = [quotes];

	setInterval(() => {
		if (currentIndex == backgrounds.length - 1) {
			currentIndex = 0;
		} else {
			currentIndex++;
		}
	}, 1000 * 60 * 2);
	let play = false;

	onMount(() => {
		const cursor = document.querySelector('.cursor');

		document.addEventListener('mousemove', (e) => {
			cursor.setAttribute(
				'style',
				'top: ' + (e.pageY - 10) + 'px; left: ' + (e.pageX - 10) + 'px;'
			);
		});

		document.addEventListener('click', () => {
			cursor.classList.add('expand');

			setTimeout(() => {
				cursor.classList.remove('expand');
			}, 300);
		});
	});
</script>

<div class="cursor" />
<Loader />
<svelte:head>
	<title>{settings.name}</title>
	<link rel="icon" href={settings.logo} />
	<link rel="apple-touch-icon image_src" href={settings.logo} />
	{@html settings.head}
	{@html settings.url}
</svelte:head>
<Navbar />
<div class="app">
	<div class="overlay"></div>
		<img
		src={backgrounds[currentIndex].imageUrl}
		alt={backgrounds[currentIndex].Name}
		class="main-image"
	/>
	<div class="container app-content" style={`position:${$page.url.pathname == '/gallery' ? '':'relative'};`}>
		<slot />

		<div
			style={`${
				$page.url.pathname == '/' ? 'visibility:visible;height:100%' : 'visibility:hidden;height:0;'
			};position:${$page.url.pathname == '/gallery' ? '':'relative'};display:flex;`}
		>
			<QuoteMain {quotes} />
		</div>
	</div>
</div>

<AudioPlayer {play} src={`${musicUrl[0].audio}`} />

<style>
	.app blockquote {
		font-family: var(--font) !important;
	}
</style>
