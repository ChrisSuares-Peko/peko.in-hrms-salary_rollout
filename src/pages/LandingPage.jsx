import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { C, FS } from "../tokens";
import { PAYROLL_COSTS, MONTHS_SHORT } from "../data/salary";

const QUICK_MENU = [
  { emoji:"👥", label:"Employees &\nDepartments",    page:"employees" },
  { emoji:"💰", label:"Salary",                       page:"process"   },
  { emoji:"📅", label:"Leaves &\nAttendance",         page:"dashboard" },
  { emoji:"💼", label:"Reimbursements",               page:"dashboard" },
  { emoji:"📄", label:"Company\nDocuments",           page:"dashboard" },
  { emoji:"📊", label:"Reports &\nForms",             page:"reports"   },
  { emoji:"📢", label:"Announcements",                page:"dashboard" },
  { emoji:"⬇️", label:"Download Payslip\n& Record",  page:"history"   },
];

function BarChart({ year, costs }) {
  const data = costs[year] || [];
  const max = Math.max(...data, 1);
  const yLabels = [0, 20000, 40000, 60000, 80000];

  return (
    <div style={{ position: "relative", paddingLeft: 52, paddingBottom: 28, paddingTop: 12 }}>
      {yLabels.map(v => (
        <div key={v} style={{
          position: "absolute", left: 0, fontSize: 11, color: "#8A8A8A",
          bottom: 28 + (v / max) * 160 - 7, width: 48, textAlign: "right",
        }}>
          {v === 0 ? "0" : `${v / 1000}k`}
        </div>
      ))}
      {yLabels.map(v => (
        <div key={v} style={{
          position: "absolute", left: 52, right: 0,
          bottom: 28 + (v / max) * 160,
          borderTop: "1px dashed #E5E7EB", pointerEvents: "none",
        }} />
      ))}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
        {data.map((val, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: "80%",
              height: val > 0 ? (val / max) * 160 : 2,
              background: val > 0
                ? "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)"
                : "#EBEBEB",
              borderRadius: "4px 4px 0 0",
              transition: "height 0.3s ease",
              minHeight: val > 0 ? 4 : 2,
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        {MONTHS_SHORT.map((m, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#8A8A8A" }}>{m}</div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage({ dummyMode, onNavigate }) {
  const [costYear, setCostYear] = useState(2026);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter,sans-serif", background: "#F7F7F7" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar dummyMode={dummyMode} />

        <main style={{ flex: 1, overflowY: "auto", padding: "28px 32px", display: "flex", gap: 20 }}>

          {/* ── Left / Main column ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Stat cards */}
            <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>

              {/* Card 1 — Active Employees */}
              <div style={{
                flex: "1 1 180px", background: "#FFFFFF",
                border: "1px solid #EBEBEB", borderRadius: 14, padding: "20px 24px",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: "#EDE7F6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 10, fontSize: 18,
                }}>👥</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>
                  {dummyMode ? "5" : "0"}
                </div>
                <div style={{ fontSize: 13, color: "#8A8A8A" }}>Active Employees</div>
              </div>

              {/* Card 2 — Net Processed Salary */}
              <div style={{
                flex: "1 1 180px", background: "#F0FFF4",
                border: "1px solid #EBEBEB", borderRadius: 14, padding: "20px 24px",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: "#DCFCE7",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 10, fontSize: 18,
                }}>💚</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>
                  {dummyMode ? "₹60,171.00" : "₹0.00"}
                </div>
                <div style={{ fontSize: 13, color: "#8A8A8A" }}>Net Processed Salary</div>
              </div>

              {/* Card 3 — Next Month Salary */}
              <div style={{
                flex: "1 1 180px", background: "#F0F4FF",
                border: "1px solid #EBEBEB", borderRadius: 14, padding: "20px 24px",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: "#E0E7FF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 10, fontSize: 18,
                }}>📅</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>
                  {dummyMode ? "₹75,207.50" : "₹0.00"}
                </div>
                <div style={{ fontSize: 13, color: "#8A8A8A" }}>Next Month Salary</div>
              </div>

            </div>

            {/* Quick Menu */}
            <div style={{
              background: "#FFFFFF", border: "1px solid #EBEBEB",
              borderRadius: 14, padding: "16px 8px", marginBottom: 24,
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 4 }}>
                {QUICK_MENU.map(item => (
                  <div
                    key={item.label}
                    onClick={() => onNavigate(item.page)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 8, padding: "12px 6px", cursor: "pointer", borderRadius: 12,
                      transition: "background 0.15s",
                    }}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%", background: "#FFF5F5",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
                    }}>{item.emoji}</div>
                    <div style={{
                      fontSize: 12, fontWeight: 500, color: "#1A1A1A",
                      textAlign: "center", lineHeight: 1.4, whiteSpace: "pre-line",
                    }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seat usage bar */}
            {dummyMode && (
              <div style={{
                background: "#FFFFFF", border: "1px solid #EBEBEB",
                borderRadius: 14, padding: "16px 22px", marginBottom: 24,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A" }}>
                    Team size: <span style={{ color: "#E83838" }}>5 Employees added</span>
                  </div>
                  <button style={{
                    border: "1.5px solid #E83838", borderRadius: 10,
                    background: "#FFFFFF", color: "#E83838",
                    fontWeight: 600, cursor: "pointer", padding: "5px 14px", fontSize: 13,
                  }}>Upgrade Plan</button>
                </div>
                <div style={{ background: "#E8E8E8", borderRadius: 99, height: 8, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ width: "50%", height: "100%", background: "#4CAF50", borderRadius: 99 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8A8A8A" }}>
                  <span>Last team member added on January 7, 2026</span>
                  <span>50% used · 5 seats remaining on your current plan</span>
                </div>
              </div>
            )}

            {/* Payroll Costs Chart */}
            <div style={{
              background: "#FFFFFF", border: "1px solid #EBEBEB",
              borderRadius: 14, padding: "20px 22px",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#1A1A1A" }}>Payroll Costs by Month</div>
                <select
                  value={costYear}
                  onChange={e => setCostYear(Number(e.target.value))}
                  style={{
                    border: "1px solid #EBEBEB", borderRadius: 8,
                    padding: "6px 12px", fontSize: 15,
                    background: "#FFFFFF", cursor: "pointer", outline: "none",
                  }}
                >
                  {[2026, 2025, 2024].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              {dummyMode
                ? <BarChart year={costYear} costs={PAYROLL_COSTS} />
                : (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "#8A8A8A", fontSize: 13 }}>
                    📭 No data yet
                  </div>
                )
              }
            </div>

            {/* Footer */}
            <div style={{
              marginTop: 48, borderTop: "1px solid #EBEBEB", paddingTop: 20,
              display: "flex", justifyContent: "space-between", flexWrap: "wrap",
              fontSize: 13, color: "#8A8A8A", gap: 8,
            }}>
              <span>© 2024-2026 Peko Payment Services LLC. All Rights Reserved.</span>
              <span style={{ display: "flex", gap: 20 }}>
                {["Peko Platform Agreement", "Privacy Policy", "Refund Policy", "Cookie Policy"].map(l => (
                  <span key={l} style={{ cursor: "pointer", textDecoration: "underline" }}>{l}</span>
                ))}
              </span>
            </div>

          </div>

          {/* ── Right panel ── */}
          <div style={{ width: 280, minWidth: 260, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Process Salary CTA button */}
            <button
              onClick={() => onNavigate("setup")}
              style={{
                border: "none", borderRadius: 10,
                background: "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
                color: "#fff", fontWeight: 600, cursor: "pointer",
                boxShadow: "0 2px 8px rgba(200,40,40,0.25)",
                padding: "14px 20px", fontSize: 15,
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8, width: "100%",
              }}
            >
              💳 Process Salary
            </button>

            {/* Activities panel */}
            <div style={{
              background: "#FFFFFF", border: "1px solid #EBEBEB",
              borderRadius: 14, padding: "20px", flex: 1,
            }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A", marginBottom: 16 }}>
                Activities
              </div>
              {dummyMode ? (
                <div style={{
                  background: "#F7F7F7", border: "1px solid #EBEBEB",
                  borderRadius: 10, padding: "14px",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: "#1A1A1A", marginBottom: 6 }}>
                    Action Required: HR Settings
                  </div>
                  <div style={{ fontSize: 13, color: "#8A8A8A", lineHeight: 1.6, marginBottom: 8 }}>
                    A few HR settings need your attention to keep payroll running without a hitch. Tap to review and update.
                  </div>
                  <div style={{ fontSize: 13, color: "#E83838", fontWeight: 500 }}>
                    Due by 2026-03-20
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#8A8A8A" }}>
                  📭 Nothing here yet — your activity will show up as things get moving.
                </div>
              )}
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
