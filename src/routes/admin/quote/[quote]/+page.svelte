<script>
	import { onMount } from "svelte";
  let token = "";
  let loading = false;
  import { goto } from '$app/navigation';

  export let data;
  let { id,email,views,quote,name,category,description,Author,activated }= data.quote;
  const {categories} = data;
	let selectedCategory = data.quote.category[0];


  async function postData(formData) {
		// Default options are marked with *
    loading = true;
		const response = await fetch("/api/update_quote", {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
		let json = await response.json();
    console.log(json)
    loading = false;
	}

  const deleteQuote = async () => {
    let res = confirm("Are you sure you want to delete?");
    if(res){
      const formData = new FormData();
      formData.append('token',localStorage.getItem("admin"))
      formData.append('id',id);
      const response = await fetch("/api/delete_quote", {
        
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
    goto("../")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append("activated",activated)
    postData(form);
  }

  onMount(() => {
    token = localStorage.getItem("admin");
  })
</script>

<a href="../../admin" style="position:absolute;height:20px"
	><svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		style="width:25px;margin-bottom:50px"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
	</svg>
</a>

<form on:submit={(e) => handleSubmit(e)} style="height:900px !important;padding-top:60px">
	<p>{views} views</p>
	<input required type="text" name="author" bind:value={Author} placeholder="Author" />
	<input type="hidden" name="id" value={id} />
	<input type="email" name="email" bind:value={email} placeholder="Email" />
	<input type="text" name="name" bind:value={name} placeholder="Name" />
	<input type="hidden" name="token" value={token} />
	<textarea required name="quote" bind:value={quote} placeholder="Quote" />
	<textarea
		required
		type="text"
		name="description"
		bind:value={description}
		placeholder="Description"
	/>
	<select name="categoryid">
		<option value={selectedCategory.id}>{selectedCategory.title}</option>
		{#each categories as category}
			{#if category.id != selectedCategory.id}
			<option value={category.id}>{category.title}</option>
			{/if}
		{/each}
	</select>
	<div style="display:flex;justify-content:space-between;width:100%">
		<div style="flex:10;flex;">
			<strong style='margin-right:20px'>Activated:</strong>
			<label class="switch">
				<input
				checked={activated}
				on:change={() => (activated = !activated)}
				style="margin-left:15px"
				type="checkbox"
			/>
				<span class="slider round"></span>
			</label>
		</div>
		<button aria-busy={loading} type="submit" style="flex:1" class="contrast">Submit</button>
	</div>
</form>
<button
	on:click={() => deleteQuote()}
	style="background:red;width:100px;outline:none;border:none;height:40px;display:flex;justify-content:Center;
align-items:Center;position:absolute;top:10%;right:0%">Delete</button
>

<style>
	/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--primary);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
