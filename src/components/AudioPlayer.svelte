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
    position: absolute;z-index:1000 ;
    bottom: 10%;
    right: 10%;
    background: #FFAFBD;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #ffc3a0, #FFAFBD);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #ffc3a0, #FFAFBD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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