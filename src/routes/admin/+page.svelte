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

  async function logout(){
    const formData = new FormData();
    formData.append("token",localStorage.getItem("admin"));
    let ok = confirm('Are you sure you want log out?');
		if (!ok) {
			deleting = false;
			return false;
		}
    const response = await fetch("api/authorize", {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
    let json = await response.json();
    adminState.set({
      email:"",
      isAuthenticated:false,
    })
    localStorage.removeItem("admin");

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
<div style="margin-top:40px;display:flex;justify-content:space-between;" class="mobile">

    <h1 style="flex:10">Welcome Admin</h1>
  <div style="display:flex;gap:10px">
    <a role="button" class=" contrast button-1" style="color:#000 !important;width:300px" href="admin/backgrounds"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:23px;margin-right:10px">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
     Manage Backgrounds</a>
    <button on:click={() => modal = true} style="width:150px" class="button-1 contrast">Create +</button>
    <button on:click={logout} style="width:150px" class="button-1 red contrast">Log out <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:25px;margin-left:10px">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
    </button>
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
<button on:click={() => modal_c = true} style="width:250px"  class="button-1 contrast w-full">Create category +</button>
<a role="button" class="w-full contrast button-1" style="color:#000 !important;width:300px" href="admin/site">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:23px;margin-right:10px">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>  
 Site Settings</a>
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

.red{
    background-color: red !important;
    color: #fff !important;
    border:none;
  }
</style>