<script>
	import AudioPlayer from "../components/AudioPlayer.svelte";
  import Navbar from "../components/Navbar/Navbar.svelte";
  import "./app.scss";

  let play = false;
</script>

<Navbar/>
<slot></slot>
<AudioPlayer play={play} src="music.mp3"/>