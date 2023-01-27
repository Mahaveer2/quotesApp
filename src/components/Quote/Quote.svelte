<script>
  export let quote;
  export let isFull;
  import "./quote.scss";
</script>

{#if !isFull}
<blockquote>
  <p>
   {quote.quote}
  </p>
 </blockquote>
{:else}
<blockquote>
  <p>
    {quote.quote}
   </p>
  <cite>{quote.Author}</cite>
</blockquote>
{/if}