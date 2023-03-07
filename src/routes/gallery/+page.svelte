<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import _, { map } from 'underscore';

  export let data;
  const { quotes } = data;
</script>

<div class="wrapper" style={`--count_g:${quotes.length}`}>
  <div class="wrapper__container">
    {#each _.shuffle(quotes) as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
    {#each _.shuffle(quotes) as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
  </div>
	<div class="wrapper__container">
    {#each _.shuffle(quotes) as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
    {#each _.shuffle(quotes) as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
  </div>
	<div class="wrapper__container">
    {#each quotes as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
    {#each _.shuffle(quotes) as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    position: absolute;
    width: 100vw;
    min-height: 100vh;
		left:0;
		flex-direction: column;
    top: 80px;
    overflow: hidden;
  }

  .wrapper__container {
    display: flex;
    flex-direction: row;
    animation: scroll calc(var(--count_g) * 8s) linear infinite;
    width: max-content;
  }

  .wrapper__container a {
    text-decoration: none;
    font-size: var(--font-size);
    min-width: 500px;
    max-width: 700px;
    max-height: 400px;
    margin: 10px;
    color: white;
    padding: 20px;
    border-radius: 10px;
  }

  .wrapper__container a:hover {
    transform: scale(1.05);
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>