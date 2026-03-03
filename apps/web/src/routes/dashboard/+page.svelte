<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  $: session = $page.data.session;

  const cards = [
    {
      id: 'resume',
      icon: '📄',
      label: 'Resume',
      desc: 'Your story, skills & experience — beautifully laid out.',
      accent: '#6ee7fe',
      link: '/resume',
      tag: 'MDX powered'
    },
    {
      id: 'animation',
      icon: '✦',
      label: 'Animation',
      desc: 'An interactive 3D scene built with Threlte & Three.js.',
      accent: '#a78bfa',
      link: '/animation',
      tag: 'WebGL · 60fps'
    },
    {
      id: 'graph',
      icon: '⬡',
      label: 'Graph Editor',
      desc: 'Visual workflow builder powered by SvelteFlow.',
      accent: '#34d399',
      link: '/graph',
      tag: 'SvelteFlow'
    },
  ];
</script>

<svelte:head>
  <title>Sidekick — Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</svelte:head>

<div class="shell">
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>

  <header class="topnav">
    <div class="brand">
      <div class="brand-icon">⚡</div>
      <span class="brand-name">Sidekick</span>
    </div>
    <div class="nav-right">
      <div class="user-chip">
        {#if session?.user?.image}
          <img src={session.user.image} alt="avatar" class="avatar"/>
        {:else}
          <div class="avatar-fb">{(session?.user?.name ?? 'U')[0]}</div>
        {/if}
        <span class="uname">{session?.user?.name ?? 'User'}</span>
      </div>
    </div>
  </header>

  <main class="main">
    <!-- Greeting — small and subtle, not a big hero -->
    <div class="greeting">
      <span class="greeting-dot"></span>
      Good to see you, <strong>{session?.user?.name?.split(' ')[0] ?? 'there'}</strong>
    </div>

    <div class="cards">
      {#each cards as card, i}
        <button
          class="card"
          style="--accent: {card.accent}; animation-delay: {i * 0.08}s"
          onclick={() => goto(card.link)}
        >
          <div class="card-top">
            <span class="card-icon" style="background:{card.accent}18;color:{card.accent}">{card.icon}</span>
            <span class="card-tag">{card.tag}</span>
          </div>
          <h2 class="card-label">{card.label}</h2>
          <p class="card-desc">{card.desc}</p>
          <div class="card-arrow">Open →</div>
          <div class="card-glow"></div>
        </button>
      {/each}
    </div>
  </main>
</div>

<style>
  :global(body){margin:0;background:#07090f;font-family:'DM Sans',sans-serif;}
  :global(*){box-sizing:border-box;}

  .shell{min-height:100vh;color:#e8eeff;position:relative;overflow:hidden;display:flex;flex-direction:column;}

  .blob{position:fixed;border-radius:50%;filter:blur(100px);opacity:0.11;pointer-events:none;}
  .b1{width:600px;height:600px;background:radial-gradient(#6ee7fe,transparent 70%);top:-200px;left:-100px;}
  .b2{width:500px;height:500px;background:radial-gradient(#a78bfa,transparent 70%);bottom:-150px;right:-50px;}
  .b3{width:300px;height:300px;background:radial-gradient(#34d399,transparent 70%);top:50%;left:40%;}

  .topnav{display:flex;align-items:center;justify-content:space-between;padding:20px 48px;border-bottom:1px solid rgba(255,255,255,0.05);position:relative;z-index:10;backdrop-filter:blur(20px);}
  .brand{display:flex;align-items:center;gap:10px;}
  .brand-icon{width:34px;height:34px;background:linear-gradient(135deg,#6ee7fe,#a78bfa);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;}
  .brand-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;background:linear-gradient(90deg,#6ee7fe,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .nav-right{display:flex;align-items:center;gap:12px;}
  .user-chip{display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:20px;}
  .avatar{width:24px;height:24px;border-radius:50%;object-fit:cover;}
  .avatar-fb{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#6ee7fe,#a78bfa);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#07090f;}
  .uname{font-size:13px;font-weight:500;}

  .main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px;position:relative;z-index:1;gap:32px;}

  /* Small subtle greeting instead of big hero */
  .greeting{display:flex;align-items:center;gap:8px;font-size:14px;color:#4a5578;align-self:flex-start;margin-left:calc(50% - 450px + 0px);}
  .greeting strong{color:#9ba8c8;}
  .greeting-dot{width:7px;height:7px;border-radius:50%;background:#34d399;box-shadow:0 0 8px #34d399;flex-shrink:0;}

  .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;width:100%;max-width:900px;}

  .card{all:unset;position:relative;padding:28px 24px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:18px;cursor:pointer;text-align:left;transition:transform 0.22s,border-color 0.22s,box-shadow 0.22s;animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;overflow:hidden;}
  .card:hover{transform:translateY(-6px);border-color:var(--accent);box-shadow:0 20px 60px rgba(0,0,0,0.3);}
  .card:hover .card-glow{opacity:1;}
  .card:hover .card-arrow{color:var(--accent);transform:translateX(4px);}
  .card-glow{position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,var(--accent),transparent 60%);opacity:0;transition:opacity 0.3s;pointer-events:none;}
  .card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
  .card-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
  .card-tag{font-size:11px;color:#4a5578;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);padding:4px 10px;border-radius:6px;}
  .card-label{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;margin:0 0 10px;}
  .card-desc{font-size:13px;color:#6e84a8;line-height:1.6;margin:0 0 24px;}
  .card-arrow{font-size:13px;color:#4a5578;font-weight:500;transition:all 0.2s;}

  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @media(max-width:700px){.cards{grid-template-columns:1fr;}.main{padding:24px;}.topnav{padding:16px 24px;}.greeting{margin-left:0;}}
</style>