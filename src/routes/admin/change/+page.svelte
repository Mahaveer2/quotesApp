<script>
  import z from 'zxcvbn'
  let p = ''
  $: s = z(p).score > 3

  const handle = async(e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    form.append('token',localStorage.getItem('token'));

    let res = await fetch("/api/changeadmin",{
      method:"POST",
      body:form
    });
    let json = await res.json();

    if(json.status == 200){
      alert(json.msg)
      e.target.reset();
    }else{
      alert(json.msg)
    }
  }
</script>


<h1>Change Email and Password</h1>

<form on:submit={e => handle(e)}>
  <input type="email" required name="email" placeholder="Email">
  <input type="email" required name="newemail" placeholder="New Email">
  <input type="password" required name="old" placeholder="Old Password">
  <input bind:value={p} type="password" required name="password" placeholder="Password">
  <p style={s||'color:red'}>
    {s ? 'Strong' : 'Weak'} password
  </p>
  <button class="contrast">Submit</button>
</form>