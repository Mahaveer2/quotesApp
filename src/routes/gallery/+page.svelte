<script>
	import { onMount } from "svelte";


export let data;
const { quotes }= data;
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
      this.text = text;
      this.x = Math.random() * w + 10;
      this.y = Math.random() * h + 40;
      this.font = `${Math.floor(Math.random() * 50 + 10)}px arial`;
      this.speed = Math.random() * 5 + 1;
    }
  }
  
  quotes.forEach(quote => words_attr.push(new Word(quote)));

  function animation() {
    words_attr.forEach(word => {
      c.font = word.font;
      c.fillText(word.text, word.x, word.y);
      word.width = c.measureText(word.text).width;
    });
    move();
  }

  function move() {
    words_attr.forEach(word => {
      if (word.x > w) {
        word.x = -word.width;
        let y = Math.random() * (h);
      } else {
        word.x += word.speed;
      }
    });
  }

  setInterval(function() {
    c.clearRect(0, 0, w, h);
    animation();
  }, 24);
}


  })
</script>

<canvas id="c" ></canvas> 
<style>

canvas{
  position: absolute;
  left:0;
  width:100vw;
  height:100vh;
  top: 100px;
  z-index: 10000;
}
</style>