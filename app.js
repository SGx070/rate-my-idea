const CAP = 100;
let trends = [];

const ideaInput = document.getElementById('ideaInput');
const rateBtn = document.getElementById('rateBtn');
const resultSection = document.getElementById('resultSection');
const gaugeArc = document.getElementById('gaugeArc');
const scoreText = document.getElementById('scoreText');
const verdict = document.getElementById('verdict');
const breakdownList = document.getElementById('breakdownList');
const thoughtsText = document.getElementById('thoughtsText');
const trendsEl = document.getElementById('trends');
const useAI = document.getElementById('useAI');
const apiKey = document.getElementById('apiKey');

const ARC_LEN = 251.3;

async function fetchTrends() {
  trendsEl.textContent = 'Loading trends...';
  try {
    // GitHub trending repos (search by recent stars)
    const since = new Date(Date.now() - 7*24*3600*1000).toISOString().slice(0,10);
    const url = `https://api.github.com/search/repositories?q=created:>${since}&sort=stars&order=desc&per_page=12`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 403) { trendsEl.textContent = 'GitHub rate limit reached. Try again later.'; return; }
      throw new Error('HTTP ' + res.status);
    }
    const data = await res.json();
    trends = (data.items || []).map(r => ({ name: r.name, desc: r.description || '', stars: r.stargazers_count, url: r.html_url, topics: r.topics || [] }));
    // also topics
    renderTrends();
  } catch (e) {
    trendsEl.textContent = 'Could not load trends (offline?).';
  }
}

function renderTrends() {
  if (!trends.length) { trendsEl.textContent = 'No trends.'; return; }
  trendsEl.innerHTML = trends.map(t => `
    <div class="trend-card">
      <h4>${escapeHtml(t.name)}</h4>
      <p>${escapeHtml((t.desc||'').slice(0,90))}</p>
      <p>⭐ ${t.stars}</p>
      <a href="${t.url}" target="_blank">view</a>
    </div>
  `).join('');
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// Heuristic scoring based on trend overlap + commonality + clarity
function heuristicScore(idea) {
  const lower = idea.toLowerCase();
  const words = lower.split(/\W+/).filter(Boolean);
  // trend keyword set
  const trendWords = new Set();
  trends.forEach(t => {
    (t.name+' '+t.desc+' '+ (t.topics||[]).join(' ')).toLowerCase().split(/\W+/).forEach(w=>{ if(w.length>3) trendWords.add(w); });
  });
  // overlap
  let overlap = 0;
  words.forEach(w => { if (trendWords.has(w)) overlap++; });
  const overlapScore = Math.min(40, overlap*4);

  // commonality penalty: check against a small set of very common buzzwords
  const common = ['app','website','todo','chat','blog','ecommerce','social','ai','assistant','dashboard'];
  let commonCount = 0;
  common.forEach(c => { if (lower.includes(c)) commonCount++; });
  const commonPenalty = Math.min(25, commonCount*5);

  // clarity: length
  const clarity = Math.min(25, Math.floor(idea.length / 40));

  // novelty bonus: unique words not in trends/common
  const novelty = Math.min(10, Math.max(0, 10 - commonCount));

  let score = 30 + overlapScore + clarity + novelty - commonPenalty;
  score = Math.max(0, Math.min(CAP, Math.round(score)));
  return { score, breakdown: [
    ['Trend alignment', overlapScore],
    ['Clarity / detail', clarity],
    ['Novelty', novelty],
    ['Commonality penalty', -commonPenalty],
    ['Base', 30],
  ] };
}

async function aiRate(idea) {
  const key = apiKey.value.trim();
  if (!key) throw new Error('No API key');
  const prompt = `Rate this idea out of 100. Consider trend alignment, novelty, commonality, and future potential. Return JSON: {"score":number,"breakdown":[{"label":string,"value":number}],"thoughts":string}. Idea: ${idea}`;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${key}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{role:'user',content:prompt}], response_format:{type:'json_object'} })
  });
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  return JSON.parse(content);
}

function setGauge(score) {
  const offset = ARC_LEN - (ARC_LEN * (score/CAP));
  gaugeArc.style.transition = 'stroke-dashoffset 1s ease';
  gaugeArc.setAttribute('stroke-dashoffset', offset);
  // color
  let color = '#f44336';
  if (score >= 70) color = '#4caf50';
  else if (score >= 40) color = '#ff9800';
  gaugeArc.setAttribute('stroke', color);
  // animate number
  let cur = 0;
  const step = () => {
    cur += (score - cur) * 0.15;
    if (Math.abs(cur-score) < 0.5) cur = score;
    scoreText.textContent = Math.round(cur);
    if (cur !== score) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function verdictFor(score) {
  if (score >= 85) return '🔥 Excellent';
  if (score >= 70) return '✅ Strong';
  if (score >= 50) return '🟡 Promising';
  if (score >= 30) return '🟠 Weak';
  return '❌ Poor';
}

rateBtn.addEventListener('click', async () => {
  const idea = ideaInput.value.trim();
  if (!idea) { alert('Enter an idea first.'); return; }
  rateBtn.disabled = true;
  rateBtn.textContent = 'Rating...';
  try {
    let result;
    if (useAI.checked) {
      try { result = await aiRate(idea); }
      catch(e){ result = heuristicScore(idea); result.thoughts = 'AI failed ('+e.message+'), used heuristic. ' + (result.thoughts||''); }
    } else {
      result = heuristicScore(idea);
      result.thoughts = generateThoughts(idea, result.score);
    }
    const score = result.score;
    resultSection.hidden = false;
    setGauge(score);
    verdict.textContent = verdictFor(score);
    breakdownList.innerHTML = (result.breakdown||[]).map(b => `<li><span>${escapeHtml(b[0]||b.label)}</span><span>${b[1]!==undefined?b[1]:b.value}</span></li>`).join('');
    thoughtsText.textContent = result.thoughts || generateThoughts(idea, score);
  } finally {
    rateBtn.disabled = false;
    rateBtn.textContent = 'Rate';
  }
});

function generateThoughts(idea, score) {
  const lower = idea.toLowerCase();
  const future = score >= 70 ? 'has strong potential to perform well in the future' : score >= 40 ? 'may gain traction if refined' : 'is unlikely to stand out without significant differentiation';
  const common = ['app','website','todo','chat','blog'].some(c=>lower.includes(c)) ? 'It overlaps with very common concepts, which may hurt uniqueness.' : 'It avoids the most saturated categories.';
  return `This idea ${future}. ${common} Consider sharpening the target audience and the unique value proposition. Higher detail in your description generally improves the rating.`;
}

fetchTrends();
setInterval(fetchTrends, 5*60*1000);
