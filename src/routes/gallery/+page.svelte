<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let data;
  const { quotes } = data;
</script>

<div class="wrapper">
  <div class="wrapper__container">
    {#each quotes as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
    {#each quotes as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
  </div>
	<div class="wrapper__container">
    {#each quotes as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
    {#each quotes as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
  </div>
	<div class="wrapper__container">
    {#each quotes as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
    {#each quotes as quote}
      <a href={`/quote/${quote.id}`} style={`--font-size:${Math.floor(Math.random() * 50 + 20)}px`}>{quote.quote}</a>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
		left:0;
		flex-direction: column;
    top: 80px;
    overflow: hidden;
  }

  .wrapper__container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    animation: scroll 60s linear infinite;
    width: max-content;
    margin-left: -50vw;
    margin-right: -50vw;
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
    transition: transform 0.2s ease-in-out;
  }

  .wrapper__container a:hover {
    transform: scale(1.05);
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
</style>
