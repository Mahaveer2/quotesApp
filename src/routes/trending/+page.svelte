<script>
	import Quote from '../../components/Quote/Quote.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';
	import { each } from 'svelte/internal';
	import Transition from "../../components/Transition.svelte";
	import QuoteMain from '../../components/QuoteMain.svelte';

	export let data;

	let quotes = data.data;
</script>

<h1>Top ten quotes</h1>
<div>
<QuoteMain {quotes}/>
</div>