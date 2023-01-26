<script>
  import { page } from '$app/stores';
	import Quote from '../../../components/Quote/Quote.svelte';
  let url = "https://picsum.photos/1920/1080";
  let quote = Number($page.params.quote) - 1;
  import quotes from '$lib/quotes.json';
</script>

<div class="app">
  <img src={url} alt="A background picture" class="main-image">
  <div class="container app-content">
    <h1>Welcome to Quotic</h1>
    <Quote 
    isFull={true}
    quote={quotes[quote]}
    />
  </div>
</div>