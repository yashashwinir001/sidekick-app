<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <title>Sidekick — Resume</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
</svelte:head>

<div class="shell">
  <div class="blob b1"></div>
  <div class="blob b2"></div>

  <header class="topnav">
    <button class="back-btn" onclick={() => goto('/dashboard')}>← Dashboard</button>
    <div class="brand"><div class="brand-icon">⚡</div><span class="brand-name">Sidekick</span></div>
    <a href="/YashashwiniR-CV.pdf" download class="dl-btn">↓ Download PDF</a>
  </header>

  <main class="main">

    <!-- Header -->
    <div class="r-header">
      <div class="r-avatar">Y</div>
      <div class="r-header-info">
        <h1 class="r-name">Yashashwini R</h1>
        <p class="r-title">Aspiring AI/ML Engineer · Computer Science</p>
        <div class="r-contact">
          <span>📍 Bangalore, India</span>
          <span>📞 6360038923</span>
          <span>✉️ yashashwini.1743@gmail.com</span>
        </div>
      </div>
    </div>

    <!-- Objective -->
    <div class="r-about">
      Aspiring Computer Science Engineer with a strong focus on AI and Machine Learning. Final year student with hands-on experience in developing smart and innovative solutions. Passionate about problem solving, exploring emerging technologies, and applying AI/ML concepts to real-world challenges.
    </div>

    <div class="r-grid">
      <div class="r-left">

        <!-- Projects -->
        <section class="r-section">
          <h3 class="s-title">Projects</h3>

          <div class="job-card">
            <div class="job-top">
              <span class="job-role">Breast Cancer Detection</span>
              <span class="job-badge">97% accuracy</span>
            </div>
            <p class="job-desc">Developed a machine learning model to predict early-stage breast cancer using clinical diagnostic data. Optimized an SVM classifier with effective feature selection for binary classification of malignant vs benign tumors.</p>
          </div>

          <div class="job-card">
            <div class="job-top">
              <span class="job-role">Sign Language Detection</span>
              <span class="job-badge">93% accuracy</span>
            </div>
            <p class="job-desc">AI-based sign language detection system translating hand gestures to text for individuals with hearing or speech impairments. Implemented real-time video gesture recognition using deep learning models.</p>
          </div>

          <div class="job-card">
            <div class="job-top">
              <span class="job-role">IoT-Driven Health Surveillance Platform</span>
            </div>
            <p class="job-desc">Designed an IoT-driven robotic health monitoring system with real-time sensor data acquisition and cloud-based analytics for continuous patient monitoring. Enhanced reliability through automated alerts and intelligent data handling.</p>
          </div>
        </section>

        <!-- Achievements -->
        <section class="r-section">
          <h3 class="s-title">Achievements</h3>
          <div class="job-card">
            <div class="job-top">
              <span class="job-role">24-Hour Hackathon</span>
            </div>
            <p class="job-desc">Developed an AI/ML-based solution addressing social and health challenges — improving equal access to quality healthcare and essential medical services. Collaborated with a team to present a functional prototype.</p>
          </div>
        </section>

      </div>

      <div class="r-right">

        <!-- Skills -->
        <section class="r-section">
          <h3 class="s-title">Skills</h3>
          <div class="skill-group">
            <span class="skill-category">Languages</span>
            <div class="skills-wrap">
              <span class="skill-tag">Python</span>
              <span class="skill-tag">C</span>
            </div>
          </div>
          <div class="skill-group">
            <span class="skill-category">Web</span>
            <div class="skills-wrap">
              <span class="skill-tag">HTML</span>
              <span class="skill-tag">CSS</span>
            </div>
          </div>
          <div class="skill-group">
            <span class="skill-category">Database</span>
            <div class="skills-wrap">
              <span class="skill-tag">SQL</span>
              <span class="skill-tag">MongoDB</span>
            </div>
          </div>
          <div class="skill-group">
            <span class="skill-category">Specialization</span>
            <div class="skills-wrap">
              <span class="skill-tag">Data Science</span>
              <span class="skill-tag">Machine Learning</span>
              <span class="skill-tag">AI</span>
            </div>
          </div>
        </section>

        <!-- Education -->
        <section class="r-section">
          <h3 class="s-title">Education</h3>

          <div class="edu-card">
            <span class="edu-degree">B.E. Computer Science (AI & ML)</span>
            <span class="edu-school">Global Academy of Technology</span>
            <div class="edu-meta">
              <span>2022 – 2026</span>
              <span class="edu-badge">CGPA 8.09</span>
            </div>
          </div>

          <div class="edu-card">
            <span class="edu-degree">Science - PCMB</span>
            <span class="edu-school">Soundarya Composite Pre-University</span>
            <div class="edu-meta">
              <span>2020 – 2022</span>
              <span class="edu-badge">85.83%</span>
            </div>
          </div>

          <div class="edu-card">
            <span class="edu-degree">State Board</span>
            <span class="edu-school">Soundarya School</span>
            <div class="edu-meta">
              <span>2019 – 2020</span>
              <span class="edu-badge">94.08%</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  </main>
