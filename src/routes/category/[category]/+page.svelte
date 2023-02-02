<script>
	import Quote from "../../../components/Quote/Quote.svelte";


  export let data;
  const { title } = data;
  const quotes = data.data;
</script>

<h1>{title}</h1>

<div>
  {#each quotes as quote}
    <div
      style="width:100%;display:flex;
          justify-content:center;align-items:center;"
    >
      <a style="text-decoration: none;width:80%" href={`/quote/${quote.slug.current}`}>
        <Quote category={quote.category} isFull={false} quote={quote} />
      </a>
    </div>
  {/each}
  </div>