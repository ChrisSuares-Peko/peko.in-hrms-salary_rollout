import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import SalaryHistoryDetailPage from "./SalaryHistoryDetailPage";
import { C, FS, btnPrimary, btnSecondary } from "../tokens";
import { HISTORY_DATA } from "../data/salary";

const STATUS_STYLE = {
  Completed:     { bg:"#F0FFF4", color:"#276749" },
  "In Progress": { bg:"#EEF2FF", color:"#4338CA" },
  Failed:        { bg:"#FFF0F0", color:"#FF4F4F" },
};

export default function SalaryHistoryPage({ dummyMode, onNavigate }) {
  const [year, setYear] = useState(2026);
  const [viewDetail, setViewDetail] = useState(false);
  const [detailRow, setDetailRow] = useState(null);

  const data = dummyMode ? (HISTORY_DATA[year] || []) : [];

  const thStyle = {
    padding: "10px 14px", background: C.bg, color: C.muted,
    fontSize: FS.xs, fontWeight: 600, textTransform: "uppercase",
    letterSpacing: 0.5, textAlign: "left", position: "sticky", top: 0,
  };
  const tdStyle = (i) => ({
    padding: "12px 14px", fontSize: FS.sm, borderBottom: `1px solid ${C.border}`,
    background: i % 2 === 0 ? C.white : C.bg,
  });

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar dummyMode={dummyMode} />
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {viewDetail ? (
            <SalaryHistoryDetailPage
              dummyMode={dummyMode}
              row={detailRow}
              onBack={() => { setViewDetail(false); setDetailRow(null); }}
            />
          ) : (
            <>
              <Breadcrumb items={[
                { label:"Dashboard", onClick: () => onNavigate("dashboard") },
                { label:"Salary History" },
              ]} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h1 style={{ fontSize: FS.xl, fontWeight: 700 }}>Salary History</h1>
                <div style={{ display: "flex", gap: 8 }}>
                  {[2025, 2026].map(y => (
                    <button key={y} onClick={() => setYear(y)} style={{
                      padding: "7px 16px", borderRadius: 8, fontSize: FS.sm, fontWeight: 600,
                      border: `1.5px solid ${year === y ? C.red : C.border}`,
                      background: year === y ? C.redLight : C.white,
                      color: year === y ? C.red : C.muted, cursor: "pointer",
                    }}>{y}</button>
                  ))}
                </div>
              </div>

              <div style={{ background: C.white, borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "auto" }}>
                {!dummyMode ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
                    <div style={{ fontSize: 40 }}>📭</div>
                    <div style={{ marginTop: 8 }}>No history. Enable Dummy Data mode.</div>
                  </div>
                ) : data.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
                    <div style={{ fontSize: 40 }}>📭</div>
                    <div style={{ marginTop: 8 }}>No data for {year}.</div>
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Salary Month","Employees","Salaries Processed","Total Payout","Status",""].map((h, i) => (
                          <th key={i} style={thStyle}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, i) => (
                        <tr key={row.month}>
                          <td style={tdStyle(i)}><strong>{row.month}</strong></td>
                          <td style={tdStyle(i)}>{row.employees}</td>
                          <td style={tdStyle(i)}>{row.salaries}</td>
                          <td style={tdStyle(i)}><strong>{row.total}</strong></td>
                          <td style={tdStyle(i)}>
                            <span style={{
                              ...(STATUS_STYLE[row.status] || {}),
                              padding: "3px 10px", borderRadius: 20, fontSize: FS.xs, fontWeight: 600,
                            }}>{row.status}</span>
                          </td>
                          <td style={tdStyle(i)}>
                            <button
                              onClick={() => { setDetailRow(row); setViewDetail(true); }}
                              style={{ ...btnSecondary, padding: "6px 14px", fontSize: FS.xs }}
                            >View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
