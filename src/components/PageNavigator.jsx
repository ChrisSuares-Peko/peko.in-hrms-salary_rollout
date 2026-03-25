import { useState } from "react";
import { C, FS } from "../tokens";

const PAGES = [
  { key:"landing",   emoji:"🏠", label:"Home" },
  { key:"setup",     emoji:"⚙️", label:"Setup" },
  { key:"dashboard", emoji:"📊", label:"Dashboard" },
  { key:"employees", emoji:"👥", label:"Employees" },
  { key:"process",   emoji:"💳", label:"Process Salary" },
  { key:"history",   emoji:"🕐", label:"Salary History" },
  { key:"stats",     emoji:"📈", label:"Salary Stats" },
  { key:"banks",     emoji:"🏦", label:"Manage Banks" },
  { key:"reports",   emoji:"📋", label:"Reports" },
];

export default function PageNavigator({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const current = PAGES.find(p => p.key === currentPage) || PAGES[0];

  return (
    <div style={{
      position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)",
      zIndex: 900, display: "flex", alignItems: "stretch",
    }}>
      {/* Expanded panel */}
      {open && (
        <div style={{
          width: 160, background: C.white,
          borderLeft: `1px solid ${C.border}`,
          borderRadius: "12px 0 0 12px",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
          padding: "10px 0",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            fontSize: FS.xs, color: C.muted, fontWeight: 600,
            padding: "4px 14px 8px", textTransform: "uppercase", letterSpacing: 0.5,
          }}>Navigate</div>
          {PAGES.map(page => (
            <div
              key={page.key}
              onClick={() => { onNavigate(page.key); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 14px", cursor: "pointer", fontSize: FS.sm,
                background: page.key === currentPage ? C.redLight : "transparent",
                color: page.key === currentPage ? C.red : C.primary,
                fontWeight: page.key === currentPage ? 600 : 400,
                borderLeft: page.key === currentPage ? `3px solid ${C.red}` : "3px solid transparent",
                transition: "background 0.15s",
              }}
            >
              <span>{page.emoji}</span>
              <span>{page.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          width: 28, background: C.white,
          borderLeft: `1px solid ${C.border}`,
          borderRadius: open ? "0" : "8px 0 0 8px",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.06)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 4, padding: "10px 0", cursor: "pointer",
          minHeight: 64,
        }}
      >
        <span style={{ fontSize: 14 }}>{current.emoji}</span>
        <span style={{
          fontSize: 9, color: C.muted,
          writingMode: "vertical-rl", textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}>
          {open ? "◀" : "▶"}
        </span>
      </div>
    </div>
  );
}
