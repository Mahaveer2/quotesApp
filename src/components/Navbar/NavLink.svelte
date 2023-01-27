<script>
  import { page } from '$app/stores';
  export let title;
  export let href;
</script>

<li>
  <a  href={href} class="link" class:active={$page.url.pathname == href}>
    {title}
  </a>  
</li>