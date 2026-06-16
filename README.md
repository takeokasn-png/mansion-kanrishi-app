[index.html](https://github.com/user-attachments/files/28981366/index.html)
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="管理士試験">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon.svg">
<title>マンション管理士 一問一答</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
:root{
  --primary:#1a237e;--accent:#ff6f00;--green:#2e7d32;--red:#c62828;
  --card:#fff;--bg:#f0f2f5;--text:#1a1a2e;--sub:#666;
  --safe-top:env(safe-area-inset-top);--safe-bottom:env(safe-area-inset-bottom);
}
body{font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}

/* ===== SCREENS ===== */
.screen{display:none;min-height:100vh;flex-direction:column;}
.screen.active{display:flex;}

/* ===== HOME ===== */
#homeScreen{background:linear-gradient(160deg,#1a237e 0%,#283593 60%,#1565c0 100%);}
.home-header{padding:calc(var(--safe-top) + 28px) 20px 20px;text-align:center;color:#fff;}
.home-header h1{font-size:22px;font-weight:700;letter-spacing:1px;margin-bottom:4px;}
.home-header p{font-size:13px;opacity:.75;}
.total-badge{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);color:#fff;border-radius:20px;padding:4px 14px;font-size:12px;margin-top:8px;}
.genre-grid{padding:12px 16px calc(var(--safe-bottom)+80px);display:flex;flex-direction:column;gap:12px;}
.genre-card{background:#fff;border-radius:16px;padding:16px 18px;display:flex;align-items:center;gap:14px;box-shadow:0 2px 12px rgba(0,0,0,.12);cursor:pointer;transition:transform .1s;}
.genre-card:active{transform:scale(.97);}
.genre-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.genre-info{flex:1;min-width:0;}
.genre-name{font-size:15px;font-weight:700;color:#1a1a2e;margin-bottom:3px;}
.genre-meta{font-size:12px;color:#888;}
.genre-progress{width:100%;height:4px;background:#e8eaf6;border-radius:2px;margin-top:8px;overflow:hidden;}
.genre-progress-bar{height:100%;border-radius:2px;transition:width .4s;}
.genre-score{font-size:12px;font-weight:700;margin-left:auto;flex-shrink:0;}

/* ===== QUIZ ===== */
#quizScreen{background:var(--bg);}
.quiz-header{background:var(--primary);color:#fff;padding:calc(var(--safe-top)+12px) 16px 12px;display:flex;align-items:center;gap:10px;}
.back-btn{background:rgba(255,255,255,.15);border:none;color:#fff;border-radius:10px;padding:8px 14px;font-size:14px;cursor:pointer;}
.quiz-title{font-size:15px;font-weight:700;flex:1;text-align:center;}
.quiz-counter{font-size:13px;opacity:.8;}
.progress-bar-wrap{background:#3949ab;height:4px;}
.progress-bar-inner{height:100%;background:#ffd54f;transition:width .3s;}
.quiz-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:20px 16px calc(var(--safe-bottom)+20px);gap:16px;}
.question-num{font-size:12px;color:var(--sub);font-weight:600;}
.question-card{background:#fff;border-radius:20px;padding:28px 22px;box-shadow:0 4px 20px rgba(0,0,0,.1);width:100%;max-width:500px;}
.question-text{font-size:17px;line-height:1.7;font-weight:500;color:var(--text);}
.answer-btns{display:flex;gap:14px;width:100%;max-width:500px;}
.ans-btn{flex:1;padding:18px;border:none;border-radius:16px;font-size:26px;font-weight:700;cursor:pointer;transition:transform .1s,opacity .2s;box-shadow:0 4px 14px rgba(0,0,0,.15);}
.ans-btn:active{transform:scale(.95);}
.ans-btn.maru{background:var(--green);color:#fff;}
.ans-btn.batsu{background:var(--red);color:#fff;}
.result-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:100;align-items:flex-end;justify-content:center;padding:0 0 calc(var(--safe-bottom)+20px);}
.result-overlay.show{display:flex;}
.result-card{background:#fff;border-radius:28px 28px 24px 24px;padding:28px 24px 24px;width:100%;max-width:500px;box-shadow:0 -8px 40px rgba(0,0,0,.2);}
.result-header{text-align:center;margin-bottom:16px;}
.result-badge{display:inline-block;border-radius:12px;padding:8px 24px;font-size:20px;font-weight:700;margin-bottom:10px;}
.result-badge.correct{background:#e8f5e9;color:var(--green);}
.result-badge.wrong{background:#ffebee;color:var(--red);}
.result-explanation{font-size:14px;line-height:1.7;color:#333;background:#f5f5f5;border-radius:12px;padding:14px;margin-bottom:16px;}
.result-answer-text{font-size:13px;color:var(--sub);text-align:center;margin-bottom:12px;}
.next-btn{width:100%;padding:16px;background:var(--primary);color:#fff;border:none;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;}

/* ===== RESULT SCREEN ===== */
#resultScreen{background:linear-gradient(160deg,#1a237e,#283593);}
.result-screen-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:calc(var(--safe-top)+20px) 20px calc(var(--safe-bottom)+20px);gap:20px;}
.result-circle{width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.1);border:4px solid #ffd54f;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;}
.result-pct{font-size:48px;font-weight:700;}
.result-label{font-size:14px;opacity:.8;}
.result-genre-name{font-size:18px;font-weight:700;color:#fff;text-align:center;}
.result-stats{display:flex;gap:16px;}
.stat-box{background:rgba(255,255,255,.12);border-radius:16px;padding:16px 24px;text-align:center;color:#fff;}
.stat-num{font-size:28px;font-weight:700;}
.stat-lbl{font-size:12px;opacity:.7;}
.result-btns{display:flex;flex-direction:column;gap:10px;width:100%;}
.result-btns button{padding:16px;border:none;border-radius:14px;font-size:15px;font-weight:700;cursor:pointer;}
.btn-retry{background:#ffd54f;color:#1a237e;}
.btn-home{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3)!important;}

/* ===== WRONG LIST ===== */
#wrongScreen{background:var(--bg);}
.wrong-header{background:var(--primary);color:#fff;padding:calc(var(--safe-top)+12px) 16px 12px;display:flex;align-items:center;gap:10px;}
.wrong-list{padding:16px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;}
.wrong-item{background:#fff;border-radius:14px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,.08);}
.wrong-item-q{font-size:14px;line-height:1.6;margin-bottom:8px;}
.wrong-item-a{font-size:13px;color:var(--primary);font-weight:600;}
.wrong-item-e{font-size:12px;color:var(--sub);margin-top:4px;line-height:1.5;}

/* ===== BOTTOM NAV ===== */
.bottom-nav{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e0e0e0;display:flex;padding-bottom:var(--safe-bottom);z-index:50;box-shadow:0 -2px 10px rgba(0,0,0,.08);}
.nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 0 6px;cursor:pointer;border:none;background:none;color:#9e9e9e;font-size:10px;gap:3px;transition:color .15s;}
.nav-btn.active{color:var(--primary);}
.nav-btn svg{width:22px;height:22px;}
</style>
</head>
<body>

<!-- HOME -->
<div id="homeScreen" class="screen active">
  <div class="home-header">
    <h1>🏢 マンション管理士</h1>
    <p>一問一答 試験対策</p>
    <div class="total-badge" id="totalBadge">全 565 問</div>
  </div>
  <div class="genre-grid" id="genreGrid"></div>
  <nav class="bottom-nav">
    <button class="nav-btn active" onclick="showHome()">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
      ホーム
    </button>
    <button class="nav-btn" onclick="showWrongList()">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
      間違い一覧
    </button>
    <button class="nav-btn" onclick="resetAll()">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
      リセット
    </button>
  </nav>
</div>

<!-- QUIZ -->
<div id="quizScreen" class="screen">
  <div class="quiz-header">
    <button class="back-btn" onclick="showHome()">＜ 戻る</button>
    <div class="quiz-title" id="quizTitle"></div>
    <div class="quiz-counter" id="quizCounter"></div>
  </div>
  <div class="progress-bar-wrap"><div class="progress-bar-inner" id="progressBar"></div></div>
  <div class="quiz-body">
    <div class="question-num" id="questionNum"></div>
    <div class="question-card"><div class="question-text" id="questionText"></div></div>
    <div class="answer-btns">
      <button class="ans-btn maru" onclick="answer(true)">○</button>
      <button class="ans-btn batsu" onclick="answer(false)">×</button>
    </div>
  </div>
  <div class="result-overlay" id="resultOverlay">
    <div class="result-card">
      <div class="result-header">
        <div class="result-badge" id="resultBadge"></div>
        <div class="result-answer-text" id="resultAnswerText"></div>
      </div>
      <div class="result-explanation" id="resultExplanation"></div>
      <button class="next-btn" id="nextBtn" onclick="nextQuestion()">次の問題 →</button>
    </div>
  </div>
</div>

<!-- RESULT -->
<div id="resultScreen" class="screen">
  <div class="result-screen-body">
    <div class="result-genre-name" id="finalGenreName"></div>
    <div class="result-circle">
      <div class="result-pct" id="finalPct"></div>
      <div class="result-label">正解率</div>
    </div>
    <div class="result-stats">
      <div class="stat-box"><div class="stat-num" id="finalCorrect"></div><div class="stat-lbl">正解</div></div>
      <div class="stat-box"><div class="stat-num" id="finalWrong"></div><div class="stat-lbl">不正解</div></div>
      <div class="stat-box"><div class="stat-num" id="finalTotal"></div><div class="stat-lbl">出題数</div></div>
    </div>
    <div class="result-btns">
      <button class="result-btns btn-retry btn-retry" onclick="retryQuiz()">もう一度挑戦</button>
      <button class="result-btns btn-home" onclick="showHome()">ジャンル選択に戻る</button>
    </div>
  </div>
</div>

<!-- WRONG LIST -->
<div id="wrongScreen" class="screen">
  <div class="wrong-header">
    <button class="back-btn" onclick="showHome()">＜ 戻る</button>
    <div class="quiz-title">間違えた問題</div>
  </div>
  <div class="wrong-list" id="wrongList"></div>
</div>

<script src="questions.js"></script>
<script>
const STORAGE_KEY = 'mgr_stats_v2';
let state = loadState();
let currentGenreIdx = 0;
let currentQuestions = [];
let currentQIdx = 0;
let sessionCorrect = 0;
let sessionWrong = 0;

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e) { return {}; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function genKey(gid, qi) { return `${gid}_${qi}`; }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showHome() {
  renderGenreGrid();
  showScreen('homeScreen');
}

function renderGenreGrid() {
  const grid = document.getElementById('genreGrid');
  grid.innerHTML = '';
  const icons = ['📋','📖','🏛️','⚖️','🏗️','📜'];
  GENRES.forEach((g, i) => {
    const total = g.questions.length;
    const answered = g.questions.filter((_, qi) => state[genKey(g.id, qi)] !== undefined).length;
    const correct = g.questions.filter((_, qi) => state[genKey(g.id, qi)] === true).length;
    const pct = answered > 0 ? Math.round(correct / answered * 100) : 0;
    const card = document.createElement('div');
    card.className = 'genre-card';
    card.innerHTML = `
      <div class="genre-icon" style="background:${g.color}20">${icons[i]}</div>
      <div class="genre-info">
        <div class="genre-name">${g.name}</div>
        <div class="genre-meta">${answered}/${total}問 完了</div>
        <div class="genre-progress"><div class="genre-progress-bar" style="width:${answered/total*100}%;background:${g.color}"></div></div>
      </div>
      <div class="genre-score" style="color:${g.color}">${answered>0?pct+'%':'--'}</div>
    `;
    card.onclick = () => startQuiz(i);
    grid.appendChild(card);
  });
}

function startQuiz(genreIdx) {
  currentGenreIdx = genreIdx;
  const g = GENRES[genreIdx];
  // shuffle
  currentQuestions = g.questions.map((q,i) => ({...q, origIdx: i}));
  for(let i = currentQuestions.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [currentQuestions[i], currentQuestions[j]] = [currentQuestions[j], currentQuestions[i]];
  }
  currentQIdx = 0;
  sessionCorrect = 0;
  sessionWrong = 0;
  document.getElementById('quizTitle').textContent = g.name;
  showScreen('quizScreen');
  renderQuestion();
}

function renderQuestion() {
  const g = GENRES[currentGenreIdx];
  const total = currentQuestions.length;
  const q = currentQuestions[currentQIdx];
  document.getElementById('questionText').textContent = q.q;
  document.getElementById('questionNum').textContent = `第 ${currentQIdx+1} 問`;
  document.getElementById('quizCounter').textContent = `${currentQIdx+1}/${total}`;
  document.getElementById('progressBar').style.width = `${(currentQIdx/total)*100}%`;
  document.getElementById('resultOverlay').classList.remove('show');
}

function answer(userAnswer) {
  const g = GENRES[currentGenreIdx];
  const q = currentQuestions[currentQIdx];
  const correct = userAnswer === q.a;
  if(correct) sessionCorrect++; else sessionWrong++;
  const key = genKey(g.id, q.origIdx);
  state[key] = correct;
  if(!correct) {
    if(!state._wrong) state._wrong = {};
    state._wrong[key] = {gid: g.id, gname: g.name, q: q.q, a: q.a, e: q.e};
  } else {
    if(state._wrong) delete state._wrong[key];
  }
  saveState();

  const overlay = document.getElementById('resultOverlay');
  const badge = document.getElementById('resultBadge');
  const ansText = document.getElementById('resultAnswerText');
  const expl = document.getElementById('resultExplanation');
  const nextBtn = document.getElementById('nextBtn');

  if(correct) {
    badge.textContent = '✓ 正解！';
    badge.className = 'result-badge correct';
  } else {
    badge.textContent = '✗ 不正解';
    badge.className = 'result-badge wrong';
  }
  ansText.textContent = `正解: ${q.a ? '○（正しい）' : '×（誤り）'}`;
  expl.textContent = q.e;
  const isLast = currentQIdx === currentQuestions.length - 1;
  nextBtn.textContent = isLast ? '結果を見る →' : '次の問題 →';
  overlay.classList.add('show');
}

function nextQuestion() {
  const isLast = currentQIdx === currentQuestions.length - 1;
  if(isLast) {
    showResult();
  } else {
    currentQIdx++;
    renderQuestion();
  }
}

function showResult() {
  const total = currentQuestions.length;
  const pct = Math.round(sessionCorrect / total * 100);
  document.getElementById('finalGenreName').textContent = GENRES[currentGenreIdx].name;
  document.getElementById('finalPct').textContent = pct + '%';
  document.getElementById('finalCorrect').textContent = sessionCorrect;
  document.getElementById('finalWrong').textContent = sessionWrong;
  document.getElementById('finalTotal').textContent = total;
  showScreen('resultScreen');
}

function retryQuiz() { startQuiz(currentGenreIdx); }

function showWrongList() {
  const list = document.getElementById('wrongList');
  list.innerHTML = '';
  const wrongs = state._wrong || {};
  const items = Object.values(wrongs);
  if(items.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:40px;color:#999;font-size:15px;">まだ間違えた問題はありません</div>';
  } else {
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'wrong-item';
      div.innerHTML = `
        <div class="wrong-item-q">${item.q}</div>
        <div class="wrong-item-a">正解: ${item.a ? '○（正しい）' : '×（誤り）'}</div>
        <div class="wrong-item-e">${item.e}</div>
      `;
      list.appendChild(div);
    });
  }
  showScreen('wrongScreen');
}

function resetAll() {
  if(!confirm('全ての学習記録をリセットしますか？')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = {};
  renderGenreGrid();
}

// Init
renderGenreGrid();

// PWA
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(()=>{});
}
</script>
</body>
</html>
