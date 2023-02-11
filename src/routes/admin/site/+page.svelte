<script>
	import ColorPicker from 'svelte-awesome-color-picker';
  export let data;
  let { categories,defaults } = data;
  let settings = JSON.parse(defaults.data);
  let busy = false;
  let rgb = settings.color;
  let  avatar = settings.logo;
  let fileinput;
  let title = settings.title;
	
	const onFileSelected =(e)=>{
  let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target.result
            };
}
	

  const handle = async (e) => {
    e.preventDefault();
    busy = true;
    const data =new FormData(e.target);
    data.append('token',localStorage.getItem('token'));
    data.append('json',JSON.stringify({
      font:data.get('fontname'),
      color:rgb,
      links:data.get('links'),
      logo:avatar,
      title:title,
      galleryCategory:data.get('categoryid'),
    }))

    const response = await fetch("/api/updatesite", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: data,
		});
		let json = await response.json();
    busy = false;
  }
</script>

<h1>Change site settings here</h1>
<form  on:submit={(e) => handle(e)} style="width:100%;height:120vh" class="form">
  <div class="logo">
    {#if avatar}
  <img on:click={()=>{fileinput.click();}} style="width:100px;cursor:pointer" class="avatar" src="{avatar}" alt="" /> 
  {:else}
  <img on:click={()=>{fileinput.click();}} style="width:100px;cursor:pointer" class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" /> 
  {/if}
  </div>
  <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
  <span>Tags</span>
  <textarea  value={settings.links} name="links" placeholder="Enter the links of google Fonts|Analytics|Adsense fonts here"></textarea>
  <span>Font Rule</span>
  <input value={settings.font} type="text" name="fontname" placeholder="Font name"/>
  <span>Site name</span>
  <input required type="text" bind:value={title} placeholder="Site Name">
  <span>Select Category for Gallery</span>
  <select name="categoryid">
		<option disabled>Select a quote</option>
		{#each categories as category}
			<option value={category.id}>{category.title}</option>
		{/each}
	</select>
  <div class="colorp">
    <ColorPicker isDark label=""  bind:rgb />
    <span>Pick border color</span>
  </div>
  <br>
  <button aria-busy={busy} disabled={busy} type="submit" class="contrast">Change</button>
</form>

<style>
  .form{
    display: flex;
    gap:2px;
    flex-direction: column;
  }
  span{
    margin-bottom: 5px;
  }

  .colorp{
    display: flex;justify-content: space-between;
    align-items: center;
    width: 200px;
    --picker-width:400px !important;
  }

  .avatar{
    height:120px;
    width:120px !important;
    border-radius: 50%;
  }
  .logo{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
</style>