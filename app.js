import { createClient } from "@supabase/supabase-js";

const STORAGE_KEY = "chinese-bridge-review-demo-v1";
const SESSION_KEY = "chinese-bridge-review-session-v1";
const SUPABASE_STATE_ID = "main";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const seedData = {
  currentUserId: null,
  activeView: "dashboard",
  users: [
    {
      id: "admin-1",
      name: "总管理员",
      username: "admin",
      password: "admin123",
      role: "super_admin",
      region: "阿德莱德赛区",
      mustChangePassword: false,
      hasLoggedIn: true
    },
    {
      id: "judge-1",
      name: "评委 1",
      username: "judge1",
      password: "123456",
      role: "judge",
      region: "阿德莱德赛区",
      mustChangePassword: true,
      hasLoggedIn: false
    },
    {
      id: "judge-2",
      name: "评委 2",
      username: "judge2",
      password: "123456",
      role: "judge",
      region: "阿德莱德赛区",
      mustChangePassword: true,
      hasLoggedIn: false
    },
    {
      id: "judge-3",
      name: "评委 3",
      username: "judge3",
      password: "123456",
      role: "judge",
      region: "阿德莱德赛区",
      mustChangePassword: true,
      hasLoggedIn: false
    },
    {
      id: "judge-4",
      name: "评委 4",
      username: "judge4",
      password: "123456",
      role: "judge",
      region: "阿德莱德赛区",
      mustChangePassword: true,
      hasLoggedIn: false
    },
    {
      id: "judge-5",
      name: "评委 5",
      username: "judge5",
      password: "123456",
      role: "judge",
      region: "阿德莱德赛区",
      mustChangePassword: true,
      hasLoggedIn: false
    },
    {
      id: "judge-6",
      name: "评委 6",
      username: "judge6",
      password: "123456",
      role: "judge",
      region: "阿德莱德赛区",
      mustChangePassword: true,
      hasLoggedIn: false
    }
  ],
  contestants: [
    {
      id: "c-1",
      number: "A001",
      name: "李明悦",
      age: 9,
      group: "小学组",
      title: "中文演讲：我的家乡",
      order: 1,
      notes: "开场选手"
    },
    {
      id: "c-2",
      number: "A002",
      name: "陈思远",
      age: 10,
      group: "小学组",
      title: "朗诵：春晓",
      order: 2,
      notes: ""
    },
    {
      id: "c-3",
      number: "A003",
      name: "王可欣",
      age: 8,
      group: "小学组",
      title: "故事：中国节日",
      order: 3,
      notes: ""
    },
    {
      id: "c-4",
      number: "A004",
      name: "赵一诺",
      age: 11,
      group: "小学组",
      title: "才艺展示：古诗配画",
      order: 4,
      notes: ""
    }
  ],
  scoreItems: [
    { id: "language", name: "语言表达", max: 40 },
    { id: "content", name: "内容理解", max: 30 },
    { id: "stage", name: "舞台表现", max: 20 },
    { id: "creativity", name: "整体印象", max: 10 }
  ],
  scores: {},
  auditLogs: []
};

let state = structuredClone(seedData);
let toastTimer = null;
let dirtyScore = false;
let isBooting = true;
let storageMode = supabase ? "supabase" : "local";
let saveTimer = null;

function loadLocalJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return structuredClone(fallback);

  try {
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

function localSession() {
  return {
    currentUserId: null,
    activeView: "dashboard",
    ...loadLocalJson(SESSION_KEY, {})
  };
}

function dataPayloadFromState(source) {
  return {
    users: source.users,
    contestants: source.contestants,
    scoreItems: source.scoreItems,
    scores: source.scores,
    auditLogs: source.auditLogs
  };
}

function mergeState(payload) {
  const session = localSession();
  return {
    ...structuredClone(seedData),
    ...payload,
    currentUserId: session.currentUserId,
    activeView: session.activeView || "dashboard"
  };
}

async function loadState() {
  if (!supabase) {
    return mergeState(loadLocalJson(STORAGE_KEY, dataPayloadFromState(seedData)));
  }

  const { data, error } = await supabase
    .from("judging_state")
    .select("payload")
    .eq("id", SUPABASE_STATE_ID)
    .maybeSingle();

  if (error) {
    console.error(error);
    storageMode = "local";
    return mergeState(loadLocalJson(STORAGE_KEY, dataPayloadFromState(seedData)));
  }

  if (!data?.payload) {
    const initialPayload = dataPayloadFromState(seedData);
    await saveRemotePayload(initialPayload);
    return mergeState(initialPayload);
  }

  return mergeState(data.payload);
}

async function saveRemotePayload(payload) {
  const { error } = await supabase.from("judging_state").upsert({
    id: SUPABASE_STATE_ID,
    payload,
    updated_at: new Date().toISOString()
  });

  if (error) throw error;
}

function saveState() {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      currentUserId: state.currentUserId,
      activeView: state.activeView
    })
  );

  const payload = dataPayloadFromState(state);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

  if (!supabase || storageMode !== "supabase") return;

  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await saveRemotePayload(payload);
    } catch (error) {
      console.error(error);
      storageMode = "local";
      showToast("Supabase 保存失败，已临时切换为本地保存");
      render();
    }
  }, 150);
}

function roleLabel(role) {
  return {
    super_admin: "一级管理员",
    regional_admin: "二级管理员",
    judge: "评委"
  }[role];
}

function currentUser() {
  return state.users.find((user) => user.id === state.currentUserId);
}

function judges() {
  return state.users.filter((user) => user.role === "judge");
}

function scoresForJudge(judgeId) {
  return state.contestants.map((contestant) => getScore(judgeId, contestant.id));
}

function getScore(judgeId, contestantId) {
  const key = `${judgeId}:${contestantId}`;
  return (
    state.scores[key] || {
      judgeId,
      contestantId,
      totalScore: "",
      comment: "",
      details: {},
      status: "not_started",
      submittedAt: "",
      returnedAt: "",
      returnReason: ""
    }
  );
}

function setScore(score) {
  state.scores[`${score.judgeId}:${score.contestantId}`] = score;
  saveState();
}

function submissionStatus(judgeId) {
  const allScores = scoresForJudge(judgeId);
  const submitted = allScores.every((score) => score.status === "submitted");
  const returned = allScores.some((score) => score.status === "returned");
  const saved = allScores.filter((score) => Number.isFinite(Number(score.totalScore)) && score.totalScore !== "").length;

  if (returned) return "returned";
  if (submitted) return "submitted";
  if (saved > 0) return "in_progress";
  return "not_started";
}

function statusText(status) {
  return {
    not_started: "未评分",
    draft: "已保存",
    submitted: "已提交",
    returned: "被退回",
    in_progress: "进行中"
  }[status];
}

function statusClass(status) {
  if (status === "submitted") return "ok";
  if (status === "draft" || status === "in_progress") return "info";
  if (status === "returned") return "danger";
  return "warn";
}

function isValidScore(value) {
  const number = Number(value);
  return value !== "" && Number.isFinite(number) && number >= 0 && number <= 100;
}

function calculateResult(contestantId) {
  const submittedScores = judges()
    .map((judge) => getScore(judge.id, contestantId))
    .filter((score) => score.status === "submitted" && isValidScore(score.totalScore))
    .map((score) => Number(score.totalScore));

  const required = judges().length;
  if (submittedScores.length !== required) {
    return { ready: false, scores: submittedScores, high: "", low: "", average: "", rankScore: -1 };
  }

  const sorted = [...submittedScores].sort((a, b) => b - a);
  let used = [...submittedScores];
  let high = "";
  let low = "";

  if (used.length >= 3) {
    high = Math.max(...used);
    used.splice(used.indexOf(high), 1);
    low = Math.min(...used);
    used.splice(used.indexOf(low), 1);
  }

  const average = used.reduce((sum, value) => sum + value, 0) / used.length;
  return {
    ready: true,
    scores: sorted,
    high,
    low,
    average: average.toFixed(2),
    rankScore: average
  };
}

