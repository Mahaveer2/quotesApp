<script>
	import './navbar.scss';
	import NavLink from './NavLink.svelte';
	let nav = false;
	export let title;
</script>

<nav class="navbar">
	<ul>
		<li><a style="color:#fff !important" href="/">{title}</a></li>
	</ul>
	<div on:click={() => (nav = true)} class="menu">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
		</svg>
	</div>

	<ul class={`sidenav ${nav && 'active'}`}>
		<div class="content">
			<a class="close" on:click={() => (nav = !nav)} href="#">&times;</a>
		<li on:click={() => (nav = false)}>
			<NavLink title="Home" href="/" />
		</li>
		<li on:click={() => (nav = false)}>
			<NavLink title="About us" href="/about" />
		</li>
		<li on:click={() => (nav = false)}>
			<NavLink title="Search" href="/search" />
		</li>
		<li on:click={() => (nav = false)}>
			<NavLink title="Create Quote" href="/create" />
		</li>
		<li on:click={() => (nav = false)}>
			<NavLink title="Gallery" href="/gallery" />
		</li>
		<li on:click={() => (nav = false)}>
			<NavLink title="Trending" href="/trending" />
		</li>
		</div>
	</ul>
</nav>
