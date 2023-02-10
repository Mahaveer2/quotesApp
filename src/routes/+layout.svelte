<script>
	import { onMount } from 'svelte';
	import AudioPlayer from '../components/AudioPlayer.svelte';
	import Loader from '../components/Loader/Loader.svelte';
	import Navbar from '../components/Navbar/Navbar.svelte';
	import './app.scss';
	import "./anim.css";
	import { page } from '$app/stores';
	import QuoteMain from '../components/QuoteMain.svelte';
	import moment from 'moment';
	let bgs=[];

	export let data;
	let musicUrl;
	const fetchBackgrounds = async () => {
		const res = await fetch('/api/getbackgrounds/',
		{
			method:'GET'
		}).catch(e => console.log(e));
		const data = await res.json();
		if (data.length) {
			bgs= data;
			bgs = bgs;
		}
	};

	onMount(() => fetchBackgrounds());
	let quotes = data.quotes;
	let currentIndex = 0;
	let quoteArray = [quotes];

	setInterval(() => {
		if(bgs){
			if (currentIndex == bgs.length -1 ) {
			currentIndex = 0;
		} else {
			currentIndex++;
		}
		}
	}, 1000 * 60 *2);
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
	<title>ChrisQuotes</title>
	<link rel="icon" href='/favicon.png' />
	<link rel="apple-touch-icon image_src" href='/favicon.png' />
</svelte:head>
<Navbar />
<div class="app">
	<div class="overlay" />
	{#if bgs}
		<img
			src={`/backgrounds/${bgs[currentIndex]}`}
			alt="background image"
			class="main-image"
		/>
	{/if}
	<div
		class="container app-content"
		style={`position:${$page.url.pathname == '/gallery' ? '' : 'relative'};`}
	>
		<slot />

		<div
			style={`${
				$page.url.pathname == '/' ? 'visibility:visible;height:100%' : 'visibility:hidden;height:0;'
			};position:${$page.url.pathname == '/gallery' ? '' : 'relative'};display:flex;`}
		>
			<QuoteMain {quotes} />
		</div>
	</div>
</div>


	<AudioPlayer {play} src={`/music.mp3`} />


<style>
	.app blockquote {
		font-family: var(--font) !important;
	}
</style>
