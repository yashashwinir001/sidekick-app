<script lang="ts">
  import { goto } from '$app/navigation';
  import { SvelteFlow, Background, Controls, MiniMap } from '@xyflow/svelte';
  import '@xyflow/svelte/dist/style.css';
  

  // ✅ Must be writable stores
  const nodes =[
    { id: '1', position: { x: 80,  y: 200 }, data: { label: '🔐 Auth'          }, type: 'input'   },
    { id: '2', position: { x: 280, y: 100 }, data: { label: '⚡ Sidekick Core'  }, type: 'default' },
    { id: '3', position: { x: 280, y: 300 }, data: { label: '🗄️ NeonDB'         }, type: 'default' },
    { id: '4', position: { x: 500, y: 80  }, data: { label: '📄 Resume'         }, type: 'default' },
    { id: '5', position: { x: 500, y: 200 }, data: { label: '✦ Animation'      }, type: 'default' },
    { id: '6', position: { x: 500, y: 320 }, data: { label: '⬡ Graph'          }, type: 'default' },
    { id: '7', position: { x: 720, y: 200 }, data: { label: '🚀 Output'         }, type: 'output'  },
  ];

  const edges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e2-5', source: '2', target: '5' },
    { id: 'e2-6', source: '2', target: '6' },
    { id: 'e4-7', source: '4', target: '7' },
    { id: 'e5-7', source: '5', target: '7' },
    { id: 'e6-7', source: '6', target: '7' },
  ];
</script>

<svelte:head>
  <title>Sidekick — Graph</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</svelte:head>

<div class="shell">
  <div class="blob b1"></div><div class="blob b2"></div>

  <header class="topnav">
    <button class="back-btn" on:click={() => goto('/dashboard')}>← Dashboard</button>
    <div class="brand"><div class="brand-icon">⚡</div><span class="brand-name">Sidekick</span></div>
    <div class="hint">Drag · Scroll to zoom · Connect nodes</div>
  </header>

  <main class="main">
    <div class="page-header">
      <h1 class="ptitle">⬡ Graph Editor</h1>
      <p class="psub">Visual workflow builder · SvelteFlow · Drag & drop</p>
    </div>

    <div class="flow-shell">
      <SvelteFlow {nodes} {edges} fitView colorMode="dark">
        <Background gap={28}/>
        <Controls />
        <MiniMap />
      </SvelteFlow>
    </div>
  </main>
</div>

<style>
  :global(body){margin:0;background:#07090f;font-family:'DM Sans',sans-serif;}
  :global(*){box-sizing:border-box;}
  .shell{height:100vh;color:#e8eeff;position:relative;overflow:hidden;display:flex;flex-direction:column;}
  .blob{position:fixed;border-radius:50%;filter:blur(100px);opacity:0.11;pointer-events:none;}
  .b1{width:500px;height:500px;background:radial-gradient(#34d399,transparent 70%);top:-150px;right:-100px;}
  .b2{width:400px;height:400px;background:radial-gradient(#6ee7fe,transparent 70%);bottom:-100px;left:-50px;}

  .topnav{display:flex;align-items:center;justify-content:space-between;padding:20px 48px;border-bottom:1px solid rgba(255,255,255,0.05);flex-shrink:0;position:relative;z-index:10;}
  .back-btn{all:unset;font-size:13px;color:#4a5578;cursor:pointer;padding:7px 14px;border-radius:9px;border:1px solid rgba(255,255,255,0.06);transition:all 0.2s;}
  .back-btn:hover{color:#6ee7fe;border-color:rgba(110,231,254,0.2);}
  .brand{display:flex;align-items:center;gap:9px;}
  .brand-icon{width:30px;height:30px;background:linear-gradient(135deg,#6ee7fe,#a78bfa);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}
  .brand-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;background:linear-gradient(90deg,#6ee7fe,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .hint{font-size:12px;color:#4a5578;}

  .main{flex:1;display:flex;flex-direction:column;padding:28px 48px;position:relative;z-index:1;overflow:hidden;}
  .page-header{margin-bottom:16px;flex-shrink:0;}
  .ptitle{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin:0 0 6px;}
  .psub{font-size:13px;color:#4a5578;margin:0;}

  .flow-shell{flex:1;border-radius:16px;border:1px solid rgba(255,255,255,0.07);overflow:hidden;}

  :global(.svelte-flow){background:#090d16 !important;}
  :global(.svelte-flow__node){background:#0e1420 !important;border:1px solid rgba(110,231,254,0.18) !important;color:#e8eeff !important;border-radius:10px !important;font-family:'DM Sans',sans-serif !important;font-size:13px !important;}
  :global(.svelte-flow__node:hover){border-color:rgba(110,231,254,0.45) !important;box-shadow:0 0 20px rgba(110,231,254,0.08) !important;}
  :global(.svelte-flow__edge-path){stroke:#6ee7fe !important;stroke-width:1.5px !important;opacity:0.6;}
  :global(.svelte-flow__controls){background:#0e1420 !important;border:1px solid rgba(255,255,255,0.07) !important;border-radius:10px !important;}
  :global(.svelte-flow__controls button){background:transparent !important;color:#6e84a8 !important;border-bottom:1px solid rgba(255,255,255,0.05) !important;}
  :global(.svelte-flow__minimap){background:#0e1420 !important;border:1px solid rgba(255,255,255,0.07) !important;border-radius:10px !important;}
</style>
