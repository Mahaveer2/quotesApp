<script>
	import { onMount } from 'svelte';
	import { navigating } from '$app/stores';
	import { SvelteToast } from '@zerodevx/svelte-toast'
	import { afterNavigate } from '$app/navigation';
	import AudioPlayer from '../components/AudioPlayer.svelte';
	import Loader from '../components/Loader/Loader.svelte';
	import Navbar from '../components/Navbar/Navbar.svelte';
	import './app.scss';
	import "./anim.css";
	import { page } from '$app/stores';
	import QuoteMain from '../components/QuoteMain.svelte';
	import moment from 'moment';
	let bgs=[];
	const options = {};
	export let data;
	const trending = data.data;
	let {settings} = data;
	let musicUrl;
	let url;
	const fetchBackgrounds = async () => {
		const res = await fetch('/api/getbackgrounds/',
		{
			method:'GET'
		}).catch(e => console.log(e));
		const data = await res.json();
		if (data.length) {
			bgs = data;
			bgs = bgs;
			logic();
		}
	};

	onMount(() => fetchBackgrounds());
	let quotes = data.quotes;
	let currentIndex = 0;
	let quoteArray = [quotes];

	const logic = () => {
		const checkHome = () => {}
		console.log($page.url.pathname)
		bgs.forEach((bg,i) => {
			if(bg.page == "Home" && $page.url.pathname == "/" || bg.page == "Home" && $page.url.pathname =="/quote" || bg.page == "Home" && $page.url.pathname == "/category" || bg.page == "Home" ){
				url = "";
				url+= bg.url;
				url = url;
			}else if(bg.page == "Create" && $page.url.pathname == "/create"){
				url = "";
				url+= bg.url;
				url = url;
			}else if(bg.page == "Gallery" && $page.url.pathname == "/gallery"){
				url = "";
				url+= bg.url;
				url = url;
			}else if(bg.page == "Search" && $page.url.pathname == "/search"){
				url = "";
				url+= bg.url;
				url = url;
			}else if(bg.page == "About" && $page.url.pathname == "/about"){
				url = "";
				url+= bg.url;
				url = url;
			}else if(bg.page == "Trending" && $page.url.pathname == "/trending"){
				url = "";
				url+= bg.url;
				url = url;
			}
		})
		url = url;
	}

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

	afterNavigate(logic)

	let site = JSON.parse(settings.data);
	let color = `rgba(${site.color.r},${site.color.g},${site.color.b},${site.color.a})`;
</script>
<div class="cursor" />
<Loader />
<svelte:head>
	<title>{site.title}</title>
	{@html site.links}
	<link rel="icon" href={site.logo} />
	<link rel="apple-touch-icon image_src" href='/favicon.png' />
</svelte:head>
<body style={`--font:${site.font};--primary:${color}`}>
<Navbar title={site.title}/>
<div class="app">
	<div class="overlay" />
		<img
			src={url}
			alt="background image"
			class="main-image"
		/>
	<div
		class="container app-content"
		style={`position:${$page.url.pathname == '/gallery' ? '' : 'relative'};`}
	>
		<slot />

		<div
			style={`${
				$page.url.pathname == '/' ? 'visibility:visible;height:100%' : 'visibility:hidden;height:0;'
			};position:${$page.url.pathname == '/gallery' ? '' : 'relative'};`}
		>
		<h1>Welcome to {site.title}</h1>
			<QuoteMain {quotes} />
		</div>

		<div
			style={`${
				$page.url.pathname == '/trending' ? 'visibility:visible;height:100%' : 'visibility:hidden;height:0;'
			};position:${$page.url.pathname == '/gallery' ? '' : 'relative'};display:flex;`}
		>
			<QuoteMain quotes={trending} />
		</div>
	</div>
</div>


	<AudioPlayer {play} src={`/music.mp3`} />


<style>
	.app blockquote {
		font-family: var(--font) !important;
	}
</style>
<SvelteToast {options} />
</body>