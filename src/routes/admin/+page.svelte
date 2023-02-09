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
    goto(json.id)
		e.target.reset()
		busy = false;
    modal = false;
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
<div style="display:flex;justify-content:space-between;">
  <h1 style="flex:10">Welcome Admin</h1>
  <button on:click={() => modal = true} style="flex:1" class="button-1 contrast">Create +</button>
</div>
<a href="admin/categories">Manage Categories</a>
<button on:click={() => modal_c = true} style="width:200px" class="button-1 contrast">Create category</button>
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
	<button class="btn-transparent" aria-busy={busy} disabled={busy} type="submit"
		>Submit Quote</button
	>
  </div>
</form>


<form on:submit={(e) => createCategory(e)} class={`${modal_c ? "modal" : "hide"}`}>
  <a href="#" on:click={() => modal_c = false} style="font-size:40px;text-decoration:none;position:absolute;right:20%;top:10%">&times;</a>
  <div style="width:50%">
	<input required  name="slug" type="text" placeholder="Slug" />
  <input required  name="title" type="text" placeholder="Title" />

	<button class="btn-transparent" aria-busy={busy} disabled={busy} type="submit"
		>Submit Quote</button
	>
  </div>
</form>


<style>
  .button-1{
    width:120px;
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
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(10px);
  }
  @media screen and (max-width:768px){
    .modal div{
      width:90% !important;
    }
  }
</style>