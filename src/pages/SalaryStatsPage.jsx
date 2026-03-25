import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import { C, FS, btnPrimary, btnSecondary, inputStyle } from "../tokens";
import { STATS_DATA, STATS_MONTHS } from "../data/salary";
import { ACTIVE_EMPLOYEES, PAST_EMPLOYEES } from "../data/employees";

export default function SalaryStatsPage({ dummyMode, onNavigate }) {
  const [tab, setTab] = useState("active");
  const [year, setYear] = useState(2026);
  const [search, setSearch] = useState("");

  const data = dummyMode ? (STATS_DATA[year] || []) : [];
  const filtered = data.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  const thStyle = {
    padding: "10px 14px", background: C.bg, color: C.muted,
    fontSize: FS.xs, fontWeight: 600, textTransform: "uppercase",
    letterSpacing: 0.5, textAlign: "left", position: "sticky", top: 0, whiteSpace: "nowrap",
  };
  const tdStyle = (i) => ({
    padding: "11px 14px", fontSize: FS.sm, borderBottom: `1px solid ${C.border}`,
    background: i % 2 === 0 ? C.white : C.bg, whiteSpace: "nowrap",
  });

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar dummyMode={dummyMode} />
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <Breadcrumb items={[
            { label:"Dashboard", onClick: () => onNavigate("dashboard") },
            { label:"Salary Stats" },
          ]} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h1 style={{ fontSize: FS.xl, fontWeight: 700 }}>Salary Stats</h1>
            <button style={{ ...btnPrimary, padding: "9px 20px", fontSize: FS.sm }}>
              ⬇ Export CSV
            </button>
          </div>

          {/* Tabs + Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 4, background: C.bg, borderRadius: 10, padding: 4 }}>
              {["active","past"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: FS.sm,
                  background: tab === t ? C.white : "transparent",
                  color: tab === t ? C.primary : C.muted,
                  boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}>
                  {t === "active" ? "Active Employees" : "Past Employees"}
                </button>
              ))}
            </div>
            <input
              style={{ ...inputStyle, maxWidth: 240 }}
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8 }}>
              {[2025, 2026].map(y => (
                <button key={y} onClick={() => setYear(y)} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: FS.sm, fontWeight: 600,
                  border: `1.5px solid ${year === y ? C.red : C.border}`,
                  background: year === y ? C.redLight : C.white,
                  color: year === y ? C.red : C.muted, cursor: "pointer",
                }}>{y}</button>
              ))}
            </div>
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
                <div style={{ marginTop: 8 }}>No stats. Enable Dummy Data mode.</div>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, minWidth: 80 }}>Emp ID</th>
                    <th style={{ ...thStyle, minWidth: 140 }}>Employee Name</th>
                    {STATS_MONTHS.map(m => (
                      <th key={m} style={{ ...thStyle, minWidth: 90 }}>{m.slice(0,3)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp, i) => (
                    <tr key={emp.id}>
                      <td style={tdStyle(i)}>{emp.id}</td>
                      <td style={tdStyle(i)}><strong>{emp.name}</strong></td>
                      {emp.vals.map((v, j) => (
                        <td key={j} style={{
                          ...tdStyle(i),
                          color: v ? C.primary : C.border,
                          fontWeight: v ? 500 : 400,
                        }}>{v || "—"}</td>
                      ))}
                    </tr>
                  ))}
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
