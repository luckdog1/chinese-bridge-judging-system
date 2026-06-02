import { createClient } from "@supabase/supabase-js";

const STORAGE_KEY = "chinese-bridge-review-demo-v1";
const SESSION_KEY = "chinese-bridge-review-session-v1";
const LANGUAGE_KEY = "chinese-bridge-review-language-v1";
const SUPABASE_STATE_ID = "main";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const I18N = {
  zh: {
    appTitle: "汉语桥评审系统",
    eventTitle: "小学组 · 阿德莱德赛区 · 总决赛",
    bridgeMark: "桥",
    languageButton: "English",
    supabaseDb: "Supabase 数据库",
    localDemoData: "本地演示数据",
    resetData: "重置数据",
    logout: "退出",
    superAdmin: "一级管理员",
    regionalAdmin: "二级管理员",
    judge: "评委",
    notStarted: "未评分",
    draft: "已保存",
    submitted: "已提交",
    returned: "被退回",
    inProgress: "进行中",
    saved: "已保存",
    notLoggedIn: "未登录",
    loggedIn: "已登录",
    changed: "已修改",
    notChanged: "未修改",
    yes: "是",
    no: "否",
    bootTitle: "汉语桥（小学组）现场评审",
    bootText: "正在加载比赛数据，请稍候。",
    loadingData: "加载数据",
    connectingSupabase: "正在连接 Supabase 数据库。",
    usingLocalData: "未配置 Supabase，正在使用本地演示数据。",
    loginTitle: "登录",
    loginIntro: "面向评委现场评分、管理员实时查看进度与最终排名的简洁原型。配置 Supabase 后，数据会从数据库动态加载。",
    supabaseConnected: "当前已连接 Supabase 数据库。",
    localConnected: "当前未配置 Supabase，正在使用本地演示数据。",
    username: "账号",
    password: "密码",
    login: "登录",
    demoAccounts: "演示账号",
    adminDemo: "管理员：admin / admin123",
    judgeDemo: "评委：judge1 到 judge6 / 123456",
    forceChangeTitle: "首次登录需要修改密码",
    forceChangeText: "这是评委进入评分页前的强制步骤，用来模拟现场账号首次分发后的安全要求。",
    enterNewPassword: "请输入新密码后继续评分。",
    newPassword: "新密码",
    saveAndEnter: "保存并进入",
    backLogin: "返回登录",
    dashboard: "比赛概览",
    contestants: "参赛小朋友",
    judges: "评委账户",
    rawScores: "原始评分",
    results: "最终排名",
    overviewHeroTitle: "现场评分稳定、清晰、可追踪",
    overviewHeroText: "评委保存草稿并最终提交；管理员实时查看进度、退回修改、计算去最高最低后的最终排名。",
    contestantCount: "参赛小朋友",
    judgeCount: "评委人数",
    readyResults: "已出正式排名",
    overviewTitle: "比赛概览",
    overviewText: "当前显示比赛数据，刷新后保存状态会保留。",
    judgeSubmissions: "评委提交",
    scoreItems: "评分项目",
    region: "赛区",
    progressTitle: "评分进度",
    loginStatus: "登录",
    changedInitialPassword: "首次改密",
    scored: "已评分",
    status: "状态",
    contestantManagement: "参赛小朋友管理",
    contestantText: "第一版先用内置名单模拟 Excel 导入后的数据结构。",
    addSampleContestant: "新增示例选手",
    number: "编号",
    name: "姓名",
    age: "年龄",
    group: "组别",
    performance: "表演项目",
    order: "出场顺序",
    notes: "备注",
    judgeManagement: "评委账户管理",
    judgeManagementText: "支持自定义评委姓名、登录账号、赛区和初始密码，也可以重置密码、退回已提交评分。",
    judgeName: "评委姓名",
    loginAccount: "登录账号",
    initialPassword: "初始密码",
    createJudge: "创建评委账号",
    passwordChanged: "已改密",
    progress: "进度",
    actions: "操作",
    resetPassword: "重置密码",
    returnForEdit: "退回修改",
    rawScoresText: "按小朋友展示每位评委的总分和状态。",
    finalResultsTitle: "最终成绩与排名",
    finalResultsText: "所有评委提交后自动去掉一个最高分和一个最低分，保留两位小数。",
    exportCsv: "导出 CSV",
    rank: "排名",
    sequence: "顺序",
    highDropped: "去掉最高",
    lowDropped: "去掉最低",
    finalAverage: "最终平均",
    waitingAllSubmitted: "待全部提交",
    judgeDashboard: "评分总览",
    judgeContestants: "参赛列表",
    judgeSubmit: "最终提交",
    welcomeScore: "欢迎评分",
    judgeHeroText: "请按出场顺序完成所有小朋友评分。保存草稿后可以继续修改，最终提交后会锁定，除非管理员退回。",
    currentStatus: "当前状态",
    fullScore: "满分",
    contestantListText: "按出场顺序排列，所有小朋友都有总分后才能最终提交。",
    totalScore: "总分",
    score: "评分",
    goSubmit: "去最终提交",
    submitTitle: "最终提交",
    submitText: "提交前系统会检查每位小朋友都有 0 到 100 之间的总分。",
    scoreCount: "评分数量",
    missingScores: "待补评分",
    submitAll: "提交全部评分",
    backContestants: "返回参赛列表",
    back: "返回",
    scoreDetails: "评分细则",
    detailsHint: "细则可选填；填写后会自动汇总到总分，评委仍可手动调整总分。",
    maxScore: "满分",
    totalScoreRequired: "总分（必填，0-100）",
    commentOptional: "评语（选填）",
    save: "Save 保存",
    language: "语言表达",
    content: "内容理解",
    stage: "舞台表现",
    creativity: "整体印象",
    invalidLogin: "账号或密码不正确",
    passwordMin: "新密码至少 6 位",
    passwordChangedToast: "密码已修改",
    fillJudgeFields: "请填写评委姓名、登录账号和赛区",
    initialPasswordMin: "初始密码至少 6 位",
    usernameExists: "这个登录账号已经存在",
    createdJudge: "已创建",
    totalScoreInvalid: "总分必须在 0 到 100 之间",
    scoreSaved: "评分已保存",
    unsavedLeave: "当前评分尚未保存，确定离开吗？",
    unsavedLogout: "当前评分尚未保存，确定退出吗？",
    confirmReset: "确定重置所有演示数据吗？",
    missingAllScores: "还有小朋友未完成评分",
    confirmSubmit: "提交后评分将锁定，确定提交全部评分吗？",
    allSubmitted: "已提交全部评分",
    returnReasonPrompt: "请输入退回原因（可留空）：",
    returnReasonDefault: "需要重新核对评分",
    returnedToast: "已退回评委评分",
    passwordResetTo: "密码已重置为",
    sampleContestant: "示例选手",
    chineseShow: "中文展示",
    sampleAdded: "已新增示例选手",
    csvExported: "CSV 已导出",
    dataLoadFailed: "数据加载失败，已使用本地演示数据",
    saveRemoteFailed: "Supabase 保存失败，已临时切换为本地保存",
    mustBeNumber: "必须是数字",
    cannotLessThanZero: "不能小于 0",
    cannotExceed: "不能超过",
    points: "分"
  },
  en: {
    appTitle: "Chinese Bridge Judging System",
    eventTitle: "Primary Group · Adelaide Region · Final",
    bridgeMark: "桥",
    languageButton: "中文",
    supabaseDb: "Supabase Database",
    localDemoData: "Local Demo Data",
    resetData: "Reset Data",
    logout: "Logout",
    superAdmin: "Super Admin",
    regionalAdmin: "Regional Admin",
    judge: "Judge",
    notStarted: "Not scored",
    draft: "Saved",
    submitted: "Submitted",
    returned: "Returned",
    inProgress: "In progress",
    saved: "Saved",
    notLoggedIn: "Not logged in",
    loggedIn: "Logged in",
    changed: "Changed",
    notChanged: "Not changed",
    yes: "Yes",
    no: "No",
    bootTitle: "Chinese Bridge Primary Group Judging",
    bootText: "Loading contest data. Please wait.",
    loadingData: "Loading data",
    connectingSupabase: "Connecting to Supabase.",
    usingLocalData: "Supabase is not configured. Using local demo data.",
    loginTitle: "Login",
    loginIntro: "A judging prototype for on-site scoring, admin progress tracking, and final rankings. After Supabase is configured, data loads from the database.",
    supabaseConnected: "Connected to Supabase.",
    localConnected: "Supabase is not configured. Using local demo data.",
    username: "Username",
    password: "Password",
    login: "Login",
    demoAccounts: "Demo accounts",
    adminDemo: "Admin: admin / admin123",
    judgeDemo: "Judges: judge1 to judge6 / 123456",
    forceChangeTitle: "Password change required",
    forceChangeText: "Judges must change the initial password before entering the scoring pages.",
    enterNewPassword: "Enter a new password to continue.",
    newPassword: "New password",
    saveAndEnter: "Save and enter",
    backLogin: "Back to login",
    dashboard: "Overview",
    contestants: "Contestants",
    judges: "Judge Accounts",
    rawScores: "Raw Scores",
    results: "Final Results",
    overviewHeroTitle: "Stable, clear, traceable judging",
    overviewHeroText: "Judges save drafts and submit final scores. Admins track progress, return scores for edits, and calculate final rankings.",
    contestantCount: "Contestants",
    judgeCount: "Judges",
    readyResults: "Final rankings",
    overviewTitle: "Contest Overview",
    overviewText: "Showing contest data. Saved data is retained after refresh.",
    judgeSubmissions: "Judge submissions",
    scoreItems: "Score items",
    region: "Region",
    progressTitle: "Scoring Progress",
    loginStatus: "Login",
    changedInitialPassword: "Initial password",
    scored: "Scored",
    status: "Status",
    contestantManagement: "Contestant Management",
    contestantText: "This first version uses built-in sample contestants to simulate Excel import data.",
    addSampleContestant: "Add sample contestant",
    number: "Number",
    name: "Name",
    age: "Age",
    group: "Group",
    performance: "Performance",
    order: "Order",
    notes: "Notes",
    judgeManagement: "Judge Account Management",
    judgeManagementText: "Create custom judge names, usernames, regions, and initial passwords. Reset passwords or return submitted scores for editing.",
    judgeName: "Judge name",
    loginAccount: "Username",
    initialPassword: "Initial password",
    createJudge: "Create judge account",
    passwordChanged: "Password changed",
    progress: "Progress",
    actions: "Actions",
    resetPassword: "Reset password",
    returnForEdit: "Return for edits",
    rawScoresText: "View each judge's total score and status by contestant.",
    finalResultsTitle: "Final Scores and Ranking",
    finalResultsText: "After all judges submit, one highest and one lowest score are dropped. Final averages keep two decimals.",
    exportCsv: "Export CSV",
    rank: "Rank",
    sequence: "Order",
    highDropped: "Highest dropped",
    lowDropped: "Lowest dropped",
    finalAverage: "Final average",
    waitingAllSubmitted: "Waiting for all submissions",
    judgeDashboard: "Scoring Overview",
    judgeContestants: "Contestant List",
    judgeSubmit: "Final Submit",
    welcomeScore: "welcome",
    judgeHeroText: "Score every contestant in performance order. Saved drafts can be edited. Final submissions are locked unless returned by an admin.",
    currentStatus: "Current status",
    fullScore: "Full score",
    contestantListText: "Contestants are ordered by performance order. Every contestant needs a total score before final submission.",
    totalScore: "Total score",
    score: "Score",
    goSubmit: "Go to final submit",
    submitTitle: "Final Submit",
    submitText: "Before submission, every contestant must have a total score from 0 to 100.",
    scoreCount: "Scored",
    missingScores: "Missing",
    submitAll: "Submit all scores",
    backContestants: "Back to contestant list",
    back: "Back",
    scoreDetails: "Score Details",
    detailsHint: "Details are optional. When entered, they are summed into the total score, which can still be manually adjusted.",
    maxScore: "Max",
    totalScoreRequired: "Total score (required, 0-100)",
    commentOptional: "Comment (optional)",
    save: "Save",
    language: "Language expression",
    content: "Content understanding",
    stage: "Stage performance",
    creativity: "Overall impression",
    invalidLogin: "Invalid username or password",
    passwordMin: "New password must be at least 6 characters",
    passwordChangedToast: "Password changed",
    fillJudgeFields: "Please enter judge name, username, and region",
    initialPasswordMin: "Initial password must be at least 6 characters",
    usernameExists: "This username already exists",
    createdJudge: "Created",
    totalScoreInvalid: "Total score must be between 0 and 100",
    scoreSaved: "Score saved",
    unsavedLeave: "Current score is not saved. Leave anyway?",
    unsavedLogout: "Current score is not saved. Logout anyway?",
    confirmReset: "Reset all demo data?",
    missingAllScores: "Some contestants are missing scores",
    confirmSubmit: "Scores will be locked after submission. Submit all scores?",
    allSubmitted: "All scores submitted",
    returnReasonPrompt: "Enter return reason (optional):",
    returnReasonDefault: "Needs score review",
    returnedToast: "Judge scores returned",
    passwordResetTo: "Password reset to",
    sampleContestant: "Sample contestant",
    chineseShow: "Chinese presentation",
    sampleAdded: "Sample contestant added",
    csvExported: "CSV exported",
    dataLoadFailed: "Data failed to load. Using local demo data.",
    saveRemoteFailed: "Supabase save failed. Switched to local save temporarily.",
    mustBeNumber: "must be a number",
    cannotLessThanZero: "cannot be less than 0",
    cannotExceed: "cannot exceed",
    points: "points"
  }
};

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
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "zh";

