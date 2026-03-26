import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import { PAYROLL_COSTS, MONTHS_SHORT } from "../data/salary";

const QUICK_ACTIONS = [
  { label:"Payroll Employees", page:"employees", bg:"#FFF3E0", color:"#E65100", icon:"👥" },
  { label:"Process Salary",    page:"process",   bg:"#E8F5E9", color:"#2E7D32", icon:"💳" },
  { label:"Salary History",    page:"history",   bg:"#FFF8E1", color:"#F57F17", icon:"📋" },
  { label:"Salary Stats",      page:"stats",     bg:"#E3F2FD", color:"#1565C0", icon:"📈" },
  { label:"Manage Banks",      page:"banks",     bg:"#FCE4EC", color:"#C62828", icon:"🏦" },
  { label:"Generate Reports",  page:"reports",   bg:"#EDE7F6", color:"#4527A0", icon:"📑" },
];


export default function DashboardPage({ dummyMode, onNavigate }) {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [bonus, setBonus] = useState({ month: "", employee: "", amount: "", remark: "", bank: "" });

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter,sans-serif", background: "#F7F7F7" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar dummyMode={dummyMode} />

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px", display: "flex", gap: 20 }}>

          {/* ── Main column ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            <Breadcrumb items={[{ label: "Payroll" }, { label: "Dashboard" }]} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A1A", margin: "0 0 5px" }}>
                  Salary Dashboard
                </h1>
                <p style={{ fontSize: 13, color: "#8A8A8A", margin: 0 }}>
                  Your payroll command centre — track disbursements, monitor balances, and run salary cycles all in one place.
                </p>
              </div>
              <button
                onClick={() => onNavigate("process")}
                style={{
                  border: "none", borderRadius: 10, flexShrink: 0,
                  background: "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
                  color: "#fff", fontWeight: 600, cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(200,40,40,0.25)",
                  padding: "11px 24px", fontSize: 15,
                }}
              >
                💳 Process Salary
              </button>
            </div>

            {/* Stat cards */}
            <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>

              {/* Card 1 — Current Month Due */}
              <div style={{ flex: "1 1 180px", background: "#F0FFF4", borderRadius: 14, padding: "20px 22px", border: "1px solid #EBEBEB" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>📅</span>
                  <div style={{ fontSize: 13, color: "#8A8A8A" }}>Current Month Due</div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>
                  {dummyMode ? "₹3,67,000" : "₹0"}
                </div>
                <div style={{ fontSize: 13, color: "#8A8A8A" }}>
                  {dummyMode ? "March 2026 · 5 employees" : "—"}
                </div>
              </div>

              {/* Card 2 — Last Month Rolled Out */}
              <div style={{ flex: "1 1 180px", background: "#FFF0F0", borderRadius: 14, padding: "20px 22px", border: "1px solid #EBEBEB" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 18 }}>✅</span>
                  <div style={{ fontSize: 13, color: "#8A8A8A" }}>Last Month Rolled Out</div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#1A1A1A", marginBottom: 4 }}>
                  {dummyMode ? "₹3,67,000" : "₹0"}
                </div>
                <div style={{ fontSize: 13, color: "#8A8A8A" }}>
                  {dummyMode ? "February 2026 · Completed" : "—"}
                </div>
              </div>

              {/* Card 3 — Primary Bank Account */}
              <div style={{
                flex: "1 1 180px",
                background: "#F5F0FF",
                borderRadius: 14,
                padding: "20px 22px",
                border: "1px solid #EBEBEB",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ fontSize:18 }}>🏦</span>
                  <div style={{ fontSize:13, color:"#8A8A8A" }}>Primary Bank Account</div>
                </div>

                {dummyMode ? (
                  <>
                    <div style={{ fontSize:20, fontWeight:700, color:"#1A1A1A", marginBottom:4 }}>
                      HDFC Bank
                    </div>
                    <div style={{ fontSize:15, fontWeight:600, color:"#1A1A1A", marginBottom:4 }}>
                      ••••••••1234
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ fontSize:13, color:"#8A8A8A" }}>Current Account</span>
                      <span style={{
                        fontSize:11, fontWeight:700,
                        padding:"1px 7px", borderRadius:20,
                        background:"#E8F5E9", color:"#276749",
                      }}>Default</span>
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize:15, color:"#8A8A8A" }}>No account linked</div>
                )}
              </div>

            </div>

            {/* Quick Actions */}
            <div style={{
              background: "#FFFFFF", border: "1px solid #EBEBEB",
              borderRadius: 14, padding: "18px 8px", marginBottom: 24,
            }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#1A1A1A", marginBottom: 14, paddingLeft: 12 }}>
                Quick Actions
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {QUICK_ACTIONS.map(({ icon, label, page, bg }) => (
                  <div
                    key={label}
                    onClick={() => onNavigate(page)}
                    style={{
                      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                      gap: 8, padding: "16px 8px", cursor: "pointer", borderRadius: 12,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#F7F7F7"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%", background: bg,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                    }}>{icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1A1A1A", textAlign: "center", lineHeight: 1.4 }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payroll Costs Chart */}
            <div style={{ background: "#FFFFFF", border: "1px solid #EBEBEB", borderRadius: 14, padding: "22px 24px" }}>

              {/* Chart header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A" }}>Payroll Costs by Month</div>
                <select
                  value={selectedYear}
                  onChange={e => setSelectedYear(Number(e.target.value))}
                  style={{ border: "1px solid #EBEBEB", borderRadius: 8, padding: "6px 12px", fontSize: 15, background: "#FFFFFF", cursor: "pointer", outline: "none" }}
                >
                  {[2026, 2025, 2024].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {!dummyMode ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#8A8A8A", fontSize: 13 }}>📭 No payroll data yet</div>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>

                  {/* Y-axis labels */}
                  <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    paddingBottom: 28, width: 44, flexShrink: 0, textAlign: "right",
                  }}>
                    {[400000, 300000, 200000, 100000, 0].map(t => (
                      <div key={t} style={{ fontSize: 11, color: "#8A8A8A", lineHeight: 1 }}>
                        {t === 0 ? "0" : `${t / 1000}k`}
                      </div>
                    ))}
                  </div>

                  {/* Bars + grid + x-axis */}
                  <div style={{ flex: 1, minWidth: 0 }}>

                    {/* Grid lines + bars area */}
                    <div style={{ position: "relative", height: 200 }}>

                      {/* Dashed horizontal grid lines */}
                      {[0, 25, 50, 75, 100].map(pct => (
                        <div
                          key={pct}
                          style={{
                            position: "absolute", left: 0, right: 0,
                            bottom: `${pct}%`,
                            borderTop: pct === 0 ? "1px solid #D1D5DB" : "1px dashed #E5E7EB",
                            zIndex: 0,
                          }}
                        />
                      ))}

                      {/* Bars */}
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "flex-end",
                        gap: 4, paddingBottom: 1, zIndex: 1,
                      }}>
                        {(PAYROLL_COSTS[selectedYear] || []).map((val, i) => {
                          const maxVal = 400000;
                          const heightPct = val > 0 ? Math.max(2, (val / maxVal) * 100) : 0;
                          return (
                            <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", height: "100%" }}>
                              <div style={{
                                width: "100%",
                                height: val > 0 ? `${heightPct}%` : "2px",
                                background: val > 0 ? "linear-gradient(180deg,#FF6B6B 0%,#E03030 100%)" : "#F3F4F6",
                                borderRadius: "3px 3px 0 0",
                                transition: "height 0.3s ease",
                                opacity: val > 0 ? 1 : 0.3,
                              }} />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* X-axis month labels */}
                    <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
                      {MONTHS_SHORT.map(m => (
                        <div key={m} style={{ flex: 1, fontSize: 11, color: "#8A8A8A", textAlign: "center" }}>{m}</div>
                      ))}
                    </div>

                  </div>
                </div>
              )}
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

          {/* ── Right panel — One-Time Payments ── */}
          <div style={{
            width: 288, minWidth: 260, background: "#FFFFFF",
            border: "1px solid #EBEBEB", borderRadius: 14,
            padding: "22px 18px", height: "fit-content",
            flexShrink: 0,
          }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A", marginBottom: 4 }}>
              One-Time Payments
            </div>
            <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 18, lineHeight: 1.5 }}>
              Need to pay a bonus, incentive, or ad-hoc salary? Process it here without touching the regular payroll cycle.
            </div>

            {/* Month */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 5 }}>Month</div>
              <select
                value={bonus.month}
                onChange={e => setBonus(b => ({ ...b, month: e.target.value }))}
                style={{ width: "100%", border: "1px solid #EBEBEB", borderRadius: 8, padding: "9px 10px", fontSize: 15, background: "#FFFFFF", boxSizing: "border-box", outline: "none" }}
              >
                <option value="">Select Month</option>
                {["2026-04", "2026-03", "2026-02", "2026-01", "2025-12", "2025-11"].map(m =>
                  <option key={m} value={m}>{m}</option>
                )}
              </select>
            </div>

            {/* Employee */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 5 }}>Employee</div>
              <select
                value={bonus.employee}
                onChange={e => setBonus(b => ({ ...b, employee: e.target.value }))}
                style={{ width: "100%", border: "1px solid #EBEBEB", borderRadius: 8, padding: "9px 10px", fontSize: 15, background: "#FFFFFF", boxSizing: "border-box", outline: "none" }}
              >
                <option value="">Select Employee</option>
                {["Ravi Kumar", "Priya Sharma", "Anjali Mehta", "Suresh Pillai", "Neha Joshi"].map(n =>
                  <option key={n} value={n}>{n}</option>
                )}
              </select>
            </div>

            {/* Amount */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 5 }}>Amount (₹)</div>
              <input
                type="number"
                placeholder="Enter amount"
                value={bonus.amount}
                onChange={e => setBonus(b => ({ ...b, amount: e.target.value }))}
                style={{ width: "100%", border: "1px solid #EBEBEB", borderRadius: 10, padding: "10px 14px", fontSize: 15, outline: "none", boxSizing: "border-box", background: "#FFFFFF", color: "#1A1A1A" }}
              />
            </div>

            {/* Remark */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 5 }}>Remark</div>
              <input
                placeholder="e.g. Q1 performance bonus"
                value={bonus.remark}
                onChange={e => setBonus(b => ({ ...b, remark: e.target.value }))}
                style={{ width: "100%", border: "1px solid #EBEBEB", borderRadius: 10, padding: "10px 14px", fontSize: 15, outline: "none", boxSizing: "border-box", background: "#FFFFFF", color: "#1A1A1A" }}
              />
            </div>

            {/* Pay From */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 5 }}>Pay From</div>
              <select
                value={bonus.bank}
                onChange={e => setBonus(b => ({ ...b, bank: e.target.value }))}
                style={{ width: "100%", border: "1px solid #EBEBEB", borderRadius: 8, padding: "9px 10px", fontSize: 15, background: "#FFFFFF", boxSizing: "border-box", outline: "none" }}
              >
                <option value="">Select Bank Account</option>
                <option value="b1">HDFC – XXXX1234 (₹12,40,000)</option>
                <option value="b2">ICICI – XXXX5678 (₹8,75,500)</option>
                <option value="b3">SBI – XXXX9012 (₹3,20,000)</option>
              </select>
            </div>

            {/* CTA */}
            <button style={{
              border: "none", borderRadius: 10,
              background: "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
              color: "#fff", fontWeight: 600, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(200,40,40,0.25)",
              width: "100%", padding: "11px", fontSize: 15,
            }}>
              💳 Process Payment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
