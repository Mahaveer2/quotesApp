<script>
  export let data;
  const { categories } = data;
  import { goto } from "$app/navigation";

  const deleteQuote = async(id) => {
    let res = confirm("Are you sure you want to delete?");
    if(res){
      const formData = new FormData();
      formData.append('token',localStorage.getItem("admin"))
      formData.append('id',id);
      const response = await fetch("/api/delete_category", {
        
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			body: formData
		});
    goto("../")
    }
  }
</script>

{#each categories as category }
  <div class="category" style="">
    <strong>{category.title}</strong>s
    <button
    on:click={() => deleteQuote(category.id)}
    style="background:red;width:100px;outline:none;border:none;height:40px;display:flex;justify-content:Center;
  align-items:Center;">Delete</button
  >
  </div>
{/each}

<style>
  .category{
background-color: rgba(0,0,0,.3);
padding: 20px;
margin-bottom: 20px;
  }
</style>