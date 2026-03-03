<script lang="ts">
  import { enhance } from '$app/forms';
  import { signIn } from '@auth/sveltekit/client';

  // ✅ Use $page to read server action errors
  import { page } from '$app/stores';

  let loading = false;
  let githubLoading = false;

  function handleGitHub() {
    githubLoading = true;
    signIn('github', { callbackUrl: '/dashboard' });
  }

  // Tab state
  let activeTab: 'signin' | 'signup' = 'signin';
</script>

<svelte:head>
  <title>Sidekick — Sign In</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</svelte:head>

<div class="root">
  <div class="blob blob-1"></div> 
  <div class="blob blob-2" ></div>
  <div class="blob blob-3" ></div>/

  <div class="card">
    <!-- Brand -->
    <div class="brand">
      <div class="brand-icon">⚡</div>
      <span class="brand-name">Sidekick</span>
    </div>

    <h1>Welcome back</h1>
    <p class="subtitle">Sign in to launch your Sidekick</p>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab" class:active={activeTab === 'signin'} on:click={() => activeTab = 'signin'}>
        Sign In
      </button>
      <button class="tab" class:active={activeTab === 'signup'} on:click={() => activeTab = 'signup'}>
        Create Account
      </button>
    </div>

    <!-- GitHub -->
    <button class="btn-github" on:click={handleGitHub} disabled={githubLoading}>
      <svg viewBox="0 0 24 24" class="gh-icon" fill="white">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
      {githubLoading ? 'Redirecting…' : (activeTab === 'signin' ? 'Continue with GitHub' : 'Sign up with GitHub')}
    </button>

    <div class="divider"><span>or</span></div>

    <!-- Error from server -->
    {#if $page.form?.message}
      <div class="error-banner">{$page.form.message}</div>
    {/if}

    <!-- ✅ use:enhance for progressive enhancement + loading state -->
    <form method="POST" use:enhance={() => {
      loading = true;
      return async ({ update }) => {
        loading = false;
        await update();
      };
    }}>
      {#if activeTab === 'signup'}
        <div class="field">
          <label for="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your name" required />
        </div>
      {/if}

      <div class="field">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" placeholder="••••••••" required />
      </div>

      {#if activeTab === 'signin'}
        <a href="/forgot-password" class="forgot">Forgot password?</a>
      {/if}

      <button type="submit" class="btn-primary" disabled={loading}>
        {#if loading}
          <span class="spinner" ></span>
        {:else}
          {activeTab === 'signin' ? 'Launch Sidekick →' : 'Create Account →'}
        {/if}
      </button>
    </form>

    <p class="footer-text">
      {#if activeTab === 'signin'}
        No account? <button class="link-btn" on:click={() => activeTab = 'signup'}>Create one free</button>
      {:else}
        Already have an account? <button class="link-btn" on:click={() => activeTab = 'signin'}>Sign in</button>
      {/if}
    </p>
  </div>
</div>

<style>
  :global(body) { margin: 0; background: #080b12; }

  .root {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #080b12;
    position: relative;
    overflow: hidden;
  }

  /* Grid */
  .root::before {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  /* Blobs */
  .blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.18;
    pointer-events: none;
    animation: drift 12s ease-in-out infinite alternate;
  }
  .blob-1 { width:500px;height:500px;background:radial-gradient(circle,#6ee7fe,transparent 70%);top:-120px;left:-100px; }
  .blob-2 { width:420px;height:420px;background:radial-gradient(circle,#a78bfa,transparent 70%);bottom:-100px;right:-80px;animation-delay:-5s; }
  .blob-3 { width:260px;height:260px;background:radial-gradient(circle,#34d399,transparent 70%);bottom:30%;left:10%;animation-delay:-9s; }
  @keyframes drift {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(30px,20px) scale(1.05); }
  }

  .card {
    position: relative; z-index: 1;
    background: #0e1420;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 44px 40px;
    width: 100%; max-width: 420px;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    animation: slideUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
    color: #f0f4ff;
  }
  @keyframes slideUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .brand { display:flex; align-items:center; gap:10px; margin-bottom:24px; }
  .brand-icon { width:36px;height:36px;background:linear-gradient(135deg,#6ee7fe,#a78bfa);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px; }
  .brand-name { font-family:'Syne',sans-serif;font-size:20px;font-weight:800;background:linear-gradient(90deg,#6ee7fe,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent; }

  h1 { font-family:'Syne',sans-serif;font-size:26px;font-weight:700;margin-bottom:4px; }
  .subtitle { font-size:14px;color:#5a6480;margin-bottom:24px; }

  .tabs { display:flex;background:#131926;border-radius:10px;padding:4px;margin-bottom:22px;border:1px solid rgba(255,255,255,0.07); }
  .tab { flex:1;padding:8px;border:none;background:transparent;color:#5a6480;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;border-radius:7px;cursor:pointer;transition:all 0.2s; }
  .tab.active { background:#0e1420;color:#f0f4ff;box-shadow:0 1px 6px rgba(0,0,0,0.4); }

  .btn-github { width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:11px 16px;background:#161b22;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#f0f4ff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;margin-bottom:18px; }
  .btn-github:hover { background:#1c2330;border-color:rgba(255,255,255,0.18);transform:translateY(-1px); }
  .btn-github:disabled { opacity:0.6;cursor:not-allowed;transform:none; }
  .gh-icon { width:18px;height:18px;flex-shrink:0; }

  .divider { display:flex;align-items:center;gap:12px;margin-bottom:18px;color:#5a6480;font-size:12px;text-transform:uppercase;letter-spacing:0.05em; }
  .divider::before,.divider::after { content:'';flex:1;height:1px;background:rgba(255,255,255,0.07); }

  .error-banner { background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:10px;padding:10px 14px;font-size:13px;color:#f87171;margin-bottom:14px; }

  .field { margin-bottom:14px; }
  label { display:block;font-size:11px;font-weight:500;color:#5a6480;margin-bottom:6px;letter-spacing:0.05em;text-transform:uppercase; }
  input { width:100%;padding:11px 14px;background:#131926;border:1px solid rgba(255,255,255,0.07);border-radius:10px;color:#f0f4ff;font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s,box-shadow 0.2s;box-sizing:border-box; }
  input::placeholder { color:#5a6480; }
  input:focus { border-color:rgba(110,231,254,0.4);box-shadow:0 0 0 3px rgba(110,231,254,0.08); }

  .forgot { display:block;text-align:right;font-size:12px;color:#5a6480;text-decoration:none;margin-top:-6px;margin-bottom:18px; }
  .forgot:hover { color:#6ee7fe; }

  .btn-primary { width:100%;padding:12px;background:linear-gradient(135deg,#6ee7fe,#a78bfa);border:none;border-radius:10px;color:#080b12;font-family:'Syne',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;min-height:46px;margin-top:4px; }
  .btn-primary:hover { transform:translateY(-1px);box-shadow:0 6px 24px rgba(110,231,254,0.25); }
  .btn-primary:disabled { opacity:0.7;cursor:not-allowed;transform:none; }

  .spinner { width:18px;height:18px;border:2px solid rgba(8,11,18,0.3);border-top-color:#080b12;border-radius:50%;animation:spin 0.7s linear infinite; }
  @keyframes spin { to { transform:rotate(360deg); } }

  .footer-text { text-align:center;font-size:13px;color:#5a6480;margin-top:18px; }
  .link-btn { background:none;border:none;color:#6ee7fe;font-size:13px;font-weight:500;cursor:pointer;padding:0;font-family:'DM Sans',sans-serif; }
  .link-btn:hover { text-decoration:underline; }
</style>