</div>

<style>
  :global(body){margin:0;background:#07090f;font-family:'DM Sans',sans-serif;}
  :global(*){box-sizing:border-box;}
  .shell{min-height:100vh;color:#e8eeff;position:relative;overflow:hidden;}
  .blob{position:fixed;border-radius:50%;filter:blur(100px);opacity:0.11;pointer-events:none;}
  .b1{width:500px;height:500px;background:radial-gradient(#6ee7fe,transparent 70%);top:-150px;left:-100px;}
  .b2{width:400px;height:400px;background:radial-gradient(#a78bfa,transparent 70%);bottom:-100px;right:-50px;}

  .topnav{display:flex;align-items:center;justify-content:space-between;padding:20px 48px;border-bottom:1px solid rgba(255,255,255,0.05);position:relative;z-index:10;}
  .back-btn{all:unset;font-size:13px;color:#4a5578;cursor:pointer;padding:7px 14px;border-radius:9px;border:1px solid rgba(255,255,255,0.06);transition:all 0.2s;}
  .back-btn:hover{color:#6ee7fe;border-color:rgba(110,231,254,0.2);}
  .brand{display:flex;align-items:center;gap:9px;}
  .brand-icon{width:30px;height:30px;background:linear-gradient(135deg,#6ee7fe,#a78bfa);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;}
  .brand-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;background:linear-gradient(90deg,#6ee7fe,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .dl-btn{padding:7px 16px;background:rgba(110,231,254,0.07);border:1px solid rgba(110,231,254,0.18);border-radius:9px;color:#6ee7fe;font-size:13px;text-decoration:none;transition:all 0.2s;}
  .dl-btn:hover{background:rgba(110,231,254,0.14);}

  .main{max-width:920px;margin:0 auto;padding:40px 48px;position:relative;z-index:1;}

  /* Header */
  .r-header{display:flex;align-items:center;gap:20px;margin-bottom:20px;}
  .r-avatar{width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#6ee7fe,#a78bfa);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:28px;font-weight:800;color:#07090f;flex-shrink:0;}
  .r-header-info{display:flex;flex-direction:column;gap:6px;}
  .r-name{font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin:0;}
  .r-title{font-size:13px;color:#6ee7fe;margin:0;}
  .r-contact{display:flex;gap:16px;flex-wrap:wrap;margin-top:2px;}
  .r-contact span{font-size:12px;color:#4a5578;}

  .r-about{font-size:13px;color:#6e84a8;line-height:1.75;padding:16px 20px;background:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(255,255,255,0.05);margin-bottom:32px;}

  .r-grid{display:grid;grid-template-columns:1fr 300px;gap:28px;}
  .r-right{display:flex;flex-direction:column;gap:24px;}

  .r-section{margin-bottom:24px;}
  .s-title{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#4a5578;margin:0 0 14px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.05);}

  .job-card{padding:16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;margin-bottom:10px;transition:border-color 0.2s;}
  .job-card:hover{border-color:rgba(110,231,254,0.15);}
  .job-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:12px;}
  .job-role{font-size:14px;font-weight:600;color:#c8d4f0;}
  .job-badge{font-size:11px;padding:3px 9px;background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.25);border-radius:6px;color:#34d399;white-space:nowrap;flex-shrink:0;}
  .job-desc{font-size:13px;color:#6e84a8;margin:0;line-height:1.65;}

  .skill-group{margin-bottom:12px;}
  .skill-category{font-size:11px;color:#4a5578;letter-spacing:0.05em;text-transform:uppercase;display:block;margin-bottom:6px;}
  .skills-wrap{display:flex;flex-wrap:wrap;gap:6px;}
  .skill-tag{padding:4px 11px;background:rgba(167,139,250,0.08);border:1px solid rgba(167,139,250,0.2);border-radius:6px;font-size:12px;color:#a78bfa;}

  .edu-card{padding:14px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;margin-bottom:10px;transition:border-color 0.2s;}
  .edu-card:hover{border-color:rgba(110,231,254,0.15);}
  .edu-degree{display:block;font-size:13px;font-weight:600;color:#c8d4f0;margin-bottom:3px;}
  .edu-school{display:block;font-size:12px;color:#6ee7fe;margin-bottom:8px;}
  .edu-meta{display:flex;justify-content:space-between;align-items:center;}
  .edu-meta span{font-size:11px;color:#4a5578;}
  .edu-badge{padding:2px 8px;background:rgba(110,231,254,0.08);border:1px solid rgba(110,231,254,0.2);border-radius:5px;color:#6ee7fe !important;font-size:11px;}

  @media(max-width:700px){.r-grid{grid-template-columns:1fr;}.main{padding:24px;}.topnav{padding:16px 24px;}.r-contact{gap:10px;}}
</style>