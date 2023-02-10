<script>
	import { goto } from "$app/navigation";
  import { adminState } from "$lib/stores";
	import QuoteDetails from "./QuoteDetails.svelte";
  let modal = false;
  export let data;
  let {categories} = data;
  let modal_c = false;
  let busy = false;

  async function createQuote(e) {
		e.preventDefault()
		busy = true;
		const formData = new FormData(e.target)
    formData.append("token",localStorage.getItem("token"));
		const response = await fetch("api/create", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
    let json = await response.json();
		e.target.reset()
		busy = false;
    modal = false;
    await invalidate("/admin");
	}

  async function createCategory(e) {
		e.preventDefault()
		busy = true;
		const formData = new FormData(e.target)
    formData.append("token",localStorage.getItem("token"));
		const response = await fetch("api/create_category", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
    let json = await response.json();
      modal_c = false;
    goto("admin/categories");
		e.target.reset() 
		busy = false;
	}

</script>
<div style="display:flex;justify-content:space-between;" class="mobile">
  <div>
    <h1 style="flex:10">Welcome Admin</h1>
  </div>
  <div style="display:flex;gap:10px">
    <a role="button" class=" contrast button-1" style="color:#000 !important;width:300px" href="admin/backgrounds"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:23px;margin-right:10px">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
     Manage Backgrounds</a>
    <button on:click={() => modal = true} style="width:150px" class="button-1 contrast">Create +</button>
  </div>
</div>
<div style="display:flex;gap:5px;width:100%" class="mobile w-full">
  <a role="button" class="w-full contrast button-1" style="color:#000 !important;width:300px" href="admin/categories"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:23px;margin-right:10px">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
   Manage Categories</a>
   <a role="button" class="w-full contrast button-1" style="color:#000 !important;width:300px" href="admin/change"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:23px;margin-right:10px">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
   Account Settings</a>
<button on:click={() => modal_c = true} style="width:200px" class="button-1 contrast w-full">Create category +</button>

</div>
<QuoteDetails/>

<form on:submit={(e) => createQuote(e)} class={`${modal ? "modal" : "hide"}`}>
  <a href="#" on:click={() => modal = false} style="font-size:40px;text-decoration:none;position:absolute;right:20%;top:10%">&times;</a>
  <div style="width:50%">
	<input required  name="author" type="text" placeholder="Author" />
	<textarea required  name="quote" type="text" placeholder="Quote" />
  <input type="hidden" name="email" value={$adminState.email}>
  <input type="hidden" name =" name" value ="admin"/>
	<textarea required name="description" type="text" placeholder="Description" />
	<select required  name="categoryid">
		{#each categories as category}
			<option value={category.id} placeholder="Select a category">{category.title}</option>
		{/each}
		<option disabled value="Select a category" placeholder="Select a category"
			>Select a category</option
		>
	</select>
	<button class="btn-transparent contrast" aria-busy={busy} disabled={busy} type="submit"
		>Submit Quote</button
	>
  </div>
</form>


<form on:submit={(e) => createCategory(e)} class={`${modal_c ? "modal" : "hide"}`}>
  <a href="#" on:click={() => modal_c = false} style="font-size:40px;text-decoration:none;position:absolute;right:20%;top:10%">&times;</a>
  <div style="width:50%">
  <input required  name="title" type="text" placeholder="Title" />
	<button class="btn-transparent contrast" aria-busy={busy} disabled={busy} type="submit"
		>Submit Category</button
	>
  </div>
</form>


<style>
  .button-1{
    width:150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hide{
    display: none;
  }

  .modal{
    position: fixed;
    z-index: 100000000000000000000000000;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, .7);
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(10px);
  }
  @media screen and (max-width:768px){
    .modal div{
      width:90% !important;
    }
    .mobile{
      flex-direction: column;
    }

    .w-full{
      width:100% !important;
    }
  }
</style>