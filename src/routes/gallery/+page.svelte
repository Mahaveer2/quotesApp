<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	const { quotes } = data;
	onMount(() => {
		var words_attr = [];

		const canvas = document.getElementById('c');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		if (canvas.getContext) {
			const c = canvas.getContext('2d');
			const w = canvas.width;
			const h = canvas.height;

			c.fillStyle = 'white';

			// constructor
			class Word {
				constructor(text) {
					this.text = text.quote;
					this.id = text.id;
					this.x = Math.random() * w + 10;
					this.y = Math.random() * h + 30;
					this.font = `${Math.floor(Math.random() * 50 + 10)}px arial`;
					this.speed = Math.random() * 5 + 1;
				}
			}

			quotes.forEach((quote) => words_attr.push(new Word(quote)));
			words_attr.forEach((word) => {
				canvas.addEventListener('click', function (event) {
					const clickX = event.clientX;
					const clickY = event.clientY;
					if (
						clickX >= word.x &&
						clickX <= word.x + word.width &&
						clickY >= word.y &&
						clickY <= word.y + parseInt(word.font)
					) {
						console.log('You clicked on the word: ' + word.text);
					}
				});
			});

			function animation() {
				words_attr.forEach((word) => {
					c.font = word.font;
					c.fillText(word.text, word.x, word.y);
					word.width = c.measureText(word.text).width;
				});
				move();
			}

			words_attr.forEach((word) => {
				canvas.addEventListener('click', function (event) {
					// Get the mouse position relative to the canvas
					const rect = canvas.getBoundingClientRect();
					const x = word.clientX - rect.left;
					const y = word.clientY - rect.top;
					const ctx = canvas.getContext('2d');

					// Check if the mouse click was inside the canvas text element
					if (ctx.isPointInPath(x, y)) {
						goto("/quote/"+word.id);

					}
				});
			});

			function move() {
				words_attr.forEach((word) => {
					if (word.x > w) {
						word.x = -word.width;
						let y = Math.random() * h;
					} else {
						word.x += word.speed;
					}
				});
			}

			setInterval(function () {
				c.clearRect(0, 0, w, h);
				animation();
			}, 24);
		}
	});
</script>

<canvas id="c" />

<style>
	canvas {
		position: absolute;
		left: 0;
		width: 100vw;
		height: 100vh;
		top: 90px;
		z-index: 10000;
	}
</style>
