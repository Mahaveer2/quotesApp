<script>
  import { page } from '$app/stores';
	import Quote from '../../../components/Quote/Quote.svelte';
  let slug = $page.params.quote;
  export let data;
  import { settingData } from "$lib/stores";

  const {quote} = data;
</script>

<h1 style="font-size:24px;margin:10px 10px">Welcome to {$settingData?.title}</h1>
<Quote 
    isFull={true}
    quote={quote}
    />