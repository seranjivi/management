import { useState } from "react";
import { createRoot } from "react-dom/client";

/* ─── DESIGN TOKENS ─────────────────────────────────────────────────────────── */
const T = {
  sidebar:      "#111827",
  sidebarHover: "rgba(255,255,255,0.07)",
  sidebarActive:"rgba(245,158,11,0.18)",
  gold:         "#f59e0b",
  goldLight:    "#fef3c7",
  goldDark:     "#d97706",
  red:          "#ef4444",
  redLight:     "#fef2f2",
  green:        "#10b981",
  greenLight:   "#ecfdf5",
  blue:         "#3b82f6",
  blueLight:    "#eff6ff",
  purple:       "#8b5cf6",
  purpleLight:  "#f5f3ff",
  bg:           "#f8fafc",
  surface:      "#ffffff",
  border:       "#e5e7eb",
  text:         "#111827",
  textMid:      "#4b5563",
  textLight:    "#9ca3af",
  danger:       "#dc2626",
  warning:      "#d97706",
  success:      "#059669",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Outfit', sans-serif; background: ${T.bg}; color: ${T.text}; font-size: 14px; }
  input, select, textarea, button { font-family: 'Outfit', sans-serif; }
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }

  .fade-in { animation: fadeUp 0.22s ease both; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

  .nav-link { display:flex; align-items:center; gap:10px; padding:8px 12px; border-radius:8px;
    color:rgba(255,255,255,0.52); font-size:13.5px; font-weight:500; cursor:pointer;
    transition: background 0.15s, color 0.15s; white-space:nowrap; }
  .nav-link:hover { background:${T.sidebarHover}; color:rgba(255,255,255,0.85); }
  .nav-link.active { background:${T.sidebarActive}; color:${T.gold}; font-weight:600; }

  .card { background:#fff; border-radius:14px; border:1px solid ${T.border}; }
  .card-hover { transition: box-shadow 0.18s, transform 0.18s; cursor:pointer; }
  .card-hover:hover { box-shadow:0 8px 30px rgba(0,0,0,0.09); transform:translateY(-1px); }

  .badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:20px;
    font-size:11px; font-weight:700; letter-spacing:0.2px; white-space:nowrap; }

  .btn { border:none; border-radius:9px; padding:9px 20px; font-size:13.5px; font-weight:600;
    cursor:pointer; display:inline-flex; align-items:center; gap:7px; transition:all 0.15s; }
  .btn-gold { background:${T.gold}; color:#fff; }
  .btn-gold:hover { background:${T.goldDark}; }
  .btn-outline { background:transparent; border:1.5px solid ${T.border}; color:${T.textMid}; }
  .btn-outline:hover { border-color:${T.gold}; color:${T.goldDark}; }
  .btn-approve { background:${T.green}; color:#fff; }
  .btn-approve:hover { background:#047857; }
  .btn-reject { background:${T.red}; color:#fff; }
  .btn-reject:hover { background:#b91c1c; }
  .btn-ghost { background:transparent; border:none; color:${T.textMid}; cursor:pointer; padding:6px 10px; border-radius:7px; font-size:13px; transition:background 0.15s; }
  .btn-ghost:hover { background:${T.bg}; }

  .input { width:100%; border:1.5px solid ${T.border}; border-radius:8px; padding:9px 12px;
    font-size:13.5px; color:${T.text}; outline:none; background:#fff; transition:border 0.15s; }
  .input:focus { border-color:${T.gold}; box-shadow:0 0 0 3px rgba(245,158,11,0.12); }
  .label { font-size:12px; font-weight:600; color:${T.textMid}; margin-bottom:5px; display:block;
    text-transform:uppercase; letter-spacing:0.5px; }

  .cost-pill { background:linear-gradient(135deg,#fef3c7,#fde68a);
    border:1px solid #fcd34d; border-radius:8px; padding:3px 10px;
    font-size:12px; font-weight:700; color:#92400e; display:inline-flex; align-items:center; gap:5px; }

  .progress-track { height:7px; background:#f3f4f6; border-radius:99px; overflow:hidden; }
  .progress-fill { height:100%; border-radius:99px; transition:width 0.4s ease; }

  .tab { padding:8px 16px; border-radius:8px; font-size:13.5px; font-weight:500;
    cursor:pointer; color:${T.textMid}; transition:all 0.15s; border:none; background:transparent; }
  .tab.active { background:${T.gold}; color:#fff; font-weight:700; }
  .tab:hover:not(.active) { background:${T.bg}; }

  .section-head { font-size:11px; font-weight:700; color:${T.textLight}; text-transform:uppercase;
    letter-spacing:1px; padding:10px 14px 6px; }

  .table-head th { padding:10px 14px; font-size:11.5px; font-weight:700; color:${T.textLight};
    text-align:left; background:${T.bg}; white-space:nowrap; }
  .table-row td { padding:12px 14px; border-top:1px solid ${T.border}; vertical-align:middle; }
  .table-row:hover td { background:#fafafa; }

  .divider { height:1px; background:${T.border}; margin:0; }
  .ring { width:80px; height:80px; border-radius:50%; position:relative; display:inline-flex;
    align-items:center; justify-content:center; }
  .tag { display:inline-flex; align-items:center; gap:4px; padding:3px 9px; background:#f3f4f6;
    border-radius:6px; font-size:11.5px; color:${T.textMid}; font-weight:500; }
  
  .cost-alert-bar { background:linear-gradient(90deg,#7c2d12,#b45309);
    border-radius:12px; padding:14px 20px; color:#fff; display:flex; align-items:center;
    justify-content:space-between; gap:16px; }

  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.45);
    display:flex; align-items:center; justify-content:center; z-index:999; backdrop-filter:blur(3px); }
  .modal { background:#fff; border-radius:18px; width:560px; max-height:85vh;
    overflow-y:auto; box-shadow:0 24px 60px rgba(0,0,0,0.25); }

  .avatar { width:32px; height:32px; border-radius:50%; display:flex; align-items:center;
    justify-content:center; font-size:12px; font-weight:700; flex-shrink:0; }
  .avatar-sm { width:26px; height:26px; border-radius:50%; display:flex; align-items:center;
    justify-content:center; font-size:10px; font-weight:700; flex-shrink:0; }

  .star { color:${T.gold}; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
  .pulse { animation:pulse 2s infinite; }
`;

/* ─── ICONS ─────────────────────────────────────────────────────────────────── */
const Ic = ({ n, s = 16, c = "currentColor", sw = 1.8 }) => {
  const d = {
    dash:    <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    folder:  <><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></>,
    check:   <><polyline points="20 6 9 17 4 12"/></>,
    x:       <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    dollar:  <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></>,
    users:   <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    bell:    <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    search:  <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    logout:  <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    trend:   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    trendDown:<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>,
    clock:   <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    alert:   <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    calendar:<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    eye:     <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    edit:    <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    filter:  <><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></>,
    chevDown:<><polyline points="6 9 12 15 18 9"/></>,
    chevRight:<><polyline points="9 18 15 12 9 6"/></>,
    layers:  <><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>,
    pie:     <><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></>,
    bar:     <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>,
    briefcase:<><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>,
    shield:  <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    map:     <><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></>,
    msg:     <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    paper:   <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    plus:    <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    info:    <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    hiring:  <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></>,
    tag:     <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    cpu:     <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>,
    approval:<><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {d[n]}
    </svg>
  );
};

/* ─── HELPERS ───────────────────────────────────────────────────────────────── */
const Bdg = ({ status }) => {
  const m = {
    "Active":       ["#dcfce7","#166534"], "On Track":["#dcfce7","#166534"],
    "At Risk":      ["#fff7ed","#9a3412"], "Planning":["#eff6ff","#1e40af"],
    "In Progress":  ["#fef9c3","#854d0e"], "On Hold": ["#f1f5f9","#475569"],
    "Completed":    ["#f0fdf4","#166534"], "Cancelled":["#fef2f2","#991b1b"],
    "Draft":        ["#faf5ff","#6b21a8"], "Pending":  ["#fff7ed","#9a3412"],
    "Approved":     ["#dcfce7","#166534"], "Rejected": ["#fef2f2","#991b1b"],
    "Over Budget":  ["#fef2f2","#991b1b"], "Under Budget":["#dcfce7","#166534"],
    "On Budget":    ["#fef9c3","#854d0e"], "High":     ["#fef2f2","#991b1b"],
    "Medium":       ["#fff7ed","#854d0e"], "Low":      ["#f0fdf4","#166534"],
    "Critical":     ["#fef2f2","#991b1b"], "Escalated":["#fff7ed","#9a3412"],
    "Fixed Price":  ["#eff6ff","#1e40af"], "T&M":      ["#faf5ff","#6b21a8"],
  };
  const [bg, col] = m[status] || ["#f1f5f9","#475569"];
  return <span className="badge" style={{ background: bg, color: col }}>{status}</span>;
};

const CostPill = ({ label, value, delta, deltaUp }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
    <span style={{ fontSize:11, color:T.textLight, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</span>
    <span className="cost-pill"><Ic n="dollar" s={11} c="#92400e"/>{value}</span>
    {delta && <span style={{ fontSize:11, color: deltaUp ? T.danger : T.success, fontWeight:600 }}>{deltaUp?"↑":"↓"} {delta}</span>}
  </div>
);

const MiniBar = ({ value, max, color }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const barColor = pct >= 90 ? T.danger : pct >= 75 ? T.warning : color || T.blue;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div className="progress-track" style={{ flex:1, height:6 }}>
        <div className="progress-fill" style={{ width:`${pct}%`, background:barColor }} />
      </div>
      <span style={{ fontSize:11, fontWeight:700, color:barColor, minWidth:32 }}>{pct}%</span>
    </div>
  );
};

/* ─── SIDEBAR ───────────────────────────────────────────────────────────────── */
const MGMT_NAV = [
  { group:"Overview",    items:[
    { id:"dashboard",   label:"Executive Dashboard",  icon:"dash"      },
    { id:"portfolio",   label:"Portfolio Overview",   icon:"layers"    },
    { id:"projectview", label:"Project Detail",       icon:"folder"    },
  ]},
  { group:"Approvals",   items:[
    { id:"approvals",   label:"Approval Queue",       icon:"approval"  },
    { id:"escalations", label:"Escalations",          icon:"alert"     },
  ]},
  { group:"Cost Control",items:[
    { id:"budgets",     label:"Budget Control",       icon:"dollar"    },
    { id:"financial",   label:"Financial Reports",    icon:"bar"       },
    { id:"contracts",   label:"Vendor & Contracts",   icon:"paper"     },
  ]},
  { group:"Workforce",   items:[
    { id:"resources",   label:"Resource Utilization", icon:"cpu"       },
    { id:"workforce",   label:"Workforce Analytics",  icon:"pie"       },
    { id:"hiring",      label:"Hiring Oversight",     icon:"hiring"    },
  ]},
  { group:"Governance",  items:[
    { id:"risk",        label:"Risk & Compliance",    icon:"shield"    },
    { id:"audit",       label:"Audit Trail",          icon:"eye"       },
    { id:"reports",     label:"Executive Reports",    icon:"trend"     },
  ]},
];

const Sidebar = ({ page, setPage }) => (
  <div style={{ width:230, background:T.sidebar, height:"100vh", position:"fixed", top:0, left:0,
    display:"flex", flexDirection:"column", zIndex:100, overflow:"hidden" }}>
    {/* Logo */}
    <div style={{ padding:"20px 18px 14px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <div style={{ width:34, height:34, background:T.gold, borderRadius:9, display:"flex",
          alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Ic n="layers" s={16} c="#fff"/>
        </div>
        <div>
          <div style={{ color:"#fff", fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:15, lineHeight:1.1 }}>StaffSync</div>
          <div style={{ color:T.textLight, fontSize:10, fontWeight:500, marginTop:1 }}>Management Suite</div>
        </div>
      </div>
    </div>
    {/* User */}
    <div style={{ padding:"12px 14px 8px" }}>
      <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:10, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
        <div className="avatar" style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"#fff", fontFamily:"'Syne', sans-serif" }}>VP</div>
        <div>
          <div style={{ color:"#fff", fontSize:13, fontWeight:600, fontFamily:"'Syne', sans-serif" }}>Vijay Prabhu</div>
          <div style={{ color:T.gold, fontSize:10.5, fontWeight:600 }}>VP Operations</div>
        </div>
      </div>
    </div>
    {/* Nav */}
    <nav style={{ flex:1, padding:"4px 10px", overflowY:"auto", display:"flex", flexDirection:"column", gap:0 }}>
      {MGMT_NAV.map(group => (
        <div key={group.group}>
          <div className="section-head" style={{ color:"rgba(255,255,255,0.25)", padding:"10px 8px 4px" }}>{group.group}</div>
          {group.items.map(item => (
            <div key={item.id} className={`nav-link${page===item.id?" active":""}`} onClick={() => setPage(item.id)}>
              <Ic n={item.icon} s={15} c={page===item.id ? T.gold : "rgba(255,255,255,0.4)"}/>
              {item.label}
            </div>
          ))}
        </div>
      ))}
    </nav>
    {/* Bottom */}
    <div style={{ padding:"10px 10px 18px", borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", gap:2 }}>
      {[{ id:"settings", label:"Settings", icon:"settings" }, { id:"logout", label:"Sign Out", icon:"logout" }].map(n => (
        <div key={n.id} className="nav-link" onClick={() => setPage(n.id)}>
          <Ic n={n.icon} s={14} c="rgba(255,255,255,0.35)"/>{n.label}
        </div>
      ))}
    </div>
  </div>
);

/* ─── TOP BAR ───────────────────────────────────────────────────────────────── */
const TopBar = ({ title, sub, actions }) => (
  <div style={{ background:"#fff", borderBottom:`1px solid ${T.border}`, padding:"13px 28px",
    display:"flex", alignItems:"center", justifyContent:"space-between",
    position:"sticky", top:0, zIndex:50 }}>
    <div>
      <div style={{ fontFamily:"'Syne', sans-serif", fontSize:18, fontWeight:700, color:T.text }}>{title}</div>
      {sub && <div style={{ fontSize:12.5, color:T.textLight, marginTop:1 }}>{sub}</div>}
    </div>
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ position:"relative" }}>
        <input className="input" placeholder="Search…" style={{ paddingLeft:34, paddingTop:7, paddingBottom:7, width:190, background:T.bg }}/>
        <div style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)" }}><Ic n="search" s={14} c={T.textLight}/></div>
      </div>
      <button style={{ background:"none", border:"none", cursor:"pointer", position:"relative", padding:6 }}>
        <Ic n="bell" s={18} c={T.textMid}/>
        <span style={{ position:"absolute", top:4, right:4, width:8, height:8, background:T.red,
          borderRadius:"50%", border:"2px solid #fff" }} className="pulse"/>
      </button>
      <div className="avatar" style={{ background:"linear-gradient(135deg,#f59e0b,#d97706)", color:"#fff", fontFamily:"'Syne', sans-serif", cursor:"pointer" }}>VP</div>
      {actions}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   PAGE 1 — EXECUTIVE DASHBOARD
═══════════════════════════════════════════════════════════════════ */
const Dashboard = ({ setPage }) => {
  const [period, setPeriod] = useState("Q1 2026");

  const KPIs = [
    { label:"Total Portfolio Value",    value:"₹18.4 Cr",  delta:"+12%",  up:true,  icon:"dollar",   bg:"linear-gradient(135deg,#fef3c7,#fde68a)",   ic:T.goldDark },
    { label:"YTD Revenue Recognised",  value:"₹6.2 Cr",   delta:"+8%",   up:true,  icon:"trend",    bg:"linear-gradient(135deg,#dcfce7,#bbf7d0)",   ic:T.green    },
    { label:"Budget Overruns",         value:"₹34.2 L",   delta:"3 proj",up:false, icon:"alert",    bg:"linear-gradient(135deg,#fee2e2,#fca5a5)",   ic:T.red      },
    { label:"Avg. Cost per Hire",      value:"₹3.8 L",    delta:"-5%",   up:false, icon:"hiring",   bg:"linear-gradient(135deg,#ede9fe,#c4b5fd)",   ic:T.purple   },
    { label:"Total Headcount",         value:"186",        delta:"+14",   up:true,  icon:"users",    bg:"linear-gradient(135deg,#dbeafe,#bfdbfe)",   ic:T.blue     },
    { label:"Pending Approvals",       value:"9",          delta:"₹1.2Cr",up:false, icon:"clock",    bg:"linear-gradient(135deg,#fff7ed,#fed7aa)",   ic:T.warning  },
  ];

  const projects = [
    { id:"PRJ-001", name:"Fintech Portal Revamp",    client:"HDFC Bank",      budget:4500000, spent:3100000, status:"Active",   risk:"Low",    pm:"Ravi S.",  health:"On Track" },
    { id:"PRJ-002", name:"ERP Implementation",       client:"Infosys Ltd",    budget:12000000,spent:8800000, status:"At Risk",  risk:"High",   pm:"Meena K.", health:"At Risk"  },
    { id:"PRJ-003", name:"Mobile App – Retail",      client:"Reliance Retail",budget:6000000, spent:3400000, status:"Active",   risk:"Medium", pm:"Ravi S.",  health:"On Track" },
    { id:"PRJ-004", name:"Data Analytics Platform",  client:"Wipro",          budget:8000000, spent:800000,  status:"Planning", risk:"Low",    pm:"Arjun D.", health:"On Track" },
    { id:"PRJ-005", name:"Cloud Migration Phase 2",  client:"Airtel Business",budget:9500000, spent:9800000, status:"At Risk",  risk:"High",   pm:"Sneha P.", health:"Over Budget"},
    { id:"PRJ-006", name:"CRM System Upgrade",       client:"TCS",            budget:3500000, spent:3420000, status:"Completed",risk:"Low",    pm:"Amit J.",  health:"On Budget"},
  ];

  const approvals = [
    { id:"HR-042", role:"Sr. React Developer", project:"ERP Implementation",  budget:"₹12.5L/yr", days:4, priority:"Critical", pm:"Meena K.", positions:2 },
    { id:"HR-043", role:"Data Architect",       project:"Data Analytics",      budget:"₹18L/yr",   days:2, priority:"High",     pm:"Arjun D.", positions:1 },
    { id:"HR-044", role:"QA Lead",              project:"Fintech Portal",      budget:"₹9L/yr",    days:6, priority:"High",     pm:"Ravi S.",  positions:1 },
    { id:"HR-045", role:"Business Analyst",     project:"Cloud Migration",     budget:"₹11L/yr",   days:1, priority:"Medium",   pm:"Sneha P.", positions:2 },
  ];

  const fmt = (n) => `₹${(n/100000).toFixed(1)}L`;
  const pct = (s, b) => Math.min(100, Math.round((s / b) * 100));

  return (
    <div className="fade-in">
      <TopBar title="Executive Dashboard" sub={`${period} · Friday, 06 March 2026`}
        actions={
          <select className="input" value={period} onChange={e=>setPeriod(e.target.value)}
            style={{ width:110, padding:"6px 10px", fontSize:13 }}>
            {["Q1 2026","Q4 2025","Q3 2025","FY 2025-26"].map(p=><option key={p}>{p}</option>)}
          </select>
        }/>
      <div style={{ padding:"22px 28px", maxWidth:1260 }}>

        {/* Budget Alert Bar */}
        <div className="cost-alert-bar" style={{ marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <Ic n="alert" s={18} c="#fde68a"/>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>⚠ Cost Overrun Alert — 2 projects exceeded approved budget</div>
              <div style={{ fontSize:12.5, opacity:0.8, marginTop:2 }}>ERP Implementation (+₹8L over) · Cloud Migration (+₹3L over) · Immediate review required</div>
            </div>
          </div>
          <button className="btn btn-gold" onClick={() => setPage("approvals")} style={{ flexShrink:0, fontSize:12.5, padding:"7px 16px" }}>Review Now</button>
        </div>

        {/* KPI Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:14, marginBottom:22 }}>
          {KPIs.map(k => (
            <div key={k.label} className="card card-hover" style={{ padding:18, position:"relative", overflow:"hidden" }}>
              <div style={{ width:40, height:40, borderRadius:10, background:k.bg, display:"flex",
                alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                <Ic n={k.icon} s={17} c={k.ic}/>
              </div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, color:T.text, lineHeight:1 }}>{k.value}</div>
              <div style={{ fontSize:11.5, color:T.textMid, marginTop:5, lineHeight:1.3, fontWeight:500 }}>{k.label}</div>
              <div style={{ marginTop:6, display:"flex", alignItems:"center", gap:4 }}>
                <Ic n={k.up?"trend":"trendDown"} s={11} c={k.up ? T.green : T.red}/>
                <span style={{ fontSize:11, fontWeight:700, color: k.up ? T.green : T.red }}>{k.delta}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:18, marginBottom:18 }}>
          {/* Portfolio cost table */}
          <div className="card">
            <div style={{ padding:"16px 20px 12px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15 }}>Portfolio — Budget vs Actual</div>
              <button className="btn btn-outline" style={{ padding:"6px 14px", fontSize:12 }} onClick={() => setPage("projectview")}>Drill Down</button>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead className="table-head">
                  <tr>
                    {["Project","Client","Budget","Spent","Burn","Status","Cost Health","Risk"].map(h=>(
                      <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:11.5, fontWeight:700,
                        color:T.textLight, background:T.bg, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => {
                    const burnPct = pct(p.spent, p.budget);
                    return (
                      <tr key={i} className="table-row" style={{ cursor:"pointer" }} onClick={() => setPage("projectview")}>
                        <td style={{ padding:"11px 14px" }}>
                          <div style={{ fontWeight:600, fontSize:13, color:T.text }}>{p.name}</div>
                          <div style={{ fontSize:11, color:T.textLight, fontFamily:"monospace" }}>{p.id}</div>
                        </td>
                        <td style={{ padding:"11px 14px", color:T.textMid, whiteSpace:"nowrap" }}>{p.client}</td>
                        <td style={{ padding:"11px 14px" }}><span className="cost-pill"><Ic n="dollar" s={10} c="#92400e"/>{fmt(p.budget)}</span></td>
                        <td style={{ padding:"11px 14px" }}>
                          <span style={{ fontWeight:700, color: burnPct>95 ? T.danger : burnPct>80 ? T.warning : T.text, fontSize:13 }}>{fmt(p.spent)}</span>
                        </td>
                        <td style={{ padding:"11px 14px", minWidth:110 }}><MiniBar value={p.spent} max={p.budget}/></td>
                        <td style={{ padding:"11px 14px" }}><Bdg status={p.status}/></td>
                        <td style={{ padding:"11px 14px" }}><Bdg status={p.health}/></td>
                        <td style={{ padding:"11px 14px" }}><Bdg status={p.risk}/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {/* Approval snapshot */}
            <div className="card">
              <div style={{ padding:"14px 18px 10px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>Pending Approvals</div>
                <span className="badge" style={{ background:T.redLight, color:T.danger }}>{approvals.length} urgent</span>
              </div>
              {approvals.map((a, i) => (
                <div key={i} style={{ padding:"11px 18px", borderBottom: i<approvals.length-1 ? `1px solid ${T.border}`:undefined,
                  display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:13 }}>{a.role} <span style={{ color:T.textLight, fontWeight:400 }}>×{a.positions}</span></div>
                    <div style={{ fontSize:11.5, color:T.textMid, marginTop:2 }}>{a.project}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
                      <span className="cost-pill" style={{ fontSize:11 }}><Ic n="dollar" s={9} c="#92400e"/>{a.budget}</span>
                      <span style={{ fontSize:11, color:T.textLight }}>{a.days}d ago</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:5, flexShrink:0 }}>
                    <button className="btn btn-approve" style={{ padding:"4px 10px", fontSize:11.5 }}>✓</button>
                    <button className="btn btn-reject"  style={{ padding:"4px 10px", fontSize:11.5 }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ padding:"10px 18px" }}>
                <button className="btn btn-gold" style={{ width:"100%", justifyContent:"center", fontSize:13 }} onClick={() => setPage("approvals")}>
                  View All Approvals →
                </button>
              </div>
            </div>

            {/* Cost breakdown donut-like */}
            <div className="card" style={{ padding:18 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:14 }}>Cost Distribution</div>
              {[
                { label:"Salaries & Benefits",  pct:58, val:"₹10.7Cr", color:T.blue   },
                { label:"Contractor & Freelance",pct:22, val:"₹4.0Cr",  color:T.purple },
                { label:"Tools & Infra",         pct:12, val:"₹2.2Cr",  color:T.gold   },
                { label:"Travel & Operations",   pct:8,  val:"₹1.5Cr",  color:T.green  },
              ].map(d => (
                <div key={d.label} style={{ marginBottom:11 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:12.5, fontWeight:500, color:T.textMid }}>{d.label}</span>
                    <span style={{ fontSize:12.5, fontWeight:700, color:T.text }}>{d.val} <span style={{ color:T.textLight, fontWeight:400 }}>({d.pct}%)</span></span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width:`${d.pct}%`, background:d.color }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row — hiring cost summary */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          {[
            { title:"Total Hiring Budget (Open)", val:"₹1.24 Cr", sub:"9 open requests", icon:"hiring", color:T.gold },
            { title:"Avg. Time to Fill",          val:"28 days",  sub:"Industry avg: 35d",icon:"clock",  color:T.blue },
            { title:"Contract Staff Cost (MTD)",  val:"₹38.5L",   sub:"+6% vs last month",icon:"paper",  color:T.purple },
            { title:"ROI on Completed Projects",  val:"142%",     sub:"6 projects closed", icon:"trend",  color:T.green },
          ].map(c => (
            <div key={c.title} className="card card-hover" style={{ padding:"16px 18px", display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{ width:38, height:38, borderRadius:9, background:`${c.color}18`, display:"flex",
                alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ic n={c.icon} s={16} c={c.color}/>
              </div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:700, color:T.text }}>{c.val}</div>
                <div style={{ fontSize:12, color:T.textMid, marginTop:3, fontWeight:500 }}>{c.title}</div>
                <div style={{ fontSize:11.5, color:c.color, marginTop:4, fontWeight:600 }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE 2 — PROJECT DETAIL VIEW (Management)
═══════════════════════════════════════════════════════════════════ */
const ProjectDetail = ({ setPage }) => {
  const [tab, setTab] = useState("overview");

  const project = {
    id:"PRJ-002", name:"ERP Implementation", client:"Infosys Ltd", pm:"Meena Krishnan",
    dh:"Suresh Babu", status:"At Risk", phase:"Development", priority:"High",
    start:"01 Nov 2025", end:"20 Mar 2026", go:"15 Mar 2026",
    budget:12000000, spent:8800000, forecast:13200000,
    type:"T&M", team:14, openReqs:4, dept:"Enterprise Solutions",
    desc:"Full-scale ERP rollout covering Finance, HR, Procurement and Inventory modules across 6 business units. Scope includes data migration, integrations with 3 legacy systems and user training.",
  };

  const hiringReqs = [
    { id:"HR-042", role:"Sr. React Developer", type:"Full-time", positions:2, budget:"₹12.5L/yr", status:"Pending",  urgency:"Critical", since:"4 days" },
    { id:"HR-043", role:"SAP FICO Consultant",  type:"Contract",  positions:1, budget:"₹18L/yr",  status:"Approved", urgency:"High",     since:"8 days" },
    { id:"HR-046", role:"QA Automation Lead",   type:"Full-time", positions:1, budget:"₹11L/yr",  status:"Pending",  urgency:"High",     since:"2 days" },
    { id:"HR-047", role:"Business Analyst",     type:"Contract",  positions:1, budget:"₹9L/yr",   status:"Draft",    urgency:"Medium",   since:"1 day"  },
  ];

  const team = [
    { name:"Meena Krishnan",  role:"Project Manager",    type:"Full-time", cost:"₹18L/yr",  util:95, avatar:"MK", since:"Nov 2025" },
    { name:"Arjun Dev",       role:"Technical Lead",     type:"Full-time", cost:"₹22L/yr",  util:100,avatar:"AD", since:"Nov 2025" },
    { name:"Priya Sharma",    role:"SAP Consultant",     type:"Contract",  cost:"₹1.8L/mo", util:80, avatar:"PS", since:"Jan 2026" },
    { name:"Rohit Verma",     role:"Business Analyst",   type:"Full-time", cost:"₹9L/yr",   util:85, avatar:"RV", since:"Dec 2025" },
    { name:"Divya Nair",      role:"QA Engineer",        type:"Full-time", cost:"₹7.5L/yr", util:70, avatar:"DN", since:"Jan 2026" },
  ];

  const milestones = [
    { name:"Project Kickoff",         date:"05 Nov 2025", status:"Completed", budget:"₹8L",   actual:"₹7.6L"  },
    { name:"Discovery & Design",      date:"30 Nov 2025", status:"Completed", budget:"₹18L",  actual:"₹19.2L" },
    { name:"Development Phase 1",     date:"31 Jan 2026", status:"Completed", budget:"₹30L",  actual:"₹34.8L" },
    { name:"Development Phase 2",     date:"28 Feb 2026", status:"At Risk",   budget:"₹35L",  actual:"₹26.5L" },
    { name:"Integration & Testing",   date:"10 Mar 2026", status:"Pending",   budget:"₹22L",  actual:"—"      },
    { name:"UAT & Go-Live",           date:"20 Mar 2026", status:"Pending",   budget:"₹7L",   actual:"—"      },
  ];

  const burnPct = Math.round((project.spent / project.budget) * 100);
  const forecastVariance = project.forecast - project.budget;
  const fmt = (n) => `₹${(n/100000).toFixed(1)}L`;

  return (
    <div className="fade-in">
      <TopBar
        title={project.name}
        sub={`${project.id} · ${project.client} · ${project.dept}`}
        actions={
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-outline" style={{ padding:"7px 14px", fontSize:12.5 }}><Ic n="edit" s={13} c={T.textMid}/>Edit</button>
            <button className="btn btn-gold" onClick={() => setPage("approvals")} style={{ padding:"7px 16px", fontSize:12.5 }}><Ic n="approval" s={13} c="#fff"/>Review Approvals</button>
          </div>
        }
      />
      <div style={{ padding:"20px 28px", maxWidth:1200 }}>

        {/* Header meta strip */}
        <div className="card" style={{ padding:"16px 22px", marginBottom:18, display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>
          <Bdg status={project.status}/><Bdg status={project.priority}/><Bdg status={project.type}/>
          <div style={{ width:1, height:24, background:T.border }}/>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
            {[
              {l:"PM", v:project.pm}, {l:"Delivery Head", v:project.dh},
              {l:"Start", v:project.start}, {l:"Deadline", v:project.end}, {l:"Phase", v:project.phase}
            ].map(f=>(
              <div key={f.l}><span style={{ fontSize:11, color:T.textLight, fontWeight:600, textTransform:"uppercase" }}>{f.l} </span>
              <span style={{ fontSize:13, fontWeight:600, color:T.text }}>{f.v}</span></div>
            ))}
          </div>
        </div>

        {/* ── COST BANNER ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:18 }}>
          {[
            { label:"Approved Budget",   value:fmt(project.budget),   sub:"Base contract",              color:T.blue,   bg:"#eff6ff",  icon:"paper"  },
            { label:"Amount Spent",      value:fmt(project.spent),    sub:`${burnPct}% of budget`,       color:burnPct>90?T.danger:T.warning, bg:burnPct>90?"#fef2f2":"#fff7ed", icon:"dollar" },
            { label:"Forecasted Total",  value:fmt(project.forecast), sub:`+${fmt(forecastVariance)} over budget`, color:T.danger, bg:"#fef2f2", icon:"trend"  },
            { label:"Remaining Budget",  value:fmt(project.budget-project.spent), sub:"Before overrun", color:T.green, bg:"#ecfdf5", icon:"shield" },
            { label:"Open Hiring Cost",  value:"₹51L/yr",              sub:"4 pending requests",         color:T.purple, bg:"#f5f3ff",  icon:"hiring" },
          ].map(s=>(
            <div key={s.label} className="card" style={{ padding:"14px 16px", borderLeft:`3px solid ${s.color}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ width:30, height:30, borderRadius:7, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ic n={s.icon} s={14} c={s.color}/>
                </div>
                <span style={{ fontSize:11, color:T.textLight, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.4px" }}>{s.label}</span>
              </div>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:700, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:11.5, color:T.textMid, marginTop:4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Budget burn bar */}
        <div className="card" style={{ padding:"14px 20px", marginBottom:18, display:"flex", alignItems:"center", gap:20 }}>
          <span style={{ fontSize:12.5, fontWeight:700, color:T.textMid, whiteSpace:"nowrap" }}>Budget Burn</span>
          <div style={{ flex:1 }}>
            <div style={{ position:"relative", height:12, background:"#f3f4f6", borderRadius:99, overflow:"hidden" }}>
              <div style={{ position:"absolute", height:"100%", width:`${burnPct}%`, borderRadius:99,
                background: burnPct>=90 ? `linear-gradient(90deg,${T.warning},${T.danger})` : `linear-gradient(90deg,${T.blue},${T.purple})`,
                transition:"width 0.5s ease" }}/>
              {/* Forecast marker */}
              <div style={{ position:"absolute", left:"100%", top:0, height:"100%", width:3, background:T.danger, opacity:0.6 }}/>
            </div>
          </div>
          <div style={{ display:"flex", gap:16, flexShrink:0 }}>
            <span style={{ fontSize:12, color:T.textMid }}>Spent <b style={{ color:burnPct>=90?T.danger:T.text }}>{burnPct}%</b></span>
            <span style={{ fontSize:12, color:T.danger }}>Forecast overrun <b>+{fmt(forecastVariance)}</b></span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, marginBottom:16, background:"#fff", borderRadius:10, padding:4, width:"fit-content", border:`1px solid ${T.border}` }}>
          {["overview","milestones","hiring","team","risk"].map(t=>(
            <button key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)}
              style={{ textTransform:"capitalize" }}>{t}</button>
          ))}
        </div>

        {tab==="overview" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            <div className="card" style={{ padding:22 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:12 }}>Project Description</div>
              <p style={{ fontSize:13.5, color:T.textMid, lineHeight:1.7 }}>{project.desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:18 }}>
                {[
                  {l:"Department",   v:project.dept     },
                  {l:"Team Size",    v:`${project.team} members`},
                  {l:"Open Requests",v:`${project.openReqs} positions`},
                  {l:"Go-Live",      v:project.go       },
                ].map(f=>(
                  <div key={f.l} style={{ background:T.bg, borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:11, color:T.textLight, fontWeight:600, textTransform:"uppercase" }}>{f.l}</div>
                    <div style={{ fontSize:13.5, fontWeight:600, marginTop:3, color:T.text }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{ padding:22 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, marginBottom:14 }}>Cost Breakdown by Category</div>
              {[
                { label:"Human Resources (Salaries)", val:"₹62L",  pct:70, color:T.blue   },
                { label:"Contract / Freelancers",     val:"₹15L",  pct:17, color:T.purple },
                { label:"Cloud & Infrastructure",     val:"₹7L",   pct:8,  color:T.gold   },
                { label:"Tools & Licences",           val:"₹4.4L", pct:5,  color:T.green  },
              ].map(d=>(
                <div key={d.label} style={{ marginBottom:13 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:13, color:T.textMid }}>{d.label}</span>
                    <span style={{ fontSize:13, fontWeight:700 }}>{d.val} <span style={{ color:T.textLight,fontWeight:400 }}>({d.pct}%)</span></span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width:`${d.pct}%`, background:d.color }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="milestones" && (
          <div className="card" style={{ overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["Milestone","Target Date","Status","Budgeted Cost","Actual Cost","Variance"].map(h=>(
                    <th key={h} style={{ padding:"11px 16px", textAlign:"left", fontSize:11.5, fontWeight:700, color:T.textLight, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {milestones.map((m, i) => {
                  const bv = parseFloat(m.budget.replace(/[₹L]/g,""));
                  const av = m.actual!=="—" ? parseFloat(m.actual.replace(/[₹L]/g,"")) : null;
                  const over = av && av > bv;
                  return (
                    <tr key={i} className="table-row">
                      <td style={{ padding:"12px 16px", fontWeight:600 }}>{m.name}</td>
                      <td style={{ padding:"12px 16px", color:T.textMid }}>{m.date}</td>
                      <td style={{ padding:"12px 16px" }}><Bdg status={m.status}/></td>
                      <td style={{ padding:"12px 16px" }}><span className="cost-pill"><Ic n="dollar" s={10} c="#92400e"/>{m.budget.replace("₹","")}</span></td>
                      <td style={{ padding:"12px 16px" }}>
                        {av ? <span style={{ fontWeight:700, color: over?T.danger:T.success }}>{m.actual}</span> : <span style={{ color:T.textLight }}>—</span>}
                      </td>
                      <td style={{ padding:"12px 16px" }}>
                        {av ? <span style={{ fontWeight:700, color: over?T.danger:T.success, fontSize:12 }}>
                          {over?"▲":"▼"} ₹{Math.abs(av-bv).toFixed(1)}L {over?"over":"saved"}
                        </span> : <span style={{ color:T.textLight }}>—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {tab==="hiring" && (
          <div className="card" style={{ overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>Hiring Requests for this Project</span>
              <div style={{ display:"flex", gap:8 }}>
                <span className="cost-pill">Total Open Cost: ₹51L/yr</span>
              </div>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["Request ID","Role","Type","Positions","Annual Cost","Status","Urgency","Waiting","Actions"].map(h=>(
                    <th key={h} style={{ padding:"10px 14px", fontSize:11.5, fontWeight:700, color:T.textLight, whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hiringReqs.map((r, i) => (
                  <tr key={i} className="table-row">
                    <td style={{ padding:"12px 14px", fontFamily:"monospace", fontSize:12, color:T.blue, fontWeight:700 }}>{r.id}</td>
                    <td style={{ padding:"12px 14px", fontWeight:600 }}>{r.role}</td>
                    <td style={{ padding:"12px 14px" }}><span className="tag">{r.type}</span></td>
                    <td style={{ padding:"12px 14px", textAlign:"center", fontWeight:700 }}>{r.positions}</td>
                    <td style={{ padding:"12px 14px" }}><span className="cost-pill"><Ic n="dollar" s={10} c="#92400e"/>{r.budget.replace("₹","")}</span></td>
                    <td style={{ padding:"12px 14px" }}><Bdg status={r.status}/></td>
                    <td style={{ padding:"12px 14px" }}><Bdg status={r.urgency}/></td>
                    <td style={{ padding:"12px 14px", color:T.textMid }}>{r.since}</td>
                    <td style={{ padding:"12px 14px" }}>
                      {r.status==="Pending" && (
                        <div style={{ display:"flex", gap:5 }}>
                          <button className="btn btn-approve" style={{ padding:"4px 10px", fontSize:11.5 }}>Approve</button>
                          <button className="btn btn-reject"  style={{ padding:"4px 10px", fontSize:11.5 }}>Reject</button>
                        </div>
                      )}
                      {r.status!=="Pending" && <button className="btn-ghost" style={{ fontSize:12 }}>View</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab==="team" && (
          <div className="card" style={{ overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:T.bg }}>
                  {["Member","Role","Employment Type","Cost","Utilisation","Since"].map(h=>(
                    <th key={h} style={{ padding:"10px 16px", fontSize:11.5, fontWeight:700, color:T.textLight }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {team.map((m, i) => (
                  <tr key={i} className="table-row">
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div className="avatar" style={{ background:`hsl(${i*60},60%,70%)`, color:"#fff", fontSize:11 }}>{m.avatar}</div>
                        <span style={{ fontWeight:600 }}>{m.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:"12px 16px", color:T.textMid }}>{m.role}</td>
                    <td style={{ padding:"12px 16px" }}><span className="tag">{m.type}</span></td>
                    <td style={{ padding:"12px 16px" }}><span className="cost-pill"><Ic n="dollar" s={10} c="#92400e"/>{m.cost.replace("₹","")}</span></td>
                    <td style={{ padding:"12px 16px", minWidth:120 }}><MiniBar value={m.util} max={100}/></td>
                    <td style={{ padding:"12px 16px", color:T.textMid }}>{m.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab==="risk" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
            {[
              { level:"Critical", title:"Budget Overrun Risk", desc:"Forecast shows ₹12L overrun by delivery. Requires immediate scope review or budget revision approval.", action:"Request Budget Revision" },
              { level:"High",     title:"Resource Gap",        desc:"4 critical positions unfilled. Project deadline 14 days away. Escalation recommended.", action:"Escalate to HR Head" },
              { level:"Medium",   title:"Timeline Slippage",   desc:"Dev Phase 2 is running 8 days behind. Potential impact on UAT and go-live dates.", action:"Review Schedule" },
              { level:"Low",      title:"Third-party Dependency", desc:"Legacy CRM integration pending vendor response. Monitoring weekly.", action:"Send Reminder" },
            ].map((r, i) => (
              <div key={i} className="card" style={{ padding:20, borderLeft:`4px solid ${r.level==="Critical"?T.danger:r.level==="High"?T.warning:r.level==="Medium"?T.gold:T.green}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <Ic n="alert" s={15} c={r.level==="Critical"?T.danger:r.level==="High"?T.warning:T.gold}/>
                  <Bdg status={r.level}/>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13.5 }}>{r.title}</span>
                </div>
                <p style={{ fontSize:13, color:T.textMid, lineHeight:1.6, marginBottom:12 }}>{r.desc}</p>
                <button className="btn btn-outline" style={{ fontSize:12, padding:"6px 14px" }}>{r.action}</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PAGE 3 — APPROVAL QUEUE (Management)
═══════════════════════════════════════════════════════════════════ */
const ApprovalQueue = () => {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [comment, setComment] = useState("");
  const [decisions, setDecisions] = useState({});

  const requests = [
    { id:"HR-042", role:"Sr. React Developer ×2",  project:"ERP Implementation",   pm:"Meena K.",  dept:"Enterprise",      type:"Full-time",  annualCost:2500000, totalCost:5000000, urgency:"Critical", submitted:"2 Mar 2026", waitDays:4, justification:"Phase 2 development requires 2 senior React developers to meet the March 20 go-live deadline. Current team is at 100% capacity.", financeStatus:"Approved", skills:["React","TypeScript","Node.js"],  budgetCode:"ENT-2026-002" },
    { id:"HR-043", role:"Data Architect ×1",        project:"Data Analytics Platform",pm:"Arjun D.", dept:"Data & AI",        type:"Contract",   annualCost:1800000, totalCost:900000,  urgency:"High",     submitted:"4 Mar 2026", waitDays:2, justification:"Need a Data Architect to design the lakehouse architecture before dev team onboards in April.", financeStatus:"Approved", skills:["AWS","Snowflake","dbt","Python"], budgetCode:"DAI-2026-001" },
    { id:"HR-044", role:"QA Lead ×1",              project:"Fintech Portal Revamp",  pm:"Ravi S.",   dept:"Engineering",     type:"Full-time",  annualCost:1100000, totalCost:1100000, urgency:"High",     submitted:"28 Feb 2026",waitDays:6, justification:"SIT and UAT phases require dedicated QA lead. Current QA engineer does not have lead experience.", financeStatus:"Pending",  skills:["Selenium","JIRA","API Testing"],  budgetCode:"ENG-2026-003" },
    { id:"HR-045", role:"Business Analyst ×2",     project:"Cloud Migration Phase 2",pm:"Sneha P.",  dept:"Infrastructure",  type:"Contract",   annualCost:1100000, totalCost:2200000, urgency:"Medium",   submitted:"5 Mar 2026", waitDays:1, justification:"Two BAs needed to document as-is/to-be processes and coordinate stakeholder workshops.", financeStatus:"Approved", skills:["BPMN","Visio","Stakeholder Mgmt"],budgetCode:"INF-2026-001" },
    { id:"HR-046", role:"DevOps Engineer ×1",      project:"Cloud Migration Phase 2",pm:"Sneha P.",  dept:"Infrastructure",  type:"Contract",   annualCost:1600000, totalCost:800000,  urgency:"High",     submitted:"3 Mar 2026", waitDays:3, justification:"CI/CD pipeline setup required before April infrastructure cutover. Existing team lacks DevOps bandwidth.", financeStatus:"Approved", skills:["Terraform","Kubernetes","AWS"],   budgetCode:"INF-2026-002" },
    { id:"HR-047", role:"UX Designer ×1",          project:"Mobile App – Retail",    pm:"Ravi S.",   dept:"Engineering",     type:"Freelance",  annualCost:800000,  totalCost:400000,  urgency:"Low",      submitted:"5 Mar 2026", waitDays:1, justification:"User testing phase requires a dedicated UX designer for 6 months to improve app usability score.", financeStatus:"Pending",  skills:["Figma","User Research","Prototyping"],budgetCode:"ENG-2026-004"},
  ];

  const fmtCr = (n) => n >= 10000000 ? `₹${(n/10000000).toFixed(2)}Cr` : `₹${(n/100000).toFixed(1)}L`;
  const statuses = ["All","Pending","Approved","Rejected"];
  const filtered = requests.filter(r => filter==="All" || (decisions[r.id]?.status || "Pending")===filter);

  const totalPendingBudget = requests.filter(r=>!decisions[r.id]).reduce((s,r)=>s+r.totalCost,0);
  const pendingCount = requests.filter(r=>!decisions[r.id]).length;
  const approvedCount = Object.values(decisions).filter(d=>d.status==="Approved").length;

  const decide = (id, status) => {
    setDecisions(d => ({ ...d, [id]:{ status, comment } }));
    setComment("");
    setModal(null);
  };

  return (
    <div className="fade-in">
      <TopBar title="Approval Queue" sub={`${pendingCount} requests awaiting your decision · ₹${(totalPendingBudget/10000000).toFixed(2)}Cr total budget`}/>
      <div style={{ padding:"22px 28px", maxWidth:1200 }}>

        {/* Cost summary banner */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
          {[
            { label:"Awaiting Decision",       val:pendingCount,            sub:`${fmtCr(totalPendingBudget)} at stake`, color:T.gold,   icon:"clock"    },
            { label:"Total Requested Budget",  val:fmtCr(requests.reduce((s,r)=>s+r.totalCost,0)), sub:"All requests this cycle", color:T.blue,   icon:"dollar"   },
            { label:"Approved This Week",      val:approvedCount,           sub:`${fmtCr(Object.values(decisions).filter(d=>d.status==="Approved").length*1200000)} committed`, color:T.green, icon:"check" },
            { label:"Finance Pre-Approved",    val:requests.filter(r=>r.financeStatus==="Approved").length, sub:"Cleared for mgmt sign-off", color:T.purple,icon:"shield" },
          ].map(s=>(
            <div key={s.label} className="card" style={{ padding:"16px 18px", display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{ width:38, height:38, borderRadius:9, background:`${s.color}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ic n={s.icon} s={16} c={s.color}/>
              </div>
              <div>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, color:T.text }}>{s.val}</div>
                <div style={{ fontSize:12, color:T.textMid, marginTop:3, fontWeight:500 }}>{s.label}</div>
                <div style={{ fontSize:11.5, color:s.color, marginTop:4, fontWeight:600 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
          {statuses.map(s=>(
            <button key={s} className={`tab${filter===s?" active":""}`} onClick={()=>setFilter(s)}>{s}
              {s==="All" && <span style={{ marginLeft:6, background:"rgba(255,255,255,0.3)", borderRadius:99, padding:"1px 7px", fontSize:11 }}>{requests.length}</span>}
            </button>
          ))}
        </div>

        {/* Requests */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {filtered.map((r) => {
            const dec = decisions[r.id];
            const isPending = !dec;

            return (
              <div key={r.id} className="card" style={{
                borderLeft:`4px solid ${r.urgency==="Critical"?T.danger:r.urgency==="High"?T.warning:r.urgency==="Medium"?T.gold:T.green}`,
                opacity: dec ? 0.7 : 1, transition:"opacity 0.2s"
              }}>
                <div style={{ padding:"16px 20px" }}>
                  {/* Row 1 */}
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, marginBottom:12 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"monospace", fontSize:12, color:T.blue, fontWeight:700 }}>{r.id}</span>
                        <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:T.text }}>{r.role}</span>
                        <Bdg status={r.urgency}/>
                        <Bdg status={r.type}/>
                        {dec && <Bdg status={dec.status}/>}
                      </div>
                      <div style={{ marginTop:5, fontSize:13, color:T.textMid }}>
                        <b style={{ color:T.text }}>{r.project}</b> · {r.dept} · PM: {r.pm} · Submitted {r.submitted} <span style={{ color:r.waitDays>=5?T.danger:T.warning }}>({r.waitDays} days waiting)</span>
                      </div>
                    </div>
                    {/* Cost highlight */}
                    <div style={{ background:`linear-gradient(135deg,${T.goldLight},#fde68a)`, border:`1px solid #fcd34d`,
                      borderRadius:12, padding:"12px 18px", textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontSize:11, color:"#92400e", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.4px" }}>Annual Cost</div>
                      <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800, color:"#78350f" }}>{fmtCr(r.annualCost)}</div>
                      <div style={{ fontSize:11.5, color:"#92400e", marginTop:2 }}>Total: {fmtCr(r.totalCost)}</div>
                    </div>
                  </div>

                  {/* Row 2 — details */}
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:12 }}>
                    <div style={{ background:T.bg, borderRadius:8, padding:"8px 12px", display:"flex", gap:6, alignItems:"center" }}>
                      <Ic n="tag" s={12} c={T.textLight}/>
                      <span style={{ fontSize:12, color:T.textMid }}>Budget Code: <b style={{ color:T.text }}>{r.budgetCode}</b></span>
                    </div>
                    <div style={{ background:T.bg, borderRadius:8, padding:"8px 12px", display:"flex", gap:6, alignItems:"center" }}>
                      <Ic n="approval" s={12} c={r.financeStatus==="Approved"?T.green:T.warning}/>
                      <span style={{ fontSize:12, color:T.textMid }}>Finance: <b style={{ color:r.financeStatus==="Approved"?T.green:T.warning }}>{r.financeStatus}</b></span>
                    </div>
                    <div style={{ background:T.bg, borderRadius:8, padding:"8px 12px" }}>
                      <span style={{ fontSize:12, color:T.textMid }}>Skills: </span>
                      {r.skills.map(sk=><span key={sk} className="tag" style={{ marginLeft:4, fontSize:11 }}>{sk}</span>)}
                    </div>
                  </div>

                  {/* Justification */}
                  <div style={{ background:`${T.blue}08`, border:`1px solid ${T.blue}20`, borderRadius:8,
                    padding:"10px 14px", marginBottom:12 }}>
                    <div style={{ fontSize:11.5, fontWeight:700, color:T.blue, marginBottom:3, display:"flex", gap:6, alignItems:"center" }}>
                      <Ic n="info" s={12} c={T.blue}/>BUSINESS JUSTIFICATION
                    </div>
                    <p style={{ fontSize:13, color:T.textMid, lineHeight:1.6 }}>{r.justification}</p>
                  </div>

                  {/* Decision row */}
                  {dec ? (
                    <div style={{ background:dec.status==="Approved"?T.greenLight:T.redLight, borderRadius:8,
                      padding:"10px 14px", display:"flex", alignItems:"center", gap:10 }}>
                      <Ic n={dec.status==="Approved"?"check":"x"} s={14} c={dec.status==="Approved"?T.green:T.danger}/>
                      <span style={{ fontSize:13, fontWeight:600, color:dec.status==="Approved"?T.success:T.danger }}>
                        {dec.status} by you
                      </span>
                      {dec.comment && <span style={{ fontSize:13, color:T.textMid }}>· "{dec.comment}"</span>}
                    </div>
                  ) : (
                    <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
                      <input className="input" placeholder="Add comments or conditions (optional)…"
                        value={modal===r.id? comment:""} onChange={e=>{ setModal(r.id); setComment(e.target.value); }}
                        style={{ flex:1, minWidth:200, fontSize:13, padding:"8px 12px" }}/>
                      <button className="btn btn-approve" onClick={()=>decide(r.id,"Approved")}>
                        <Ic n="check" s={14} c="#fff"/>Approve
                      </button>
                      <button className="btn btn-reject" onClick={()=>decide(r.id,"Rejected")}>
                        <Ic n="x" s={14} c="#fff"/>Reject
                      </button>
                      <button className="btn btn-outline" onClick={()=>setModal(r.id)} style={{ fontSize:12.5, padding:"8px 14px" }}>
                        <Ic n="msg" s={13} c={T.textMid}/>Request Info
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bulk actions bar */}
        {pendingCount > 1 && (
          <div style={{ position:"sticky", bottom:20, marginTop:16, background:T.sidebar, borderRadius:14,
            padding:"14px 22px", display:"flex", alignItems:"center", justifyContent:"space-between",
            boxShadow:"0 8px 32px rgba(0,0,0,0.25)", color:"#fff" }}>
            <div style={{ fontSize:13.5 }}>
              <b style={{ color:T.gold }}>{pendingCount}</b> requests pending · Total budget: <b style={{ color:T.gold }}>{fmtCr(totalPendingBudget)}</b>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn" style={{ background:"rgba(255,255,255,0.1)", color:"#fff", fontSize:12.5, padding:"7px 16px" }}>
                Export for Review
              </button>
              <button className="btn btn-approve" style={{ fontSize:12.5, padding:"7px 18px" }}
                onClick={()=>requests.filter(r=>!decisions[r.id]).forEach(r=>decide(r.id,"Approved"))}>
                <Ic n="check" s={13} c="#fff"/>Approve All Finance-Cleared
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── PLACEHOLDER ────────────────────────────────────────────────────────────── */
const Placeholder = ({ title, icon, setPage }) => (
  <div className="fade-in">
    <TopBar title={title}/>
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60vh", gap:16 }}>
      <div style={{ width:64, height:64, background:T.goldLight, borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Ic n={icon} s={28} c={T.gold}/>
      </div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700 }}>{title}</div>
      <div style={{ fontSize:14, color:T.textLight }}>Next sprint — coming soon.</div>
      <button className="btn btn-gold" onClick={()=>setPage("dashboard")}>← Back to Dashboard</button>
    </div>
  </div>
);

/* ─── APP ────────────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard:  <Dashboard  setPage={setPage}/>,
    projectview:<ProjectDetail setPage={setPage}/>,
    approvals:  <ApprovalQueue setPage={setPage}/>,
    portfolio:  <Placeholder title="Portfolio Overview"     icon="layers"    setPage={setPage}/>,
    escalations:<Placeholder title="Escalations"            icon="alert"     setPage={setPage}/>,
    budgets:    <Placeholder title="Budget Control"         icon="dollar"    setPage={setPage}/>,
    financial:  <Placeholder title="Financial Reports"      icon="bar"       setPage={setPage}/>,
    contracts:  <Placeholder title="Vendor & Contracts"     icon="paper"     setPage={setPage}/>,
    resources:  <Placeholder title="Resource Utilisation"   icon="cpu"       setPage={setPage}/>,
    workforce:  <Placeholder title="Workforce Analytics"    icon="pie"       setPage={setPage}/>,
    hiring:     <Placeholder title="Hiring Oversight"       icon="hiring"    setPage={setPage}/>,
    risk:       <Placeholder title="Risk & Compliance"      icon="shield"    setPage={setPage}/>,
    audit:      <Placeholder title="Audit Trail"            icon="eye"       setPage={setPage}/>,
    reports:    <Placeholder title="Executive Reports"      icon="trend"     setPage={setPage}/>,
    settings:   <Placeholder title="Settings"               icon="settings"  setPage={setPage}/>,
  };

  return (
    <>
      <style>{css}</style>
      <div style={{ display:"flex", minHeight:"100vh" }}>
        <Sidebar page={page} setPage={setPage}/>
        <div style={{ marginLeft:230, flex:1, background:T.bg, minHeight:"100vh" }}>
          {pages[page] || pages.dashboard}
        </div>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
