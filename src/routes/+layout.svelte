<script>
	import { onMount } from "svelte";
	import AudioPlayer from "../components/AudioPlayer.svelte";
  import Navbar from "../components/Navbar/Navbar.svelte";
  import "./app.scss";

  export let data;
  
  let backgrounds = data.data;
  let currentIndex = 0;

  setInterval(() => {
    if(currentIndex >= backgrounds.length){
      currentIndex =0;
    }
    currentIndex++;
  },2*60*1000)
  let play = false;
</script>

<svelte:head>
  <title>Quotic</title>
</svelte:head>
<Navbar/>

<div class="app">
  <img  src={backgrounds[currentIndex].imageUrl} alt={backgrounds[currentIndex].Name} class="main-image" />
	<div class="container app-content">
<slot></slot>
</div>
</div>

<AudioPlayer play={play} src="music.mp3"/>