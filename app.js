(() => {
  'use strict';

  const STORAGE_KEY = 'gonggangmatch.demo.v1';
  const USER = { id: 'seoyeon', name: '서연', role: '팀장' };
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const isoToday = () => { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const dateOffset = n => { const d = new Date(); d.setDate(d.getDate() + n); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const uid = () => Math.random().toString(36).slice(2, 9);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name, size = 18) => {
    const paths = {
      check: '<path d="m5 12 4 4L19 6"/>', plus: '<path d="M12 5v14M5 12h14"/>',
      arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>', file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
      copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
      alert: '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
      clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
      x: '<path d="m18 6-12 12M6 6l12 12"/>',
      logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5m5 5H9"/>',
      chevron: '<path d="m6 9 6 6 6-6"/>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;
  };

  const seed = () => ({
    loggedIn: true,
    currentUser: USER,
    activeProjectId: 'marketing',
    projects: [{
      id: 'marketing', subject: '마케팅 전략', title: '브랜드 캠페인 기획', deadline: dateOffset(21), teamSize: 4, ownerId: USER.id,
      inviteCode: 'campaign-seoyeon', inviteCreatedAt: Date.now(),
      members: [
        { id: 'seoyeon', name: '서연', role: '팀장', joinedAt: dateOffset(-15) },
        { id: 'jihoon', name: '지훈', role: '팀원', joinedAt: dateOffset(-14) },
        { id: 'minji', name: '민지', role: '팀원', joinedAt: dateOffset(-14) },
        { id: 'doyoon', name: '도윤', role: '팀원', joinedAt: dateOffset(-13) },
      ], tasks: [
        { id: 'task1', title: '경쟁사 3곳 포지셔닝 비교', description: '주요 타깃과 메시지, 채널을 표로 정리해요.', assigneeId: 'seoyeon', due: dateOffset(1), status: 'progress', resultUrl: '', note: '', createdAt: Date.now() - 86400000 * 2, history: [{ user: '서연', text: '업무 생성 → 서연 배정', at: Date.now() - 86400000 * 2 }, { user: '서연', text: '상태 변경: 할 일 → 진행 중', at: Date.now() - 86400000 }] },
        { id: 'task2', title: '고객 인터뷰 인사이트 정리', description: '인터뷰 5건에서 반복되는 요구를 묶어요.', assigneeId: 'jihoon', due: dateOffset(-1), status: 'todo', resultUrl: '', note: '', createdAt: Date.now() - 86400000 * 3, history: [{ user: '서연', text: '업무 생성 → 지훈 배정', at: Date.now() - 86400000 * 3 }] },
        { id: 'task3', title: '캠페인 콘셉트 초안', description: '', assigneeId: 'minji', due: dateOffset(3), status: 'progress', resultUrl: '', note: '', createdAt: Date.now() - 86400000 * 3, history: [{ user: '서연', text: '업무 생성 → 민지 배정', at: Date.now() - 86400000 * 3 }, { user: '민지', text: '상태 변경: 할 일 → 진행 중', at: Date.now() - 86400000 }] },
        { id: 'task4', title: '발표 자료 목차 구성', description: '', assigneeId: 'doyoon', due: dateOffset(5), status: 'todo', resultUrl: '', note: '', createdAt: Date.now() - 86400000 * 2, history: [{ user: '서연', text: '업무 생성 → 도윤 배정', at: Date.now() - 86400000 * 2 }] },
        { id: 'task5', title: '프로젝트 목표와 핵심 지표 정리', description: '캠페인 성공 기준을 팀과 합의했어요.', assigneeId: 'seoyeon', due: dateOffset(-2), status: 'done', resultUrl: 'https://docs.google.com/document/d/marketing-goals', note: '팀 회의에서 확정', createdAt: Date.now() - 86400000 * 8, completedAt: Date.now() - 86400000, history: [{ user: '서연', text: '업무 생성 → 서연 배정', at: Date.now() - 86400000 * 8 }, { user: '서연', text: '상태 변경: 할 일 → 진행 중', at: Date.now() - 86400000 * 4 }, { user: '서연', text: '상태 변경: 진행 중 → 완료 (지연)', at: Date.now() - 86400000 }] },
        { id: 'task6', title: '브랜드 레퍼런스 수집', description: '', assigneeId: 'jihoon', due: dateOffset(2), status: 'done', resultUrl: 'https://drive.google.com/brand-references', note: '', createdAt: Date.now() - 86400000 * 7, completedAt: Date.now() - 86400000 * 3, history: [{ user: '서연', text: '업무 생성 → 지훈 배정', at: Date.now() - 86400000 * 7 }, { user: '지훈', text: '상태 변경: 할 일 → 진행 중', at: Date.now() - 86400000 * 5 }, { user: '지훈', text: '상태 변경: 진행 중 → 완료', at: Date.now() - 86400000 * 3 }] },
        { id: 'task7', title: '타깃 고객 페르소나 정리', description: '', assigneeId: 'minji', due: dateOffset(0), status: 'todo', resultUrl: '', note: '', createdAt: Date.now() - 86400000 * 3, history: [{ user: '서연', text: '업무 생성 → 민지 배정', at: Date.now() - 86400000 * 3 }] },
      ],
    }],
  });

  let state;
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || seed(); } catch { state = seed(); }
  state.currentUser ||= USER; state.projects ||= seed().projects;
  let view = state.loggedIn ? 'board' : 'login';
  let boardTab = 'tasks';
  let toastTimer;

  const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const project = () => state.projects.find(p => p.id === state.activeProjectId) || state.projects[0];
  const member = id => project().members.find(m => m.id === id) || { id, name: '알 수 없음', role: '팀원' };
  const today = () => isoToday();
  const dateDiff = date => Math.round((new Date(`${date}T00:00:00`) - new Date(`${today()}T00:00:00`)) / 86400000);
  const prettyDate = date => { const d = new Date(`${date}T00:00:00`); return `${d.getMonth()+1}/${String(d.getDate()).padStart(2,'0')}`; };
  const stamp = time => { const d = new Date(time); return `${d.getMonth()+1}/${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; };
  const isLate = t => t.status === 'done' && t.completedAt && new Date(t.completedAt).toISOString().slice(0,10) > t.due;
  const isOverdue = t => t.status !== 'done' && dateDiff(t.due) < 0;
  const tasks = () => project().tasks;
  const doneTasks = () => tasks().filter(t => t.status === 'done').length;
  const pct = () => tasks().length ? Math.round(doneTasks() / tasks().length * 100) : 0;

  function toast(message, type = 'success') {
    const el = $('#toast'); el.textContent = message; el.className = `toast ${type}`; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 3000);
  }

  function header(active = '') {
    const p = project();
    return `<header class="site-header"><div class="header-inner">
      <a class="brand" href="#" data-action="go-board" aria-label="공강맞춤 홈"><span class="brand-mark">${icon('check',17)}</span><span>공강맞춤</span></a>
      <nav class="main-nav" aria-label="주요 메뉴"><button class="nav-link ${active==='projects'?'active':''}" data-action="go-board">프로젝트</button><button class="nav-link" data-action="go-new-project">새 프로젝트</button><button class="nav-link ${active==='invite'?'active':''}" data-action="go-invite">팀원 초대</button></nav>
      <div class="header-user"><span class="avatar" aria-hidden="true">${esc((state.currentUser.name||'서')[0])}</span><span class="user-name">${esc(state.currentUser.name||'서연')}<span class="mobile-context"> · ${esc(p?.subject||'프로젝트')}</span></span><button class="nav-link" data-action="logout" aria-label="로그아웃" title="로그아웃">${icon('logout',17)}</button></div>
    </div></header>`;
  }

  function shell(content, active = '') { return `<div class="shell">${header(active)}${content}</div>`; }

  function progressPanel() {
    return `<section class="progress-panel" aria-label="프로젝트 진행률"><div class="progress-head"><span class="progress-label">전체 진행률</span><span class="progress-value">${pct()}%</span></div><div class="progress-track" role="progressbar" aria-valuenow="${pct()}" aria-valuemin="0" aria-valuemax="100" aria-label="전체 진행률 ${pct()}%"><div class="progress-fill" style="width:${pct()}%"></div></div></section>`;
  }

  function notice() {
    const dueSoon = tasks().filter(t => t.status !== 'done' && dateDiff(t.due) === 1);
    const overdue = tasks().filter(isOverdue);
    if (!dueSoon.length && !overdue.length) return '';
    const type = overdue.length ? 'danger' : 'warning';
    const message = overdue.length ? `마감이 지난 업무 ${overdue.length}개가 있어요. 담당자가 업데이트할 수 있도록 확인해 주세요.` : `내일 마감인 업무 ${dueSoon.length}개가 있어요. 진행 상황을 확인해 볼까요?`;
    return `<aside class="notice ${type}" role="status">${icon('alert',18)}<span class="notice-text">${message}</span><button class="notice-link" data-action="show-overdue">업무 보기</button><button class="notice-close" data-action="dismiss-notice" aria-label="알림 닫기">×</button></aside>`;
  }

  function statusBadge(t) {
    if (isOverdue(t)) return '<span class="badge overdue">마감 초과</span>';
    if (isLate(t)) return '<span class="badge late">지연 완료</span>';
    const labels = { todo: ['todo','할 일'], progress: ['progress','진행 중'], done: ['done','완료'] };
    const [kind,label] = labels[t.status] || labels.todo;
    return `<span class="badge ${kind}">${label}</span>`;
  }

  function dday(t) {
    if (t.status === 'done') return '';
    const diff = dateDiff(t.due);
    if (diff < 0) return `<span class="dday past">D+${Math.abs(diff)}</span>`;
    if (diff === 0) return '<span class="dday today">오늘 마감</span>';
    if (diff === 1) return '<span class="dday tomorrow">D-1</span>';
    return `<span class="dday">D-${diff}</span>`;
  }

  function taskCard(t) {
    const who = member(t.assigneeId);
    const log = [...(t.history || [])].sort((a,b) => b.at - a.at);
    const expanded = !!t.showAllHistory;
    const visible = expanded ? log : log.slice(0,2);
    const canAct = t.assigneeId === state.currentUser.id && t.status !== 'done';
    const action = t.status === 'todo' ? `<button class="button primary small" data-action="start-task" data-id="${esc(t.id)}">진행 시작</button>` : `<button class="button success small" data-action="complete-task" data-id="${esc(t.id)}">완료하기</button>`;
    return `<article class="task-card ${isOverdue(t)?'overdue':''}" aria-label="${esc(t.title)}">
      <div class="task-topline">${statusBadge(t)}${dday(t)}</div>
      <h3 class="task-title">${esc(t.title)}</h3>${t.description?`<p class="task-desc">${esc(t.description)}</p>`:''}
      <div class="task-person">담당 · ${esc(who.name)} <span class="muted">· 마감 ${prettyDate(t.due)}</span></div>
      ${t.resultUrl?`<a class="task-link" href="${esc(t.resultUrl)}" target="_blank" rel="noreferrer">${esc(t.resultUrl)}</a>`:''}
      <div class="history" aria-label="업무 이력">${visible.map(h=>`<p class="history-item">${stamp(h.at)} · ${esc(h.user)} ${esc(h.text)}</p>`).join('')}${log.length>2?`<button class="history-more" data-action="toggle-history" data-id="${esc(t.id)}">${expanded?'이력 접기':'이력 전체 보기'}</button>`:''}</div>
      ${canAct?`<div class="task-actions">${action}</div>`:''}
    </article>`;
  }

  function taskBoard() {
    const groups = [['todo','할 일',''],['progress','진행 중','progress'],['done','완료','done']];
    return `<div class="board-toolbar"><h2 class="section-label">업무 목록 <span class="tab-count">${tasks().length}</span></h2><button class="text-button no-print" data-action="new-task">${icon('plus',17)} 업무 추가</button></div>
      <section class="board" aria-label="업무 상태별 목록">${groups.map(([key,label,dot])=>{const items=tasks().filter(t=>key==='todo'?t.status==='todo'&& !isOverdue(t):key==='todo'?false:key==='progress'?t.status==='progress'&&!isOverdue(t):t.status==='done').concat(key==='todo'?tasks().filter(t=>t.status!=='done'&&isOverdue(t)):[]);return `<div class="column"><h3 class="column-head"><span class="column-dot ${dot}"></span>${label}<span class="column-count">${items.length}</span></h3><div class="task-list">${items.length?items.map(taskCard).join(''):`<div class="empty-column">${key==='done'?'완료한 업무가 여기에 보여요':'등록된 업무가 없어요'}</div>`}</div></div>`}).join('')}</section>`;
  }

  function memberMetrics(m) {
    const list = tasks().filter(t => t.assigneeId === m.id);
    const complete = list.filter(t => t.status === 'done');
    const late = list.filter(isLate).length + list.filter(isOverdue).length;
    const latest = Math.max(0,...list.flatMap(t => (t.history||[]).map(h => h.at)));
    const days = latest ? Math.floor((Date.now()-latest)/86400000) : null;
    return { total:list.length, complete:complete.length, late, days, inactive:days !== null && days >= 3 };
  }

  function memberCard(m) {
    const s = memberMetrics(m); const pctMember = s.total ? Math.round(s.complete / s.total * 100) : 0;
    const activity = s.days === null ? '아직 활동 기록이 없어요' : s.days === 0 ? '마지막 활동 오늘' : `마지막 활동 ${s.days}일 전`;
    return `<article class="member-card ${s.inactive?'inactive':''}">${s.inactive?'<span class="member-flag">최근 활동 없음</span>':''}<div class="member-head"><span class="avatar">${esc(m.name[0])}</span><div><div class="member-name">${esc(m.name)}</div><div class="member-role">${esc(m.role)}</div></div></div><div class="member-stats"><span>완료 ${s.complete} <small>/ 담당 ${s.total}</small></span><span class="member-late">지연 <strong>${s.late}</strong>건</span></div><div class="mini-track" role="progressbar" aria-valuenow="${pctMember}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(m.name)} 업무 완료 ${pctMember}%"><div class="mini-fill" style="width:${pctMember}%"></div></div><div class="member-activity">${activity}</div></article>`;
  }

  function boardView() {
    const p = project(); const days = dateDiff(p.deadline); const dueText = days < 0 ? `마감 ${Math.abs(days)}일 지남` : days === 0 ? '오늘 마감' : `마감 D-${days}`;
    const titleAction = `<button class="button secondary project-create" data-action="go-new-project">${icon('plus',17)} 새 프로젝트</button><button class="button secondary invite-create" data-action="go-invite">${icon('copy',17)} 팀원 초대</button><button class="button primary" data-action="open-report">${icon('file',17)} 기여도 리포트</button>`;
    const tabBar = `<div class="tabs" role="tablist" aria-label="진행 현황 보기"><button class="tab ${boardTab==='tasks'?'active':''}" role="tab" aria-selected="${boardTab==='tasks'}" data-action="tab-tasks">업무별<span class="tab-count">${tasks().length}</span></button><button class="tab ${boardTab==='members'?'active':''}" role="tab" aria-selected="${boardTab==='members'}" data-action="tab-members">팀원별<span class="tab-count">${p.members.length}</span></button></div>`;
    const body = boardTab==='tasks' ? taskBoard() : `<section class="team-view"><div class="board-toolbar"><h2 class="section-label">팀원별 진행 현황</h2><button class="text-button" data-action="new-task">${icon('plus',17)} 업무 추가</button></div><div class="team-grid">${p.members.map(memberCard).join('')}</div>${p.ownerId===state.currentUser.id?'<div class="team-footer"><button class="button outline-muted" data-action="end-project">프로젝트 종료</button></div>':''}</section>`;
    return shell(`<main class="main page"><div class="title-row"><div><p class="eyebrow">${esc(p.subject)}</p><h1 class="page-title">${esc(p.title)}</h1><div class="project-meta"><span>${p.members.length}명 참여</span><span class="meta-sep"></span><span class="deadline-chip ${days<0?'late':''}">${icon('calendar',14)} ${dueText} · ${prettyDate(p.deadline)}</span></div></div><div class="title-actions">${titleAction}</div></div>${progressPanel()}${notice()}${tabBar}${body}${boardTab==='tasks'?'<button class="floating-add" data-action="new-task" aria-label="업무 추가">'+icon('plus',24)+'</button>':''}</main>`, 'projects');
  }

  function projectForm() {
    return shell(`<main class="main page"><section class="form-page"><p class="eyebrow">새 프로젝트</p><h1 class="page-title">새 팀플을 시작해요</h1><form id="project-form" class="form-card" novalidate><div class="form-grid">
      <div class="field"><label for="subject">과목명 <span class="required">*</span></label><input id="subject" name="subject" maxlength="30" required placeholder="예: 마케팅 전략" autocomplete="off"><div class="field-error" data-error="subject"></div></div>
      <div class="field"><label for="projectTitle">프로젝트명 <span class="required">*</span></label><input id="projectTitle" name="title" maxlength="30" required placeholder="예: 중간 발표" autocomplete="off"><div class="field-error" data-error="title"></div></div>
      <div class="field"><label for="projectDeadline">최종 마감일 <span class="required">*</span></label><input id="projectDeadline" name="deadline" type="date" min="${dateOffset(1)}" required><div class="field-error" data-error="deadline"></div></div>
      <div class="field"><span class="field-label">팀 인원 <span class="required">*</span></span><div class="stepper"><button type="button" data-action="team-minus" aria-label="팀 인원 줄이기">−</button><output id="team-size">4</output><button type="button" data-action="team-plus" aria-label="팀 인원 늘리기">+</button><span class="muted">명 (2~10명)</span></div><input type="hidden" id="teamSize" name="teamSize" value="4"></div>
    </div><p class="form-note">프로젝트를 만들면 초대 링크를 발급하고 팀원을 초대할 수 있어요.</p><div class="form-footer"><button type="button" class="button ghost" data-action="go-board">취소</button><button class="button primary" type="submit" disabled>프로젝트 만들기</button></div></form></section></main>`, 'projects');
  }

  function inviteView() {
    const p=project(); const code=p.inviteCode || (p.inviteCode=uid()); const inviteUrl=`${location.origin}${location.pathname}?join=${encodeURIComponent(code)}`;
    const expired=Date.now()-(p.inviteCreatedAt||Date.now())>7*86400000 || p.members.length>=p.teamSize;
    return shell(`<main class="main page"><section class="form-page"><p class="eyebrow">${esc(p.subject)} · ${esc(p.title)}</p><h1 class="page-title">팀원을 초대해요</h1><div class="form-card"><p class="form-note" style="margin-top:0">단톡방에 링크를 붙여넣으면 팀원이 바로 참여할 수 있어요</p>${expired?`<div class="notice warning" role="status">${icon('alert')}<span class="notice-text">초대 링크가 만료됐어요.</span><button class="button secondary small" data-action="renew-invite">새 링크 만들기</button></div>`:`<div class="invite-link-box"><span class="invite-url" id="invite-url">${esc(inviteUrl)}</span><button class="button secondary small" data-action="copy-invite">${icon('copy',15)} 링크 복사</button></div><p class="field-hint">링크는 7일 동안 유효하고, 팀 인원이 다 차면 자동으로 만료돼요.</p>`}
      <div style="margin-top:26px"><h2 class="section-label">참여 현황 <span style="color:var(--color-primary)">${p.members.length} / ${p.teamSize}명</span></h2><div class="member-chips">${p.members.map(m=>`<span class="member-chip"><span class="avatar">${esc(m.name[0])}</span>${esc(m.name)}</span>`).join('')}</div></div>
      <div class="form-footer"><button class="button ghost" data-action="go-board">나중에 할게요</button><button class="button primary" data-action="go-board">다음: 업무 나누기</button></div></div></section></main>`, 'invite');
  }

  function joinView() {
    const code=new URLSearchParams(location.search).get('join'); const p=state.projects.find(x=>x.inviteCode===code);
    if(!p) return shell(`<main class="main page"><section class="form-page"><div class="form-card"><h1 class="page-title">초대 링크를 확인해 주세요</h1><p class="form-note">만료됐거나 유효하지 않은 링크예요. 팀장에게 새 링크를 요청해 주세요.</p><div class="form-footer"><button class="button primary" data-action="go-board">프로젝트로 이동</button></div></div></section></main>`);
    if(p.members.length>=p.teamSize || Date.now()-(p.inviteCreatedAt||Date.now())>7*86400000) return shell(`<main class="main page"><section class="form-page"><div class="form-card"><h1 class="page-title">초대 링크가 만료됐어요</h1><p class="form-note">팀장에게 새 링크를 요청해 주세요.</p></div></section></main>`);
    if(p.members.some(m=>m.id===state.currentUser.id)) return shell(`<main class="main page"><section class="form-page"><div class="form-card"><h1 class="page-title">이미 참여 중인 프로젝트예요</h1><div class="form-footer"><button class="button primary" data-action="go-board">프로젝트로 이동</button></div></div></section></main>`);
    return shell(`<main class="main page"><section class="form-page"><p class="eyebrow">팀 프로젝트 초대</p><h1 class="page-title">${esc(p.subject)} ${esc(p.title)} 팀에 초대받았어요</h1><div class="join-info"><span>팀장 <strong>${esc(memberIn(p,state.currentUser.id)?.name||'서연')}</strong></span><span>최종 마감일 <strong>${prettyDate(p.deadline)}</strong></span><span>현재 인원 <strong>${p.members.length} / ${p.teamSize}명</strong></span></div><div class="form-card"><div class="field"><label for="joinName">참여할 닉네임 <span class="required">*</span></label><input id="joinName" maxlength="10" minlength="2" value="${esc(state.currentUser.name)}" required></div><div class="form-footer"><button class="button ghost" data-action="go-board">취소</button><button class="button primary" data-action="join-project" data-project="${esc(p.id)}">참여하기</button></div></div></section></main>`);
  }
  function memberIn(p,id) { return p.members.find(m=>m.id===id); }

  function reportView() {
    const p=project(); const total=tasks().length; const done=doneTasks(); const onTime=tasks().filter(t=>t.status==='done'&&!isLate(t)).length; const late=tasks().filter(isLate).length;
    const rows=p.members.map(m=>{const list=tasks().filter(t=>t.assigneeId===m.id); const finished=list.filter(t=>t.status==='done'); const on=finished.filter(t=>!isLate(t)).length; const delayed=finished.filter(isLate).length; const details=list.map(t=>`<div style="margin-bottom:10px"><strong>${esc(t.title)}</strong> · ${statusText(t)} · 마감 ${prettyDate(t.due)}${t.resultUrl?` · <a href="${esc(t.resultUrl)}" target="_blank" rel="noreferrer">결과물</a>`:''}${(t.history||[]).map(h=>`<div class="history-item">${stamp(h.at)} · ${esc(h.user)} ${esc(h.text)}</div>`).join('')}</div>`).join('')||'<span class="muted">담당 업무가 없어요.</span>';
      return `<tr><td class="report-member">${esc(m.name)}<button class="report-expand" data-action="expand-report" data-id="${esc(m.id)}" aria-expanded="false">자세히 보기 ${icon('chevron',14)}</button></td><td>${list.length}</td><td>${finished.length}</td><td class="report-good">${on}</td><td class="report-late">${delayed}</td></tr><tr class="report-details" data-detail="${esc(m.id)}"><td colspan="5">${details}</td></tr>`;}).join('');
    return shell(`<main class="main page report-page"><div class="title-row"><div><p class="eyebrow">${esc(p.subject)} · ${esc(p.title)}</p><h1 class="page-title">기여도 리포트</h1><p class="report-intro">이 리포트는 서비스에 기록된 사실만 담고 있어요.</p></div></div><div class="print-only"><h1>${esc(p.subject)} · ${esc(p.title)}</h1><p>기여도 리포트 · 생성일 ${prettyDate(today())}</p></div><div class="report-summary"><div class="summary-card"><div class="summary-label">전체 진행률</div><div class="summary-value">${total?Math.round(done/total*100):0}%</div></div><div class="summary-card"><div class="summary-label">완료 업무</div><div class="summary-value">${done} / ${total}</div></div><div class="summary-card"><div class="summary-label">기한 내 완료</div><div class="summary-value"><span class="report-good">${onTime}</span> <span class="muted" style="font-size:14px">· 지연 ${late}</span></div></div></div><div class="report-table-wrap"><table class="report-table"><thead><tr><th>팀원</th><th>담당</th><th>완료</th><th>기한 내</th><th>지연</th></tr></thead><tbody>${rows}</tbody></table></div><div class="report-actions"><button class="button secondary" data-action="share-report">${icon('copy',16)} 팀원에게 공유</button><button class="button primary" data-action="export-report">${icon('file',16)} PDF로 내보내기</button></div></main>`, 'projects');
  }
  function statusText(t) { return isOverdue(t)?'마감 초과':isLate(t)?'지연 완료':({todo:'할 일',progress:'진행 중',done:'완료'}[t.status]||'할 일'); }

  function loginView(signup=false) {
    return `<div class="login-page"><section class="login-card"><a class="brand" href="#" data-action="go-login"><span class="brand-mark">${icon('check',17)}</span><span>공강맞춤</span></a><h1 class="login-title">누가 뭘 했는지, 싸우지 않고 알 수 있게</h1><form id="auth-form" class="form-grid" novalidate>${signup?'<div class="field"><label for="authName">닉네임 <span class="required">*</span></label><input id="authName" name="name" minlength="2" maxlength="10" required autocomplete="nickname" placeholder="2~10자"></div>':''}<div class="field"><label for="authEmail">이메일 <span class="required">*</span></label><input id="authEmail" name="email" type="email" maxlength="50" required autocomplete="email" placeholder="name@example.com"><div class="field-error" data-error="email"></div></div><div class="field"><label for="authPassword">비밀번호 <span class="required">*</span></label><input id="authPassword" name="password" type="password" minlength="8" maxlength="20" required autocomplete="${signup?'new-password':'current-password'}" placeholder="영문과 숫자 포함, 8~20자"><div class="field-error" data-error="password"></div></div><button class="button primary" type="submit" disabled>${signup?'회원가입':'로그인'}</button></form><button class="button secondary login-switch" data-action="toggle-auth">${signup?'로그인':'회원가입'}</button><p class="login-footer">데모에서는 입력한 정보가 인증 서버로 전송되지 않아요.</p></section></div>`;
  }

  function render() {
    if (!state.loggedIn) { $('#app').innerHTML=loginView(view==='signup'); bindFormEnable(); return; }
    if (view==='newProject') $('#app').innerHTML=projectForm();
    else if (view==='invite') $('#app').innerHTML=inviteView();
    else if (view==='join') $('#app').innerHTML=joinView();
    else if (view==='report') $('#app').innerHTML=reportView();
    else $('#app').innerHTML=boardView();
    bindFormEnable();
  }

  function bindFormEnable() {
    const form=$('#project-form'); if(form){ const update=()=>{form.querySelector('[type="submit"]').disabled=!form.checkValidity();}; form.addEventListener('input',update); form.addEventListener('change',update); update(); }
    const auth=$('#auth-form'); if(auth){const update=()=>{auth.querySelector('[type="submit"]').disabled=!auth.checkValidity();};auth.addEventListener('input',update);update();}
  }

  function openDialog(title, body, actions='') {
    const d=$('#dialog'); d.innerHTML=`<div class="dialog-body"><div class="dialog-head"><h2 class="dialog-title" id="dialog-title">${title}</h2><button class="dialog-close" data-action="close-dialog" aria-label="닫기">×</button></div>${body}${actions?`<div class="dialog-actions">${actions}</div>`:''}</div>`;
    d.showModal();
  }

  function newTaskDialog() {
    const p=project(); const people=p.members.map(m=>`<option value="${esc(m.id)}" ${m.id===state.currentUser.id?'selected':''}>${esc(m.name)}</option>`).join('');
    openDialog('새 업무를 만들어요',`<form id="task-form" class="form-grid" novalidate><div class="field"><label for="taskTitle">업무명 <span class="required">*</span></label><input id="taskTitle" name="title" maxlength="40" required placeholder="예: 경쟁사 3곳 비교"><div class="counter-row"><span class="field-error" data-error="title"></span><span id="taskTitleCount">0/40</span></div></div><div class="field"><label for="taskDescription">업무 설명</label><textarea id="taskDescription" name="description" maxlength="300" placeholder="업무 내용을 간단히 적어 주세요"></textarea><div class="counter-row"><span></span><span id="taskDescriptionCount">0/300</span></div></div><div class="field"><label for="taskAssignee">담당자 <span class="required">*</span></label><select id="taskAssignee" name="assigneeId" required>${people}</select></div><div class="field"><label for="taskDue">마감일 <span class="required">*</span></label><input id="taskDue" name="due" type="date" min="${today()}" max="${p.deadline}" required><div class="field-error" data-error="due"></div></div></form>`,`<button class="button ghost" data-action="close-dialog">취소</button><button class="button primary" type="submit" form="task-form" disabled>저장</button>`);
    const form=$('#task-form'); bindFormEnable();
    ['taskTitle','taskDescription'].forEach(id=>$('#'+id).addEventListener('input',()=>{$('#'+id+'Count').textContent=`${$('#'+id).value.length}/${id==='taskTitle'?40:300}`;}));
    form.addEventListener('submit',createTask);
  }

  function completeDialog(t) {
    openDialog('업무를 완료할까요?',`<p class="form-note" style="margin:0 0 17px">완료한 사실과 결과물 링크를 기여 이력에 기록해요.</p><form id="complete-form" class="form-grid" novalidate><div class="field"><label for="resultUrl">결과물 링크 <span class="required">*</span></label><input type="url" id="resultUrl" name="url" maxlength="500" required placeholder="https://"><div class="field-error" data-error="url"></div></div><div class="field"><label for="completeNote">메모</label><textarea id="completeNote" name="note" maxlength="200" placeholder="완료한 내용이나 참고 사항"></textarea><div class="counter-row"><span></span><span id="completeNoteCount">0/200</span></div></div></form>`,`<button class="button ghost" data-action="close-dialog">취소</button><button class="button success" type="submit" form="complete-form" disabled>완료하기</button>`);
    const form=$('#complete-form'); bindFormEnable(); $('#completeNote').addEventListener('input',e=>$('#completeNoteCount').textContent=`${e.target.value.length}/200`); form.addEventListener('submit',e=>{e.preventDefault();const url=$('#resultUrl').value.trim();if(!/^https:\/\//i.test(url)){setError('url','올바른 링크 형식이 아니에요. https://로 시작하는지 확인해 주세요.');return;}t.status='done';t.resultUrl=url;t.note=$('#completeNote').value.trim();t.completedAt=Date.now();t.history.push({user:state.currentUser.name,text:`상태 변경: 진행 중 → 완료${isLate(t)?' (지연)':''}`,at:Date.now()});save();$('#dialog').close();render();toast('수고했어요! 기여 이력에 기록됐어요');});
  }

  function setError(field,message){const e=$(`[data-error="${field}"]`);if(e)e.textContent=message;const input=$(`#${field==='email'?'authEmail':field==='password'?'authPassword':field==='url'?'resultUrl':field}`);if(input)input.setAttribute('aria-invalid','true');}
  function createTask(e){e.preventDefault();const f=new FormData(e.currentTarget);const title=String(f.get('title')||'').trim();const assigneeId=String(f.get('assigneeId'));const due=String(f.get('due'));if(!title||!assigneeId||!due){if(!title)setError('title','업무명을 입력해 주세요.');if(!due)setError('due','마감일을 선택해 주세요.');return;}if(due<today()||due>project().deadline){setError('due',`업무 마감일은 프로젝트 마감일(${prettyDate(project().deadline)}) 이전이어야 해요.`);return;}const a=member(assigneeId);const t={id:uid(),title,description:String(f.get('description')||'').trim(),assigneeId,due,status:'todo',resultUrl:'',note:'',createdAt:Date.now(),history:[{user:state.currentUser.name,text:`업무 생성 → ${a.name} 배정`,at:Date.now()}]};tasks().unshift(t);save();$('#dialog').close();render();toast(`${a.name}님에게 업무를 배정했어요`);}

  function createProject(e){e.preventDefault();const f=new FormData(e.currentTarget);const subject=String(f.get('subject')||'').trim(),title=String(f.get('title')||'').trim(),deadline=String(f.get('deadline')||''),teamSize=Number(f.get('teamSize'));let invalid=false;if(!subject){setError('subject','과목명을 입력해 주세요.');invalid=true;}if(!title){setError('title','프로젝트명을 입력해 주세요.');invalid=true;}if(!deadline||deadline<=today()){setError('deadline','마감일은 오늘 이후로 선택해 주세요.');invalid=true;}if(invalid)return;const p={id:uid(),subject,title,deadline,teamSize,ownerId:state.currentUser.id,inviteCode:uid(),inviteCreatedAt:Date.now(),members:[{id:state.currentUser.id,name:state.currentUser.name,role:'팀장',joinedAt:today()}],tasks:[]};state.projects.unshift(p);state.activeProjectId=p.id;view='invite';save();render();toast('프로젝트가 만들어졌어요! 이제 팀원을 초대해 볼까요?');}

  document.addEventListener('click', async e => {
    const el=e.target.closest('[data-action]'); if(!el)return; const a=el.dataset.action;
    if(a==='go-board'){view='board';render();return;}
    if(a==='go-new-project'){view='newProject';render();return;}
    if(a==='go-invite'){view='invite';render();return;}
    if(a==='open-report'){view='report';render();return;}
    if(a==='toggle-auth'){view=view==='signup'?'login':'signup';render();return;}
    if(a==='go-login'){state.loggedIn=false;view='login';render();return;}
    if(a==='logout'){state.loggedIn=false;view='login';save();render();return;}
    if(a==='tab-tasks'){boardTab='tasks';render();return;}
    if(a==='tab-members'){boardTab='members';render();return;}
    if(a==='new-task'){newTaskDialog();return;}
    if(a==='close-dialog'){ $('#dialog').close();return; }
    if(a==='start-task'){const t=tasks().find(x=>x.id===el.dataset.id);if(!t)return;if(t.assigneeId!==state.currentUser.id){toast('담당자만 상태를 바꿀 수 있어요.','warning');return;}t.status='progress';t.history.push({user:state.currentUser.name,text:'상태 변경: 할 일 → 진행 중',at:Date.now()});save();render();toast('진행 상황이 기여 이력에 기록됐어요');return;}
    if(a==='complete-task'){const t=tasks().find(x=>x.id===el.dataset.id);if(!t)return;if(t.assigneeId!==state.currentUser.id){toast('담당자만 상태를 바꿀 수 있어요.','warning');return;}completeDialog(t);return;}
    if(a==='toggle-history'){const t=tasks().find(x=>x.id===el.dataset.id);if(t){t.showAllHistory=!t.showAllHistory;render();}return;}
    if(a==='dismiss-notice'){el.closest('.notice')?.remove();return;}
    if(a==='show-overdue'){boardTab='tasks';document.querySelector('.board')?.scrollIntoView({behavior:'smooth',block:'start'});return;}
    if(a==='team-minus'||a==='team-plus'){const input=$('#teamSize'),out=$('#team-size');let n=Number(input.value)+(a==='team-plus'?1:-1);n=Math.max(2,Math.min(10,n));input.value=n;out.value=n;out.textContent=n;return;}
    if(a==='copy-invite'){const text=$('#invite-url')?.textContent;if(!text)return;try{await navigator.clipboard.writeText(text);toast('링크가 복사됐어요');}catch{const ta=document.createElement('textarea');ta.value=text;document.body.append(ta);ta.select();document.execCommand('copy');ta.remove();toast('링크가 복사됐어요');}return;}
    if(a==='renew-invite'){project().inviteCode=uid();project().inviteCreatedAt=Date.now();save();render();toast('새 초대 링크를 만들었어요');return;}
    if(a==='join-project'){const p=state.projects.find(x=>x.id===el.dataset.project);const name=$('#joinName')?.value.trim();if(!name||name.length<2||name.length>10||!/^[\p{Script=Hangul}A-Za-z0-9]+$/u.test(name)){toast('닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있어요.','error');return;}if(p.members.length>=p.teamSize){toast('이 팀은 인원이 다 찼어요.','error');return;}p.members.push({id:uid(),name,role:'팀원',joinedAt:today()});p.teamSize=Math.max(p.teamSize,p.members.length);state.activeProjectId=p.id;view='board';boardTab='tasks';save();render();toast(`${name}님이 참여했어요`);return;}
    if(a==='expand-report'){const detail=$(`[data-detail="${el.dataset.id}"]`);const open=detail.classList.toggle('open');el.setAttribute('aria-expanded',String(open));el.innerHTML=`${open?'접기':'자세히 보기'} ${icon('chevron',14)}`;return;}
    if(a==='export-report'){window.print();return;}
    if(a==='share-report'){const url=location.href.split('?')[0];try{await navigator.clipboard.writeText(url);toast('리포트 링크가 복사됐어요');}catch{toast('리포트 링크를 복사하지 못했어요. 주소창에서 직접 복사해 주세요.','error');}return;}
    if(a==='end-project'){const openCount=tasks().filter(t=>t.status!=='done').length;const message=openCount?`아직 끝나지 않은 업무가 ${openCount}개 있어요. 그래도 종료할까요?`:'프로젝트를 종료하면 기록을 더 이상 수정할 수 없어요. 종료할까요?';openDialog('프로젝트를 종료할까요?',`<p class="form-note" style="margin:0">${message}</p>`,`<button class="button ghost" data-action="close-dialog">취소</button><button class="button danger" data-action="confirm-end">종료하기</button>`);return;}
    if(a==='confirm-end'){project().endedAt=Date.now();save();$('#dialog').close();view='report';render();toast('프로젝트가 종료됐어요');return;}
  });

  document.addEventListener('submit', e => {
    if(e.target.id==='project-form'){createProject(e);}
    if(e.target.id==='auth-form'){e.preventDefault();const f=new FormData(e.target);const email=String(f.get('email')||'').trim();const password=String(f.get('password')||'');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError('email','올바른 이메일 주소를 입력해 주세요.');return;}if(password.length<8||password.length>20||!/[A-Za-z]/.test(password)||!/[0-9]/.test(password)){setError('password','비밀번호는 영문과 숫자를 포함해 8~20자로 입력해 주세요.');return;}let greeting='환영해요';if(view==='signup'){const name=String(f.get('name')||'').trim();if(name.length<2||name.length>10||!/^[\p{Script=Hangul}A-Za-z0-9]+$/u.test(name)){toast('닉네임은 2~10자의 한글, 영문, 숫자만 사용할 수 있어요.','error');return;}state.currentUser={id:'seoyeon',name,role:'팀장'};state.projects.forEach(p=>{const own=p.members.find(m=>m.id==='seoyeon');if(own)own.name=name;});greeting='데모로 계속할게요';}else{state.currentUser=USER;}state.loggedIn=true;view='board';save();render();toast(greeting);}
  });

  window.addEventListener('click', e => { const d=$('#dialog'); if(e.target===d)d.close(); });
  const params=new URLSearchParams(location.search); if(params.has('join')) view='join';
  if(!state.loggedIn && view!=='join')view='login';
  render();
})();