function rankedContestants() {
  return state.contestants
    .map((contestant) => ({ contestant, result: calculateResult(contestant.id) }))
    .sort((a, b) => b.result.rankScore - a.result.rankScore || a.contestant.order - b.contestant.order)
    .map((row, index) => ({ ...row, rank: row.result.ready ? index + 1 : "" }));
}

function showToast(message) {
  const oldToast = document.querySelector(".toast");
  if (oldToast) oldToast.remove();
  clearTimeout(toastTimer);

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  toastTimer = setTimeout(() => toast.remove(), 2800);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function appShell(content, nav) {
  const user = currentUser();
  const role = roleLabel(user.role);
  const storageLabel = storageMode === "supabase" ? "Supabase 数据库" : "本地演示数据";

  return `
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">桥</div>
          <div>
            <h1>汉语桥评审系统</h1>
            <p>小学组 · 阿德莱德赛区 · 总决赛</p>
          </div>
        </div>
        <div class="userbar">
          <span class="badge ${storageMode === "supabase" ? "ok" : "warn"}">${storageLabel}</span>
          <span class="badge">${escapeHtml(user.name)} · ${role}</span>
          <button class="btn ghost" data-action="reset-demo">重置数据</button>
          <button class="btn" data-action="logout">退出</button>
        </div>
      </header>
      <div class="layout">
        <aside class="sidebar">${nav}</aside>
        <main class="main">${content}</main>
      </div>
    </div>
  `;
}

function navButton(view, label, icon) {
  return `
    <button class="nav-button ${state.activeView === view ? "active" : ""}" data-view="${view}">
      <span>${icon}</span><span>${label}</span>
    </button>
  `;
}

function render() {
  if (isBooting) return renderBooting();
  const user = currentUser();
  if (!user) return renderLogin();
  if (user.mustChangePassword) return renderForceChangePassword();
  return user.role === "judge" ? renderJudgeApp() : renderAdminApp();
}

function renderBooting() {
  document.querySelector("#app").innerHTML = `
    <div class="login-page">
      <section class="login-visual">
        <h1>汉语桥（小学组）现场评审</h1>
        <p>正在加载比赛数据，请稍候。</p>
      </section>
      <section class="login-panel">
        <h2>加载数据</h2>
        <p>${supabase ? "正在连接 Supabase 数据库。" : "未配置 Supabase，正在使用本地演示数据。"}</p>
      </section>
    </div>
  `;
}

function renderLogin() {
  document.querySelector("#app").innerHTML = `
    <div class="login-page">
      <section class="login-visual">
        <h1>汉语桥（小学组）现场评审</h1>
        <p>面向评委现场评分、管理员实时查看进度与最终排名的简洁原型。配置 Supabase 后，数据会从数据库动态加载。</p>
      </section>
      <section class="login-panel">
        <h2>登录</h2>
        <p>${storageMode === "supabase" ? "当前已连接 Supabase 数据库。" : "当前未配置 Supabase，正在使用本地演示数据。"}</p>
        <form class="form" data-form="login">
          <div class="field">
            <label for="username">账号</label>
            <input class="input" id="username" name="username" autocomplete="username" value="admin" />
          </div>
          <div class="field">
            <label for="password">密码</label>
            <input class="input" id="password" name="password" type="password" autocomplete="current-password" value="admin123" />
          </div>
          <button class="btn primary" type="submit">登录</button>
        </form>
        <div class="account-list">
          <strong>演示账号</strong>
          <span>管理员：admin / admin123</span>
          <span>评委：judge1 到 judge6 / 123456</span>
        </div>
      </section>
    </div>
  `;
}

function renderForceChangePassword() {
  const user = currentUser();
  document.querySelector("#app").innerHTML = `
    <div class="login-page">
      <section class="login-visual">
        <h1>首次登录需要修改密码</h1>
        <p>这是评委进入评分页前的强制步骤，用来模拟现场账号首次分发后的安全要求。</p>
      </section>
      <section class="login-panel">
        <h2>${escapeHtml(user.name)}</h2>
        <p>请输入新密码后继续评分。</p>
        <form class="form" data-form="change-password">
          <div class="field">
            <label for="new-password">新密码</label>
            <input class="input" id="new-password" name="password" type="password" minlength="6" required />
          </div>
          <button class="btn primary" type="submit">保存并进入</button>
          <button class="btn ghost" type="button" data-action="logout">返回登录</button>
        </form>
      </section>
    </div>
  `;
}

function renderAdminApp() {
  const nav = [
    navButton("dashboard", "比赛概览", "▣"),
    navButton("contestants", "参赛小朋友", "☷"),
    navButton("judges", "评委账户", "◎"),
    navButton("scores", "原始评分", "◇"),
    navButton("results", "最终排名", "★")
  ].join("");

  const content = {
    dashboard: renderAdminDashboard(),
    contestants: renderContestants(),
    judges: renderJudges(),
    scores: renderRawScores(),
    results: renderResults()
  }[state.activeView];

  document.querySelector("#app").innerHTML = appShell(content, nav);
}

function renderAdminDashboard() {
  const judgeRows = judges().map((judge) => {
    const status = submissionStatus(judge.id);
    const saved = scoresForJudge(judge.id).filter((score) => isValidScore(score.totalScore)).length;
    return `
      <tr>
        <td>${escapeHtml(judge.name)}</td>
        <td>${judge.hasLoggedIn ? "已登录" : "未登录"}</td>
        <td>${judge.mustChangePassword ? "未修改" : "已修改"}</td>
        <td>${saved}/${state.contestants.length}</td>
        <td><span class="badge ${statusClass(status)}">${statusText(status)}</span></td>
      </tr>
    `;
  });

  const submittedCount = judges().filter((judge) => submissionStatus(judge.id) === "submitted").length;
  const readyCount = rankedContestants().filter((row) => row.result.ready).length;

  return `
    <section class="panel hero">
      <div class="hero-copy">
        <h2>现场评分稳定、清晰、可追踪</h2>
        <p>评委保存草稿并最终提交；管理员实时查看进度、退回修改、计算去最高最低后的最终排名。</p>
      </div>
      <div class="hero-stat">
        <div class="stat-line"><span>参赛小朋友</span><strong>${state.contestants.length}</strong></div>
        <div class="stat-line"><span>评委人数</span><strong>${judges().length}</strong></div>
        <div class="stat-line"><span>已出正式排名</span><strong>${readyCount}</strong></div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>比赛概览</h2>
          <p>当前显示本机演示数据，刷新后保存状态会保留。</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="grid cols-3">
          <div class="metric"><span>评委提交</span><strong>${submittedCount}/${judges().length}</strong></div>
          <div class="metric"><span>评分项目</span><strong>${state.scoreItems.length}</strong></div>
          <div class="metric"><span>赛区</span><strong>阿德莱德</strong></div>
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>评分进度</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>评委</th><th>登录</th><th>首次改密</th><th>已评分</th><th>状态</th></tr>
          </thead>
          <tbody>${judgeRows.join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderContestants() {
  const rows = state.contestants
    .sort((a, b) => a.order - b.order)
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.number)}</td>
          <td>${escapeHtml(item.name)}</td>
          <td>${item.age}</td>
          <td>${escapeHtml(item.group)}</td>
          <td>${escapeHtml(item.title)}</td>
          <td>${item.order}</td>
          <td>${escapeHtml(item.notes)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>参赛小朋友管理</h2>
          <p>第一版先用内置名单模拟 Excel 导入后的数据结构。</p>
        </div>
        <button class="btn primary" data-action="add-contestant">新增示例选手</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>编号</th><th>姓名</th><th>年龄</th><th>组别</th><th>表演项目</th><th>出场顺序</th><th>备注</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderJudges() {
  const rows = judges()
    .map((judge) => {
      const status = submissionStatus(judge.id);
      const progress = scoresForJudge(judge.id).filter((score) => isValidScore(score.totalScore)).length;
      return `
        <tr>
          <td>${escapeHtml(judge.name)}</td>
          <td>${escapeHtml(judge.username)}</td>
          <td>${escapeHtml(judge.region)}</td>
          <td>${judge.mustChangePassword ? "否" : "是"}</td>
          <td>${progress}/${state.contestants.length}</td>
          <td><span class="badge ${statusClass(status)}">${statusText(status)}</span></td>
          <td class="actions">
            <button class="btn ghost" data-action="reset-password" data-id="${judge.id}">重置密码</button>
            <button class="btn danger" data-action="return-judge" data-id="${judge.id}" ${status === "not_started" ? "disabled" : ""}>退回修改</button>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>评委账户管理</h2>
          <p>支持批量生成、重置密码、退回已提交评分。这里先做可交互演示。</p>
        </div>
        <button class="btn primary" data-action="generate-judge">生成评委账号</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>姓名</th><th>账号</th><th>赛区</th><th>已改密</th><th>进度</th><th>状态</th><th>操作</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderRawScores() {
  const headers = judges().map((judge) => `<th>${escapeHtml(judge.name)}</th>`).join("");
  const rows = state.contestants
    .sort((a, b) => a.order - b.order)
    .map((contestant) => {
      const judgeScores = judges()
        .map((judge) => {
          const score = getScore(judge.id, contestant.id);
          return `<td>${isValidScore(score.totalScore) ? Number(score.totalScore).toFixed(1) : "-"} <span class="badge ${statusClass(score.status)}">${statusText(score.status)}</span></td>`;
        })
        .join("");
      return `
        <tr>
          <td>${escapeHtml(contestant.number)}</td>
          <td>${escapeHtml(contestant.name)}</td>
          ${judgeScores}
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>原始评分查看</h2>
          <p>按小朋友展示每位评委的总分和状态。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>编号</th><th>姓名</th>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderResults() {
  const judgeHeaders = judges().map((judge) => `<th>${escapeHtml(judge.name)}</th>`).join("");
  const rows = rankedContestants()
    .map(({ contestant, result, rank }) => {
      const judgeScoreCells = judges()
        .map((judge) => {
          const score = getScore(judge.id, contestant.id);
          return `<td>${isValidScore(score.totalScore) ? Number(score.totalScore).toFixed(1) : "-"}</td>`;
        })
        .join("");
      return `
        <tr>
          <td>${rank || "-"}</td>
          <td>${escapeHtml(contestant.number)}</td>
          <td>${escapeHtml(contestant.name)}</td>
          <td>${escapeHtml(contestant.group)}</td>
          <td>${contestant.order}</td>
          ${judgeScoreCells}
          <td>${result.high === "" ? "-" : result.high.toFixed(1)}</td>
          <td>${result.low === "" ? "-" : result.low.toFixed(1)}</td>
          <td><strong>${result.average || "待全部提交"}</strong></td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>最终成绩与排名</h2>
          <p>所有评委提交后自动去掉一个最高分和一个最低分，保留两位小数。</p>
        </div>
        <button class="btn primary" data-action="export-csv">导出 CSV</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>排名</th><th>编号</th><th>姓名</th><th>组别</th><th>顺序</th>${judgeHeaders}<th>去掉最高</th><th>去掉最低</th><th>最终平均</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderJudgeApp() {
  const nav = [
    navButton("judge-dashboard", "评分总览", "▣"),
    navButton("judge-contestants", "参赛列表", "☷"),
    navButton("judge-submit", "最终提交", "✓")
  ].join("");

  if (!state.activeView.startsWith("judge")) state.activeView = "judge-dashboard";

  const content = {
    "judge-dashboard": renderJudgeDashboard(),
    "judge-contestants": renderJudgeContestants(),
    "judge-submit": renderJudgeSubmit()
  }[state.activeView];

  document.querySelector("#app").innerHTML = appShell(content, nav);
}

function renderJudgeDashboard() {
  const user = currentUser();
  const scores = scoresForJudge(user.id);
  const saved = scores.filter((score) => isValidScore(score.totalScore)).length;
  const status = submissionStatus(user.id);

  return `
    <section class="panel hero">
      <div class="hero-copy">
        <h2>${escapeHtml(user.name)}，欢迎评分</h2>
        <p>请按出场顺序完成所有小朋友评分。保存草稿后可以继续修改，最终提交后会锁定，除非管理员退回。</p>
      </div>
      <div class="hero-stat">
        <div class="stat-line"><span>已评分</span><strong>${saved}/${state.contestants.length}</strong></div>
        <div class="stat-line"><span>当前状态</span><strong>${statusText(status)}</strong></div>
        <div class="stat-line"><span>满分</span><strong>100</strong></div>
      </div>
    </section>
    ${renderJudgeContestants()}
  `;
}

function renderJudgeContestants() {
  const user = currentUser();
  const isLocked = submissionStatus(user.id) === "submitted";
  const rows = state.contestants
    .sort((a, b) => a.order - b.order)
    .map((contestant) => {
      const score = getScore(user.id, contestant.id);
      return `
        <tr>
          <td>${contestant.order}</td>
          <td>${escapeHtml(contestant.number)}</td>
          <td>${escapeHtml(contestant.name)}</td>
          <td>${escapeHtml(contestant.title)}</td>
          <td>${isValidScore(score.totalScore) ? Number(score.totalScore).toFixed(1) : "-"}</td>
          <td><span class="badge ${statusClass(score.status)}">${statusText(score.status)}</span></td>
          <td><button class="btn primary" data-action="score-contestant" data-id="${contestant.id}" ${isLocked ? "disabled" : ""}>评分</button></td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>参赛列表</h2>
          <p>按出场顺序排列，所有小朋友都有总分后才能最终提交。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>顺序</th><th>编号</th><th>姓名</th><th>项目</th><th>总分</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderJudgeSubmit() {
  const user = currentUser();
  const scores = scoresForJudge(user.id);
  const invalid = scores.filter((score) => !isValidScore(score.totalScore));
  const status = submissionStatus(user.id);

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>最终提交</h2>
          <p>提交前系统会检查每位小朋友都有 0 到 100 之间的总分。</p>
        </div>
      </div>
      <div class="panel-body grid">
        <div class="grid cols-3">
          <div class="metric"><span>评分数量</span><strong>${scores.length - invalid.length}/${scores.length}</strong></div>
          <div class="metric"><span>当前状态</span><strong>${statusText(status)}</strong></div>
          <div class="metric"><span>待补评分</span><strong>${invalid.length}</strong></div>
        </div>
        <div class="actions">
          <button class="btn primary" data-action="submit-all" ${invalid.length || status === "submitted" ? "disabled" : ""}>提交全部评分</button>
          <button class="btn ghost" data-view="judge-contestants">返回参赛列表</button>
        </div>
      </div>
    </section>
  `;
}

function renderScoreForm(contestantId) {
  const user = currentUser();
  const contestant = state.contestants.find((item) => item.id === contestantId);
  const score = getScore(user.id, contestantId);
  const detailInputs = state.scoreItems
    .map(
      (item) => `
        <div class="score-item">
          <span>${escapeHtml(item.name)}（满分 ${item.max}）</span>
          <input class="input" type="number" min="0" max="${item.max}" step="0.5" name="detail-${item.id}" value="${escapeHtml(score.details[item.id] ?? "")}" />
        </div>
      `
    )
    .join("");

  document.querySelector("#app").innerHTML = appShell(
    `
      <section class="panel">
        <div class="panel-head">
          <div>
            <h2>${escapeHtml(contestant.name)} · ${escapeHtml(contestant.number)}</h2>
            <p>${escapeHtml(contestant.title)}，出场顺序 ${contestant.order}，${escapeHtml(contestant.group)}</p>
          </div>
          <button class="btn ghost" data-view="judge-contestants">返回</button>
        </div>
        <div class="panel-body">
          <form class="form" data-form="score" data-id="${contestant.id}">
            <div>
              <h3 class="section-title">评分细则</h3>
              <p class="muted">细则可选填；填写后会自动汇总到总分，评委仍可手动调整总分。</p>
            </div>
            <div class="score-grid">${detailInputs}</div>
            <div class="grid cols-2">
              <div class="field">
                <label for="total-score">总分（必填，0-100）</label>
                <input class="input" id="total-score" name="totalScore" type="number" min="0" max="100" step="0.5" value="${escapeHtml(score.totalScore)}" required />
              </div>
              <div class="field">
                <label for="comment">评语（选填）</label>
                <textarea class="textarea" id="comment" name="comment">${escapeHtml(score.comment)}</textarea>
              </div>
            </div>
            <div class="actions">
              <button class="btn primary" type="submit">Save 保存</button>
              <button class="btn ghost" type="button" data-view="judge-submit">去最终提交</button>
            </div>
          </form>
        </div>
      </section>
    `,
    [navButton("judge-dashboard", "评分总览", "▣"), navButton("judge-contestants", "参赛列表", "☷"), navButton("judge-submit", "最终提交", "✓")].join("")
  );
}

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formType = form.dataset.form;

  if (formType === "login") {
    const formData = new FormData(form);
    const username = String(formData.get("username")).trim();
    const password = String(formData.get("password"));
    const user = state.users.find((item) => item.username === username && item.password === password);

    if (!user) {
      showToast("账号或密码不正确");
      return;
    }

    user.hasLoggedIn = true;
    state.currentUserId = user.id;
    state.activeView = user.role === "judge" ? "judge-dashboard" : "dashboard";
    saveState();
    render();
    return;
  }

  if (formType === "change-password") {
    const user = currentUser();
    const password = String(new FormData(form).get("password"));
    if (password.length < 6) {
      showToast("新密码至少 6 位");
      return;
    }
    user.password = password;
    user.mustChangePassword = false;
    saveState();
    showToast("密码已修改");
    render();
    return;
  }

  if (formType === "score") {
    const user = currentUser();
    const contestantId = form.dataset.id;
    const formData = new FormData(form);
    const totalScore = String(formData.get("totalScore"));

    if (!isValidScore(totalScore)) {
      showToast("总分必须在 0 到 100 之间");
      return;
    }

    const details = {};
    state.scoreItems.forEach((item) => {
      const value = String(formData.get(`detail-${item.id}`));
      if (value !== "") details[item.id] = Number(value);
    });

    const oldScore = getScore(user.id, contestantId);
    setScore({
      ...oldScore,
      totalScore,
      comment: String(formData.get("comment")),
      details,
      status: oldScore.status === "returned" ? "returned" : "draft"
    });

    dirtyScore = false;
    showToast("评分已保存");
    render();
  }
});

document.addEventListener("input", (event) => {
  const form = event.target.closest('form[data-form="score"]');
  if (!form) return;
  dirtyScore = true;

  if (!event.target.name.startsWith("detail-")) return;

  let sum = 0;
  let hasDetail = false;
  state.scoreItems.forEach((item) => {
    const input = form.elements[`detail-${item.id}`];
    if (input.value !== "") {
      hasDetail = true;
      sum += Number(input.value);
    }
  });

  if (hasDetail) {
    form.elements.totalScore.value = Math.min(100, Math.max(0, sum)).toFixed(1);
  }
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  const view = target.dataset.view;
  if (view) {
    if (dirtyScore && !confirm("当前评分尚未保存，确定离开吗？")) return;
    dirtyScore = false;
    state.activeView = view;
    saveState();
    render();
    return;
  }

  const action = target.dataset.action;
  if (!action) return;

  if (action === "logout") {
    if (dirtyScore && !confirm("当前评分尚未保存，确定退出吗？")) return;
    state.currentUserId = null;
    dirtyScore = false;
    saveState();
    render();
  }

  if (action === "reset-demo") {
    if (!confirm("确定重置所有演示数据吗？")) return;
    state = structuredClone(seedData);
    saveState();
    render();
  }

  if (action === "score-contestant") {
    renderScoreForm(target.dataset.id);
  }

  if (action === "submit-all") {
    const user = currentUser();
    const invalid = scoresForJudge(user.id).filter((score) => !isValidScore(score.totalScore));
    if (invalid.length) {
      showToast("还有小朋友未完成评分");
      return;
    }
    if (!confirm("提交后评分将锁定，确定提交全部评分吗？")) return;

    state.contestants.forEach((contestant) => {
      const score = getScore(user.id, contestant.id);
      setScore({ ...score, status: "submitted", submittedAt: new Date().toISOString() });
    });
    showToast("已提交全部评分");
    render();
  }

  if (action === "return-judge") {
    const judgeId = target.dataset.id;
    const reason = prompt("请输入退回原因（可留空）：", "需要重新核对评分");
    state.contestants.forEach((contestant) => {
      const score = getScore(judgeId, contestant.id);
      if (score.status !== "not_started") {
        setScore({
          ...score,
          status: "returned",
          returnedAt: new Date().toISOString(),
          returnedBy: currentUser().id,
          returnReason: reason || ""
        });
      }
    });
    state.auditLogs.push({
      id: crypto.randomUUID(),
      userId: currentUser().id,
      action: "return_scores",
      targetType: "judge",
      targetId: judgeId,
      details: reason || "",
      createdAt: new Date().toISOString()
    });
    saveState();
    showToast("已退回评委评分");
    render();
  }

  if (action === "reset-password") {
    const judge = state.users.find((user) => user.id === target.dataset.id);
    judge.password = "123456";
    judge.mustChangePassword = true;
    saveState();
    showToast(`${judge.name} 密码已重置为 123456`);
    render();
  }

  if (action === "generate-judge") {
    const index = judges().length + 1;
    state.users.push({
      id: crypto.randomUUID(),
      name: `评委 ${index}`,
      username: `judge${index}`,
      password: "123456",
      role: "judge",
      region: "阿德莱德赛区",
      mustChangePassword: true,
      hasLoggedIn: false
    });
    saveState();
    showToast(`已生成 judge${index} / 123456`);
    render();
  }

  if (action === "add-contestant") {
    const index = state.contestants.length + 1;
    state.contestants.push({
      id: crypto.randomUUID(),
      number: `A${String(index).padStart(3, "0")}`,
      name: `示例选手 ${index}`,
      age: 9,
      group: "小学组",
      title: "中文展示",
      order: index,
      notes: ""
    });
    saveState();
    showToast("已新增示例选手");
    render();
  }

  if (action === "export-csv") {
    exportResultsCsv();
  }
});

function exportResultsCsv() {
  const headers = [
    "排名",
    "编号",
    "姓名",
    "组别",
    "出场顺序",
    ...judges().map((judge) => `${judge.name}总分`),
    "去掉最高分",
    "去掉最低分",
    "最终平均分"
  ];

  const rows = rankedContestants().map(({ contestant, result, rank }) => [
    rank || "",
    contestant.number,
    contestant.name,
    contestant.group,
    contestant.order,
    ...judges().map((judge) => {
      const score = getScore(judge.id, contestant.id);
      return isValidScore(score.totalScore) ? Number(score.totalScore).toFixed(1) : "";
    }),
    result.high === "" ? "" : result.high.toFixed(1),
    result.low === "" ? "" : result.low.toFixed(1),
    result.average
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "汉语桥最终排名.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast("CSV 已导出");
}

window.addEventListener("beforeunload", (event) => {
  if (!dirtyScore) return;
  event.preventDefault();
  event.returnValue = "";
});

async function boot() {
  render();
  try {
    state = await loadState();
  } catch (error) {
    console.error(error);
    storageMode = "local";
    state = mergeState(loadLocalJson(STORAGE_KEY, dataPayloadFromState(seedData)));
    showToast("数据加载失败，已使用本地演示数据");
  } finally {
    isBooting = false;
    render();
  }
}

boot();
