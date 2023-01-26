<script>
	import Quote from "../components/Quote/Quote.svelte";

  let url = "https://picsum.photos/1920/1080";
  import quotes from '$lib/quotes.json';
  let randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
  
  async function changeImage(){
    let res = await fetch("https://picsum.photos/1920/1080");
    return res.url;
  }

  setInterval(async () => {
    url = await changeImage();
  },(2*60*1000))
</script>

<div class="app">
  <img src={url} alt="A background picture" class="main-image">
  <div class="container app-content">
    <h1>Welcome to sveltekit</h1>
    <a style="text-decoration: none; color:#fff;cursor:pointer;" href={`/quote/${randomQuote.id}`}>
      <Quote 
      isFull={false}
      quote={randomQuote}
      />
    </a>
  </div>
</div>