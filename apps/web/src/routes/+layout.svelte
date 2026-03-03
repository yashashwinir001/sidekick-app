<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import { onMount } from "svelte";

  let { data, children } = $props();
  const session = $derived(data?.session);

  let showDropdown = $state(false);
  let dropdownRef = $state<HTMLElement | null>(null);

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  // ✅ Fixed: directly hit the Auth.js signout endpoint instead of using signOut()
  async function handleLogout() {
    try {
      const res = await fetch('/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      // Whether it succeeds or fails, redirect to login
      window.location.href = '/login';
    } catch {
      window.location.href = '/login';
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      showDropdown = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

{#if session}
  <nav class="navbar">
    <div class="logo">⚡ Sidekick</div>

    <div class="profile" bind:this={dropdownRef}>
      <button class="profile-btn" onclick={(e) => { e.stopPropagation(); toggleDropdown(); }}>
        <div class="avatar">
          {#if session.user?.image}
            <img src={session.user.image} alt="avatar" class="avatar-img"/>
          {:else}
            {session.user?.name?.charAt(0) ?? 'U'}
          {/if}
        </div>
      </button>

      {#if showDropdown}
        <div
          class="dropdown"
          in:scale={{ duration: 150, start: 0.95 }}
          out:fade={{ duration: 100 }}
        >
          <div class="user-info">
            <div class="avatar big">
              {session.user?.name?.charAt(0) ?? 'U'}
            </div>
            <div class="user-text">
              <p class="name">{session.user?.name}</p>
              <p class="email">{session.user?.email}</p>
            </div>
          </div>

          <hr />

          <button class="logout" onclick={(e) => { e.stopPropagation(); handleLogout(); }}>
            ↩ Logout
          </button>
        </div>
      {/if}
    </div>
  </nav>
{/if}

{@render children()}

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 40px;
    background: rgba(7, 9, 15, 0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    color: white;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    font-weight: 800;
    font-size: 16px;
    background: linear-gradient(90deg, #6ee7fe, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.3px;
  }

  .profile { position: relative; }

  .profile-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6ee7fe, #a78bfa);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    color: #07090f;
    overflow: hidden;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .avatar.big {
    width: 44px;
    height: 44px;
    font-size: 18px;
    flex-shrink: 0;
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: 50px;
    width: 260px;
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
    color: #111;
    z-index: 200;
  }

  .user-info {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 12px;
  }

  .user-text { display: flex; flex-direction: column; min-width: 0; }

  .name {
    font-weight: 700;
    font-size: 14px;
    margin: 0 0 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .email {
    font-size: 12px;
    color: #666;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.08);
    margin: 0 0 12px;
  }

  .logout {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: #fee2e2;
    color: #dc2626;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .logout:hover { background: #fecaca; }
</style>