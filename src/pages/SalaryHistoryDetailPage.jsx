import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { C, FS, btnPrimary, inputStyle } from "../tokens";
import { HISTORY_DETAIL } from "../data/salary";

const STATUS_STYLE = {
  Paid:    { bg:"#F0FFF4", color:"#276749" },
  Pending: { bg:"#FFF7ED", color:"#C2410C" },
  Failed:  { bg:"#FFF0F0", color:"#FF4F4F" },
};

export default function SalaryHistoryDetailPage({ dummyMode, row, onBack }) {
  const [search, setSearch] = useState("");

  const data = dummyMode ? HISTORY_DETAIL.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  const paid = data.filter(d => d.status === "Paid").length;
  const pending = data.filter(d => d.status === "Pending").length;

  const thStyle = {
    padding: "10px 14px", background: C.bg, color: C.muted,
    fontSize: FS.xs, fontWeight: 600, textTransform: "uppercase",
    letterSpacing: 0.5, textAlign: "left", position: "sticky", top: 0,
  };
  const tdStyle = (i) => ({
    padding: "11px 14px", fontSize: FS.sm, borderBottom: `1px solid ${C.border}`,
    background: i % 2 === 0 ? C.white : C.bg,
  });

  return (
    <div style={{ padding: "0 0 0 0" }}>
      <Breadcrumb items={[
        { label:"Salary History", onClick: onBack },
        { label: row?.month || "Detail" },
      ]} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: FS.xl, fontWeight: 700 }}>{row?.month}</h2>
        <button style={{ ...btnPrimary, padding: "9px 20px", fontSize: FS.sm }}>
          ⬇ Download Report
        </button>
      </div>

      {/* Stat cards */}
      {dummyMode && (
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          {[
            { label:"Total Processed", value: row?.total, bg:"#EEF2FF", color:"#4338CA" },
            { label:"Successfully Paid", value:`${paid} employees`, bg:"#F0FFF4", color:"#276749" },
            { label:"Pending Confirmation", value:`${pending} employees`, bg:"#FFF7ED", color:"#C2410C" },
          ].map(card => (
            <div key={card.label} style={{
              flex: 1, background: C.white, borderRadius: 14, padding: "16px 20px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: card.color }}>{card.value}</div>
              <div style={{ fontSize: FS.sm, color: C.muted, marginTop: 2 }}>{card.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          style={{ ...inputStyle, maxWidth: 280 }}
          placeholder="Search employees…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div style={{ background: C.white, borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "auto" }}>
        {!dummyMode ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
            <div style={{ fontSize: 40 }}>📭</div>
            <div style={{ marginTop: 8 }}>No data. Enable Dummy Data mode.</div>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Emp ID","Employee","Bank Account","Gross Salary","Deductions","Net Salary","Remark","Status"].map((h, i) => (
                  <th key={i} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((emp, i) => (
                <tr key={emp.id}>
                  <td style={tdStyle(i)}>{emp.id}</td>
                  <td style={tdStyle(i)}><strong>{emp.name}</strong></td>
                  <td style={tdStyle(i)}>{emp.bank}</td>
                  <td style={tdStyle(i)}>{emp.gross}</td>
                  <td style={tdStyle(i)}><span style={{ color: C.red }}>{emp.deductions}</span></td>
                  <td style={tdStyle(i)}><strong>{emp.total}</strong></td>
                  <td style={tdStyle(i)}><span style={{ color: C.muted }}>{emp.remark}</span></td>
                  <td style={tdStyle(i)}>
                    <span style={{
                      ...(STATUS_STYLE[emp.status] || {}),
                      padding: "3px 10px", borderRadius: 20, fontSize: FS.xs, fontWeight: 600,
                    }}>{emp.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
