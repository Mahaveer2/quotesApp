<script>
	import { onMount } from 'svelte';

	export let src;
	export let play;

  let mounted = false;
  let handlePlay;

	onMount(() => {
		let audio = new Audio(src);
		let click = 0;
    mounted = true;

    handlePlay = () => {
    play = !play;
    play ? audio.play() : audio.pause();
  };

		document.addEventListener('mousemove', (event) => {
			if (click < 160) {
				click++;
			}
			if (click == 100) {
        audio.play();
        document.removeEventListener("mousemove",() => {});
				play = true;
			}
		});
	});
</script>

{#if mounted}
<div class="audio-button" on:click={() => handlePlay()}>
  {#if !play}
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>  
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>    
  {/if}
</div>
{/if}

<style>
  .audio-button{
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 10%;
    right: 10%;
    background-color: teal;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: .2s ease;
    border-radius: 50%;
  }

  .audio-button svg{
    width:30px;
    height: 30px;
  }
</style>