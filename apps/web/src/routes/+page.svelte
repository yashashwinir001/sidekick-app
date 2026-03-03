<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(() => {
    const session = $page.data.session;
    goto(session ? '/dashboard' : '/login', { replaceState: true });
  });
</script>