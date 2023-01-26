<script>
  export let quote;
  export let isFull;
  import "./quote.scss";
</script>

{#if !isFull}
<div class="quote animating">
  {quote.quote}
</div>
{:else}
<article class="card">
  <h1>{quote.quote}</h1>
  <span style="font-size:18px">By {quote.author}</span>
</article>
{/if}