import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { C, FS, btnPrimary, btnSecondary, inputStyle } from "../tokens";
import { REPORT_CARDS, REPORT_DATA, REPORT_COLS, REPORT_STATUS_STYLE, PROCESS_MONTHS } from "../data/reports";

export default function GenerateReportsPage({ dummyMode, onNavigate }) {
  const [active, setActive] = useState("epfo");
  const [selYear, setSelYear] = useState("2026");
  const [selMonth, setSelMonth] = useState("Mar 2026");

  const rows = dummyMode ? (REPORT_DATA[active] || []) : [];
  const cols = REPORT_COLS[active] || [];

  const getRowValues = (row) => {
    if (active === "epfo") return [row.id, row.name, row.uan, row.gross, row.employer, row.employee, row.total, row.month, row.status];
    if (active === "lwf")  return [row.id, row.name, row.state, row.gross, row.employee, row.employer, row.total, row.month, row.status];
    if (active === "pt")   return [row.id, row.name, row.state, row.gross, row.pt, row.month, row.status];
    return [];
  };

  const thStyle = {
    padding: "10px 14px", background: C.bg, color: C.muted,
    fontSize: FS.xs, fontWeight: 600, textTransform: "uppercase",
    letterSpacing: 0.5, textAlign: "left", position: "sticky", top: 0, whiteSpace: "nowrap",
  };
  const tdStyle = (i) => ({
    padding: "11px 14px", fontSize: FS.sm, borderBottom: `1px solid ${C.border}`,
    background: i % 2 === 0 ? C.white : C.bg,
  });

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar dummyMode={dummyMode} />
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <Breadcrumb items={[
            { label:"Dashboard", onClick: () => onNavigate("dashboard") },
            { label:"Generate Reports" },
          ]} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h1 style={{ fontSize: FS.xl, fontWeight: 700 }}>Generate Reports</h1>
            <button style={{ ...btnPrimary, padding: "9px 20px", fontSize: FS.sm }}>
              ⬇ Download Report
            </button>
          </div>

          {/* Report type cards */}
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            {REPORT_CARDS.map(card => (
              <div
                key={card.key}
                onClick={() => setActive(card.key)}
                style={{
                  flex: 1, borderRadius: 14, padding: "20px",
                  border: `2px solid ${active === card.key ? card.color : C.border}`,
                  background: active === card.key ? card.bg : C.white,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: active === card.key
                    ? `0 4px 16px ${card.color}22`
                    : "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 10 }}>{card.icon}</div>
                <div style={{ fontWeight: 700, fontSize: FS.md, color: active === card.key ? card.color : C.primary }}>
                  {card.title}
                </div>
                <div style={{ fontSize: FS.sm, color: C.muted, marginTop: 4 }}>{card.desc}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
            <select style={{ ...inputStyle, width: "auto", padding: "7px 12px" }}
              value={selYear} onChange={e => setSelYear(e.target.value)}>
              <option>2024</option><option>2025</option><option>2026</option>
            </select>
            <select style={{ ...inputStyle, width: "auto", padding: "7px 12px" }}
              value={selMonth} onChange={e => setSelMonth(e.target.value)}>
              {PROCESS_MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Table */}
          <div style={{
            background: C.white, borderRadius: 14,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflowX: "auto",
          }}>
            {!dummyMode ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
                <div style={{ fontSize: 40 }}>📭</div>
                <div style={{ marginTop: 8 }}>No report data. Enable Dummy Data mode.</div>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {cols.map((col, i) => (
                      <th key={i} style={thStyle}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => {
                    const vals = getRowValues(row);
                    return (
                      <tr key={row.id + i}>
                        {vals.map((v, j) => {
                          const isStatus = j === vals.length - 1;
                          return (
                            <td key={j} style={tdStyle(i)}>
                              {isStatus ? (
                                <span style={{
                                  ...(REPORT_STATUS_STYLE[v] || {}),
                                  padding: "3px 10px", borderRadius: 20,
                                  fontSize: FS.xs, fontWeight: 600,
                                }}>{v}</span>
                              ) : (
                                <span style={{ fontWeight: j <= 1 ? 600 : 400 }}>{v}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
