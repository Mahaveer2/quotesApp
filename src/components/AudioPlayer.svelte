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
	<div class={`audio-button ${play && "animate-pulse"}`} on:click={() => handlePlay()}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
		</svg>		
	</div>
{/if}

<style>
	.audio-button {
		width: 60px;
		height: 60px;
		position: sticky;
		z-index: 1000;
		bottom: 5%;
		left: 3%;
		background: #ffafbd; /* fallback for old browsers */
		background: -webkit-linear-gradient(
			to right,
			#ffc3a0,
			#ffafbd
		); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(
			to right,
			#ffc3a0,
			#ffafbd
		); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

		color: #fff;
		cursor: pointer;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: 0.2s ease;
		border-radius: 50%;
	}

	.animate-pulse{
		transition: .2s ease;
		animation: pulse 2s linear infinite;
	}

	@keyframes pulse{
		0%{

		}
		80%{
			box-shadow: 0 0 0 12px rgba(255, 28, 138, 0.246);
		}
	}

	.audio-button svg {
		width: 30px;
		height: 30px;
	}
</style>
