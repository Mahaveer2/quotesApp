<script>
  import Fuse from 'fuse.js';
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

  let _categories = categories;

  let search = (search) => {
		const options = {
			keys: ['title']
		};

		const fuse = new Fuse(categories, options);

		if (search == '') {
			_categories = categories;
      _categories = _categories;
		} else {
			let res = fuse.search(search);
      _categories = [];
      console.log(res)
			res.forEach((e) => {
				_categories.push(e.item);
				_categories = _categories;
			});
		}
	}; 
</script>

<h1>Manage Categories</h1>
<input type="text" on:keyup={(e) => search(e.target.value)} name="" placeholder="Search Categories">
<div class="grid-1">
{#each _categories as category }
  <div class="category" style="">
    <div>
    <strong>{category.title}</strong>
    </div>
    <button
    on:click={() => deleteQuote(category.id)}
    style="background:red;width:100px;outline:none;border:none;height:40px;display:flex;justify-content:Center;
  align-items:Center;">Delete</button
  >
  </div>
{/each}
</div>

<style>
  .category{
background-color: rgba(0,0,0,.3);
padding: 20px;
border: 1px solid #3c3c3c;
margin-bottom: 20px;
border-radius: 8px;
display: flex;
justify-content: space-between;
align-items: center;
  }
  .grid-1{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 20px;
  }
  @media screen and (max-width:768px){
    .grid-1{
    display: grid;
    grid-template-columns: repeat(1,1fr);
    gap: 0px;
  } 
  }
</style>