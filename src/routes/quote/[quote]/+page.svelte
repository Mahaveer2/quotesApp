<script>
  import { page } from '$app/stores';
	import Quote from '../../../components/Quote/Quote.svelte';
  let slug = $page.params.quote;
  export let data;

  const {quote} = data;
</script>

<h1>Welcome to Quotic</h1>
<Quote 
category={quote[0].category}
    isFull={true}
    quote={quote[0]}
    />