function t(key) {
  return I18N[currentLanguage]?.[key] || I18N.zh[key] || key;
}

function scoreItemName(item) {
  return t(item.id) || item.name;
}

function languageButton() {
  return `
    <button class="language-toggle" data-action="toggle-language" aria-label="Switch language">
      <span class="${currentLanguage === "zh" ? "active" : ""}">ZH</span>
      <span class="${currentLanguage === "en" ? "active" : ""}">EN</span>
    </button>
  `;
}

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
      showToast(t("saveRemoteFailed"));
      render();
    }
  }, 150);
}

function roleLabel(role) {
  return {
    super_admin: t("superAdmin"),
    regional_admin: t("regionalAdmin"),
    judge: t("judge")
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
    not_started: t("notStarted"),
    draft: t("draft"),
    submitted: t("submitted"),
    returned: t("returned"),
    in_progress: t("inProgress")
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

function validateScoreDetails(details) {
  for (const item of state.scoreItems) {
    const rawValue = details[item.id];
    if (rawValue === "" || rawValue === undefined || rawValue === null) continue;

    const value = Number(rawValue);
    if (!Number.isFinite(value)) {
      return `${scoreItemName(item)} ${t("mustBeNumber")}`;
    }

    if (value < 0) {
      return `${scoreItemName(item)} ${t("cannotLessThanZero")}`;
    }

    if (value > item.max) {
      return `${scoreItemName(item)} ${t("cannotExceed")} ${item.max} ${t("points")}`;
    }
  }

  return "";
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
  const storageLabel = storageMode === "supabase" ? t("supabaseDb") : t("localDemoData");
  const adminControls =
    user.role === "judge"
      ? ""
      : `
          <span class="badge ${storageMode === "supabase" ? "ok" : "warn"}">${storageLabel}</span>
          <button class="btn ghost" data-action="reset-demo">${t("resetData")}</button>
        `;

  return `
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">${t("bridgeMark")}</div>
          <div>
            <h1>${t("appTitle")}</h1>
            <p>${t("eventTitle")}</p>
          </div>
        </div>
        <div class="userbar">
          <span class="badge">${escapeHtml(user.name)} · ${role}</span>
          ${adminControls}
          ${languageButton()}
          <button class="btn" data-action="logout">${t("logout")}</button>
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
        <h1>${t("bootTitle")}</h1>
        <p>${t("bootText")}</p>
      </section>
      <section class="login-panel">
        <div class="login-tools">${languageButton()}</div>
        <h2>${t("loadingData")}</h2>
        <p>${supabase ? t("connectingSupabase") : t("usingLocalData")}</p>
      </section>
    </div>
  `;
}

function renderLogin() {
  document.querySelector("#app").innerHTML = `
    <div class="login-page">
      <section class="login-visual">
        <h1>${t("bootTitle")}</h1>
        <p>${t("loginIntro")}</p>
      </section>
      <section class="login-panel">
        <div class="login-tools">${languageButton()}</div>
        <h2>${t("loginTitle")}</h2>
        <p>${storageMode === "supabase" ? t("supabaseConnected") : t("localConnected")}</p>
        <form class="form" data-form="login">
          <div class="field">
            <label for="username">${t("username")}</label>
            <input class="input" id="username" name="username" autocomplete="username" value="admin" />
          </div>
          <div class="field">
            <label for="password">${t("password")}</label>
            <input class="input" id="password" name="password" type="password" autocomplete="current-password" value="admin123" />
          </div>
          <button class="btn primary" type="submit">${t("login")}</button>
        </form>
        <div class="account-list">
          <strong>${t("demoAccounts")}</strong>
          <span>${t("adminDemo")}</span>
          <span>${t("judgeDemo")}</span>
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
        <h1>${t("forceChangeTitle")}</h1>
        <p>${t("forceChangeText")}</p>
      </section>
      <section class="login-panel">
        <div class="login-tools">${languageButton()}</div>
        <h2>${escapeHtml(user.name)}</h2>
        <p>${t("enterNewPassword")}</p>
        <form class="form" data-form="change-password">
          <div class="field">
            <label for="new-password">${t("newPassword")}</label>
            <input class="input" id="new-password" name="password" type="password" minlength="6" required />
          </div>
          <button class="btn primary" type="submit">${t("saveAndEnter")}</button>
          <button class="btn ghost" type="button" data-action="logout">${t("backLogin")}</button>
        </form>
      </section>
    </div>
  `;
}

function renderAdminApp() {
  const nav = [
    navButton("dashboard", t("dashboard"), "▣"),
    navButton("contestants", t("contestants"), "☷"),
    navButton("judges", t("judges"), "◎"),
    navButton("scores", t("rawScores"), "◇"),
    navButton("results", t("results"), "★")
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
        <td>${judge.hasLoggedIn ? t("loggedIn") : t("notLoggedIn")}</td>
        <td>${judge.mustChangePassword ? t("notChanged") : t("changed")}</td>
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
        <h2>${t("overviewHeroTitle")}</h2>
        <p>${t("overviewHeroText")}</p>
      </div>
      <div class="hero-stat">
        <div class="stat-line"><span>${t("contestantCount")}</span><strong>${state.contestants.length}</strong></div>
        <div class="stat-line"><span>${t("judgeCount")}</span><strong>${judges().length}</strong></div>
        <div class="stat-line"><span>${t("readyResults")}</span><strong>${readyCount}</strong></div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${t("overviewTitle")}</h2>
          <p>${t("overviewText")}</p>
        </div>
      </div>
      <div class="panel-body">
        <div class="grid cols-3">
          <div class="metric"><span>${t("judgeSubmissions")}</span><strong>${submittedCount}/${judges().length}</strong></div>
          <div class="metric"><span>${t("scoreItems")}</span><strong>${state.scoreItems.length}</strong></div>
          <div class="metric"><span>${t("region")}</span><strong>Adelaide</strong></div>
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-head"><h2>${t("progressTitle")}</h2></div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>${t("judge")}</th><th>${t("loginStatus")}</th><th>${t("changedInitialPassword")}</th><th>${t("scored")}</th><th>${t("status")}</th></tr>
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
          <h2>${t("contestantManagement")}</h2>
          <p>${t("contestantText")}</p>
        </div>
        <button class="btn primary" data-action="add-contestant">${t("addSampleContestant")}</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>${t("number")}</th><th>${t("name")}</th><th>${t("age")}</th><th>${t("group")}</th><th>${t("performance")}</th><th>${t("order")}</th><th>${t("notes")}</th></tr>
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
          <td>${judge.mustChangePassword ? t("no") : t("yes")}</td>
          <td>${progress}/${state.contestants.length}</td>
          <td><span class="badge ${statusClass(status)}">${statusText(status)}</span></td>
          <td class="actions">
            <button class="btn ghost" data-action="reset-password" data-id="${judge.id}">${t("resetPassword")}</button>
            <button class="btn danger" data-action="return-judge" data-id="${judge.id}" ${status === "not_started" ? "disabled" : ""}>${t("returnForEdit")}</button>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${t("judgeManagement")}</h2>
          <p>${t("judgeManagementText")}</p>
        </div>
      </div>
      <div class="panel-body">
        <form class="form" data-form="judge-account">
          <div class="grid cols-2">
            <div class="field">
              <label for="judge-name">${t("judgeName")}</label>
              <input class="input" id="judge-name" name="name" placeholder="Judge name" required />
            </div>
            <div class="field">
              <label for="judge-username">${t("loginAccount")}</label>
              <input class="input" id="judge-username" name="username" placeholder="judge-zhang" required />
            </div>
            <div class="field">
              <label for="judge-region">${t("region")}</label>
              <input class="input" id="judge-region" name="region" value="${currentLanguage === "zh" ? "阿德莱德赛区" : "Adelaide Region"}" required />
            </div>
            <div class="field">
              <label for="judge-password">${t("initialPassword")}</label>
              <input class="input" id="judge-password" name="password" value="123456" minlength="6" required />
            </div>
          </div>
          <div class="actions">
            <button class="btn primary" type="submit">${t("createJudge")}</button>
          </div>
        </form>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>${t("name")}</th><th>${t("username")}</th><th>${t("region")}</th><th>${t("passwordChanged")}</th><th>${t("progress")}</th><th>${t("status")}</th><th>${t("actions")}</th></tr>
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
          <h2>${t("rawScores")}</h2>
          <p>${t("rawScoresText")}</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>${t("number")}</th><th>${t("name")}</th>${headers}</tr></thead>
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
          <td><strong>${result.average || t("waitingAllSubmitted")}</strong></td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${t("finalResultsTitle")}</h2>
          <p>${t("finalResultsText")}</p>
        </div>
        <button class="btn primary" data-action="export-csv">${t("exportCsv")}</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>${t("rank")}</th><th>${t("number")}</th><th>${t("name")}</th><th>${t("group")}</th><th>${t("sequence")}</th>${judgeHeaders}<th>${t("highDropped")}</th><th>${t("lowDropped")}</th><th>${t("finalAverage")}</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderJudgeApp() {
  const nav = [
    navButton("judge-dashboard", t("judgeDashboard"), "▣"),
    navButton("judge-contestants", t("judgeContestants"), "☷"),
    navButton("judge-submit", t("judgeSubmit"), "✓")
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
        <h2>${escapeHtml(user.name)}${currentLanguage === "zh" ? "，" : ", "}${t("welcomeScore")}</h2>
        <p>${t("judgeHeroText")}</p>
      </div>
      <div class="hero-stat">
        <div class="stat-line"><span>${t("scored")}</span><strong>${saved}/${state.contestants.length}</strong></div>
        <div class="stat-line"><span>${t("currentStatus")}</span><strong>${statusText(status)}</strong></div>
        <div class="stat-line"><span>${t("fullScore")}</span><strong>100</strong></div>
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
          <td><button class="btn primary" data-action="score-contestant" data-id="${contestant.id}" ${isLocked ? "disabled" : ""}>${t("score")}</button></td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${t("judgeContestants")}</h2>
          <p>${t("contestantListText")}</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>${t("sequence")}</th><th>${t("number")}</th><th>${t("name")}</th><th>${t("performance")}</th><th>${t("totalScore")}</th><th>${t("status")}</th><th>${t("actions")}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="panel-body">
        <div class="actions">
          <button class="btn primary" data-view="judge-submit">${t("goSubmit")}</button>
        </div>
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
          <h2>${t("submitTitle")}</h2>
          <p>${t("submitText")}</p>
        </div>
      </div>
      <div class="panel-body grid">
        <div class="grid cols-3">
          <div class="metric"><span>${t("scoreCount")}</span><strong>${scores.length - invalid.length}/${scores.length}</strong></div>
          <div class="metric"><span>${t("currentStatus")}</span><strong>${statusText(status)}</strong></div>
          <div class="metric"><span>${t("missingScores")}</span><strong>${invalid.length}</strong></div>
        </div>
        <div class="actions">
          <button class="btn primary" data-action="submit-all" ${invalid.length || status === "submitted" ? "disabled" : ""}>${t("submitAll")}</button>
          <button class="btn ghost" data-view="judge-contestants">${t("backContestants")}</button>
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
          <span>${escapeHtml(scoreItemName(item))}${currentLanguage === "zh" ? `（${t("maxScore")} ${item.max}）` : ` (${t("maxScore")} ${item.max})`}</span>
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
            <p>${escapeHtml(contestant.title)}${currentLanguage === "zh" ? "，" : ", "}${t("order")} ${contestant.order}${currentLanguage === "zh" ? "，" : ", "}${escapeHtml(contestant.group)}</p>
          </div>
          <button class="btn ghost" data-view="judge-contestants">${t("back")}</button>
        </div>
        <div class="panel-body">
          <form class="form" data-form="score" data-id="${contestant.id}">
            <div>
              <h3 class="section-title">${t("scoreDetails")}</h3>
              <p class="muted">${t("detailsHint")}</p>
            </div>
            <div class="score-grid">${detailInputs}</div>
            <div class="grid cols-2">
              <div class="field">
                <label for="total-score">${t("totalScoreRequired")}</label>
                <input class="input" id="total-score" name="totalScore" type="number" min="0" max="100" step="0.5" value="${escapeHtml(score.totalScore)}" required />
              </div>
              <div class="field">
                <label for="comment">${t("commentOptional")}</label>
                <textarea class="textarea" id="comment" name="comment">${escapeHtml(score.comment)}</textarea>
              </div>
            </div>
            <div class="actions">
              <button class="btn primary" type="submit">${t("save")}</button>
              <button class="btn ghost" type="button" data-view="judge-submit">${t("goSubmit")}</button>
            </div>
          </form>
        </div>
      </section>
    `,
    [navButton("judge-dashboard", t("judgeDashboard"), "▣"), navButton("judge-contestants", t("judgeContestants"), "☷"), navButton("judge-submit", t("judgeSubmit"), "✓")].join("")
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
      showToast(t("invalidLogin"));
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
      showToast(t("passwordMin"));
      return;
    }
    user.password = password;
    user.mustChangePassword = false;
    saveState();
    showToast(t("passwordChangedToast"));
    render();
    return;
  }

  if (formType === "judge-account") {
    const formData = new FormData(form);
    const name = String(formData.get("name")).trim();
    const username = String(formData.get("username")).trim();
    const region = String(formData.get("region")).trim();
    const password = String(formData.get("password"));

    if (!name || !username || !region) {
      showToast(t("fillJudgeFields"));
      return;
    }

    if (password.length < 6) {
      showToast(t("initialPasswordMin"));
      return;
    }

    const usernameExists = state.users.some(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (usernameExists) {
      showToast(t("usernameExists"));
      return;
    }

    state.users.push({
      id: crypto.randomUUID(),
      name,
      username,
      password,
      role: "judge",
      region,
      mustChangePassword: true,
      hasLoggedIn: false
    });
    saveState();
    showToast(`${t("createdJudge")} ${name} / ${username}`);
    form.reset();
    render();
    return;
  }

  if (formType === "score") {
    const user = currentUser();
    const contestantId = form.dataset.id;
    const formData = new FormData(form);
    const totalScore = String(formData.get("totalScore"));

    if (!isValidScore(totalScore)) {
      showToast(t("totalScoreInvalid"));
      return;
    }

    const details = {};
    state.scoreItems.forEach((item) => {
      const value = String(formData.get(`detail-${item.id}`));
      if (value !== "") details[item.id] = value;
    });

    const detailsError = validateScoreDetails(details);
    if (detailsError) {
      showToast(detailsError);
      return;
    }

    const oldScore = getScore(user.id, contestantId);
    setScore({
      ...oldScore,
      totalScore,
      comment: String(formData.get("comment")),
      details: Object.fromEntries(Object.entries(details).map(([key, value]) => [key, Number(value)])),
      status: oldScore.status === "returned" ? "returned" : "draft"
    });

    dirtyScore = false;
    showToast(t("scoreSaved"));
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
      const value = Number(input.value);
      if (Number.isFinite(value) && value >= 0 && value <= item.max) {
        sum += value;
      }
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
    if (dirtyScore && !confirm(t("unsavedLeave"))) return;
    dirtyScore = false;
    state.activeView = view;
    saveState();
    render();
    return;
  }

  const action = target.dataset.action;
  if (!action) return;

  if (action === "toggle-language") {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    render();
    return;
  }

  if (action === "logout") {
    if (dirtyScore && !confirm(t("unsavedLogout"))) return;
    state.currentUserId = null;
    dirtyScore = false;
    saveState();
    render();
  }

  if (action === "reset-demo") {
    if (!confirm(t("confirmReset"))) return;
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
      showToast(t("missingAllScores"));
      return;
    }
    if (!confirm(t("confirmSubmit"))) return;

    state.contestants.forEach((contestant) => {
      const score = getScore(user.id, contestant.id);
      setScore({ ...score, status: "submitted", submittedAt: new Date().toISOString() });
    });
    showToast(t("allSubmitted"));
    render();
  }

  if (action === "return-judge") {
    const judgeId = target.dataset.id;
    const reason = prompt(t("returnReasonPrompt"), t("returnReasonDefault"));
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
    showToast(t("returnedToast"));
    render();
  }

  if (action === "reset-password") {
    const judge = state.users.find((user) => user.id === target.dataset.id);
    judge.password = "123456";
    judge.mustChangePassword = true;
    saveState();
    showToast(`${judge.name} ${t("passwordResetTo")} 123456`);
    render();
  }

  if (action === "add-contestant") {
    const index = state.contestants.length + 1;
    state.contestants.push({
      id: crypto.randomUUID(),
      number: `A${String(index).padStart(3, "0")}`,
      name: `${t("sampleContestant")} ${index}`,
      age: 9,
      group: currentLanguage === "zh" ? "小学组" : "Primary Group",
      title: t("chineseShow"),
      order: index,
      notes: ""
    });
    saveState();
    showToast(t("sampleAdded"));
    render();
  }

  if (action === "export-csv") {
    exportResultsCsv();
  }
});

function exportResultsCsv() {
  const headers = [
    t("rank"),
    t("number"),
    t("name"),
    t("group"),
    t("order"),
    ...judges().map((judge) => `${judge.name} ${t("totalScore")}`),
    t("highDropped"),
    t("lowDropped"),
    t("finalAverage")
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
  link.download = currentLanguage === "zh" ? "汉语桥最终排名.csv" : "chinese-bridge-final-ranking.csv";
  link.click();
  URL.revokeObjectURL(url);
  showToast(t("csvExported"));
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
    showToast(t("dataLoadFailed"));
  } finally {
    isBooting = false;
    render();
  }
}

boot();
