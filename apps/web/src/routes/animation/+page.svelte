<script lang="ts">
  import { goto } from '$app/navigation';
  import { Canvas } from '@threlte/core';
  import { T } from '@threlte/core';
  import { writable } from 'svelte/store';
  import { onDestroy } from 'svelte';

  const rotation = writable(0);
  const interval = setInterval(() => rotation.update(r => r + 0.012), 16);
  onDestroy(() => clearInterval(interval));
</script>

<svelte:head>
  <title>Sidekick — Animation</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</svelte:head>

<div class="shell">
  <div class="blob b1"/><div class="blob b2"/>

  <header class="topnav">
    <button class="back-btn" on:click={() => goto('/dashboard')}>← Dashboard</button>
    <div class="brand"><div class="brand-icon">⚡</div><span class="brand-name">Sidekick</span></div>
    <div class="live-badge">⚡ Live</div>
  </header>

  <main class="main">
    <div class="page-header">
      <h1 class="ptitle">✦ Animation</h1>
      <p class="psub">Interactive 3D scene · Threlte + Three.js · WebGL</p>
    </div>

    <div class="canvas-shell">
      <Canvas>
        <T.PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <T.AmbientLight intensity={1.5} />
        <T.DirectionalLight position={[3, 3, 3]} intensity={1} />
        <T.PointLight position={[-3, -2, 2]} color="#6ee7fe" intensity={3} />
        <T.PointLight position={[3, 2, -2]} color="#a78bfa" intensity={3} />

        <!-- Main rotating cube -->
        <T.Mesh rotation={[$rotation, $rotation * 0.7, 0]}>
          <T.BoxGeometry args={[1.6, 1.6, 1.6]} />
          <T.MeshStandardMaterial color="#6ee7fe" roughness={0.1} metalness={0.8} />
        </T.Mesh>

        <!-- Orbiting sphere -->
        <T.Mesh position={[Math.sin($rotation * 2) * 2.8, Math.cos($rotation * 2) * 1.4, 0]}>
          <T.SphereGeometry args={[0.35, 32, 32]} />
          <T.MeshStandardMaterial color="#a78bfa" roughness={0.2} metalness={0.6} />
        </T.Mesh>

        <!-- Particle ring -->
        {#each Array(8) as _, i}
          <T.Mesh position={[
            Math.sin(($rotation + i * Math.PI / 4)) * 3.5,
            Math.cos(($rotation * 0.4 + i * Math.PI / 4)) * 0.6,
            Math.cos(($rotation + i * Math.PI / 4)) * 3.5
          ]}>
            <T.SphereGeometry args={[0.09, 8, 8]} />
            <T.MeshStandardMaterial color="#34d399" />
          </T.Mesh>
        {/each}
      </Canvas>
    </div>

    <div class="info-row">
      <div class="info-chip">Three.js r128</div>
      <div class="info-chip">Threlte 7</div>
      <div class="info-chip">WebGL</div>
      <div class="info-chip">60fps target</div>
    </div>
  </main>
</div>

<style>
  :global(body){margin:0;background:#07090f;font-family:'DM Sans',sans-serif;}
  :global(*){box-sizing:border-box;}
  .shell{min-height:100vh;color:#e8eeff;position:relative;overflow:hidden;display:flex;flex-direction:column;}
  .blob{position:fixed;border-radius:50%;filter:blur(100px);opacity:0.11;pointer-events:none;}
  .b1{width:500px;height:500px;background:radial-gradient(#a78bfa,transparent 70%);top:-150px;right:-100px;}
  .b2{width:400px;height:400px;background:radial-gradient(#6ee7fe,transparent 70%);bottom:-100px;left:-50px;}

  .topnav{display:flex;align-items:center;justify-content:space-between;padding:20px 48px;border-bottom:1px solid rgba(255,255,255,0.05);position:relative;z-index:10;}
  .back-btn{all:unset;font-size:13px;color:#4a5578;cursor:pointer;padding:7px 14px;border-radius:9px;border:1px solid rgba(255,255,255,0.06);transition:all 0.2s;}
  .back-btn:hover{color:#6ee7fe;border-color:rgba(110,231,254,0.2);}
  .brand{display:flex;align-items:center;gap:9px;}
  .brand-icon{width:30px;height:30px;background:linear-gradient(135deg,#6ee7fe,#a78bfa);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}
  .brand-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;background:linear-gradient(90deg,#6ee7fe,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .live-badge{display:flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.2);border-radius:20px;font-size:12px;color:#34d399;}
  .live-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:#34d399;animation:pulse 1.5s ease infinite;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}

  .main{flex:1;max-width:900px;margin:0 auto;padding:40px 48px;width:100%;position:relative;z-index:1;}
  .page-header{margin-bottom:24px;}
  .ptitle{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin:0 0 6px;}
  .psub{font-size:13px;color:#4a5578;margin:0;}

  .canvas-shell{height:500px;background:radial-gradient(ellipse at center,#0d1424 0%,#07090f 100%);border-radius:18px;border:1px solid rgba(110,231,254,0.1);overflow:hidden;box-shadow:0 0 80px rgba(110,231,254,0.04);}

  .info-row{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;}
  .info-chip{padding:5px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:7px;font-size:12px;color:#4a5578;}
</style>