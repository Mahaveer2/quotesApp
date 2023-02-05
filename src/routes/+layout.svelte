<script>
	import { onMount } from "svelte";
	import AudioPlayer from "../components/AudioPlayer.svelte";
  import Navbar from "../components/Navbar/Navbar.svelte";
  import "./app.scss";

  export let data;
  let {settings} = data;
  
  let backgrounds = data.data;
  let currentIndex = 0;

  setInterval(() => {
    if(currentIndex >= backgrounds.length){
      currentIndex =0;
    }
    currentIndex++;
  },2*60*1000)
  let play = false;

  onMount(() => {
    const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})
  });
</script>
<div class="cursor">
</div>
<svelte:head>
  <title>{settings.name}</title>
  <link rel="icon" href={settings.logo} >
  <link rel="apple-touch-icon image_src" href={settings.logo}>
  {@html settings.head}
</svelte:head>
<Navbar/>
<div class="app">
  <img  src={backgrounds[currentIndex].imageUrl} alt={backgrounds[currentIndex].Name} class="main-image" />
	<div class="container app-content">
<slot></slot>
</div>
</div>

<AudioPlayer play={play} src="music.mp3"/>