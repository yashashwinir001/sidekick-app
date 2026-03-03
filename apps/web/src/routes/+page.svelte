<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    const session = $page.data.session;
    goto(session ? '/dashboard' : '/login', { replaceState: true });
  });
</script>

<style>
.home {
  text-align: center;
  padding: 80px;
}
button {
  margin-top: 30px;
  padding: 14px 28px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(90deg, purple, hotpink);
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>