<script>
  import { adminState } from "$lib/stores";
	import { onMount } from "svelte";
  let busy = false;

  const checkAdmin = async () => {
    busy = true;
    let formData = new FormData();
    formData.append("token",localStorage.getItem("admin"))
    let res = await fetch("/api/authorize",{
      method:"POST",
      body:formData,
    });
    let json = await res.json();
    busy = false;
    adminState.set({
        email:json.email,
        isAuthenticated:true,
        token:localStorage.getItem("admin"),
    })
  }
  onMount(async () => {
    checkAdmin();
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    busy = true;
    const formData = new FormData(e.target);
    let res = await fetch("/api/admin",{
      method:"POST",
      body:formData,
    });
    let json = await res.json();

    if(json.status == 200){
      alert("Welcome admin")
      localStorage.setItem("admin",json.token);
      adminState.set({
        email:json.email,
        isAuthenticated:true,
        token:json.token
      })
    }else{
      alert("Invalid credentials")
    }
  }
</script>
<div aria-busy={busy} style="width:100%;">

{#if $adminState.isAuthenticated}
  
<slot>
</slot>
{:else}
<form style="margin-top:60px" on:submit={(e) => handleSubmit(e)}>
  <h1>Login </h1>
  <input required name="email" type="email" placeholder="Email"/>
  <input required name='password' type="password" placeholder="Password"/>
  <button class="contrast">Login in</button>
</form>
{/if}
</div>