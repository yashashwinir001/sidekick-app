<script lang="ts">
  import { goto } from "$app/navigation";

  let name = "";
  let email = "";
  let password = "";

  async function handleSignup() {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });

    if (res.ok) {
      goto("/login");
    }
  }
</script>

<input bind:value={name} placeholder="Name" />
<input bind:value={email} placeholder="Email" />
<input bind:value={password} type="password" placeholder="Password" />

<button on:click={handleSignup}>Create Account</button>