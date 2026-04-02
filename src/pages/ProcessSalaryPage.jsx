import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import ProgressPopup from "../components/ProgressPopup";
import { SALARY_ROWS, PROCESS_MONTHS, BANK_ACCOUNTS_DROPDOWN } from "../data/salary";
import { ACTIVE_EMPLOYEES } from "../data/employees";

const STATUS_STYLE = {
  Unpaid:   { bg: "#FFF7ED", color: "#C2410C" },
  Paid:     { bg: "#F0FFF4", color: "#276749" },
  Excluded: { bg: "#F3F4F6", color: "#9CA3AF" },
};

const BreakdownPopover = ({ items, total, type, onClose }) => {
  const isGross = type === "gross";
  const accentColor = isGross ? "#16A34A" : "#E83838";
  const bgAccent = isGross ? "#F0FDF4" : "#FFF0F0";

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#ffffff",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
        border: "1px solid #F0F0F0",
        padding: "14px 16px",
        minWidth: 220,
        zIndex: 500,
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* Arrow */}
      <div style={{
        position: "absolute", top: -6, left: "50%",
        transform: "translateX(-50%) rotate(45deg)",
        width: 12, height: 12,
        background: "#ffffff",
        border: "1px solid #F0F0F0",
        borderRight: "none", borderBottom: "none",
      }} />

      {/* Title */}
      <div style={{
        fontSize: 11, fontWeight: 700, color: accentColor,
        textTransform: "uppercase", letterSpacing: "0.5px",
        marginBottom: 10,
      }}>
        {isGross ? "Gross Salary Breakdown" : "Deductions Breakdown"}
      </div>

      {/* Line items */}
      {items.map((item, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "5px 0",
          borderBottom: i < items.length - 1 ? "1px solid #F5F5F5" : "none",
        }}>
          <span style={{ fontSize: 12, color: "#555" }}>{item.label}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#1A1A1A" }}>
            ₹{item.amount.toLocaleString("en-IN")}
          </span>
        </div>
      ))}

      {/* Total row */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginTop: 8,
        padding: "7px 10px", borderRadius: 8,
        background: bgAccent,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>Total</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: accentColor }}>
          ₹{total.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};

export default function ProcessSalaryPage({ dummyMode, onNavigate }) {
  const [rows, setRows] = useState(SALARY_ROWS.map(r => ({ ...r })));
  const [selectedMonth, setSelectedMonth] = useState("Mar 2026");
  const [selectedBank, setSelectedBank] = useState(BANK_ACCOUNTS_DROPDOWN[0].id);
  const [editRow, setEditRow] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [verified, setVerified] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [activePopover, setActivePopover] = useState(null);

  const activeRows = rows.filter(r => r.status !== "Excluded");
  const totalSalary = dummyMode
    ? activeRows.reduce((s, r) => s + parseInt((r.total || "0").replace(/[₹,]/g, ""), 10), 0)
    : 0;
  const bank = BANK_ACCOUNTS_DROPDOWN.find(b => b.id === selectedBank);

  const netSalary = () =>
    (parseInt(editForm.grossSalary) || 0)
    - (parseInt(editForm.deductions) || 0)
    + (parseInt(editForm.bonus) || 0);

  const toggleExclude = (id) => {
    setRows(prev => prev.map(r => {
      if (r.id !== id) return r;
      const next = r.status === "Excluded" ? "Unpaid" : "Excluded";
      return { ...r, status: next };
    }));
  };

  const openEdit = (row) => {
    setEditRow(row);
    setEditForm({
      name: row.name,
      id: row.id,
      grossSalary: parseInt((row.salary || "0").replace(/[₹,]/g, ""), 10) || 0,
      deductions: parseInt((row.deductions || "0").replace(/[₹,]/g, ""), 10) || 0,
      bonus: 0,
    });
  };

  const saveEdit = () => {
    const net = netSalary();
    setRows(prev => prev.map(r => r.id === editRow.id ? {
      ...r,
      salary: `₹${Number(editForm.grossSalary).toLocaleString("en-IN")}`,
      deductions: `₹${Number(editForm.deductions).toLocaleString("en-IN")}`,
      total: `₹${net.toLocaleString("en-IN")}`,
    } : r));
    setEditRow(null);
  };

  const getBreakdown = (gross, deduction) => ({
    gross: [
      { label: "Basic Salary",     amount: Math.round(gross * 0.50) },
      { label: "HRA",              amount: Math.round(gross * 0.25) },
      { label: "Other Allowances", amount: Math.round(gross * 0.15) },
      { label: "Bonus",            amount: Math.round(gross * 0.10) },
    ],
    deduction: [
      { label: "Professional Tax", amount: Math.round(deduction * 0.10) },
      { label: "EPF Contribution", amount: Math.round(deduction * 0.60) },
      { label: "Insurance",        amount: Math.round(deduction * 0.30) },
    ],
  });

  useEffect(() => {
    const handleClickOutside = () => setActivePopover(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const thStyle = {
    padding: "11px 14px", textAlign: "left",
    fontWeight: 600, color: "#8A8A8A",
    borderBottom: "1px solid #EBEBEB",
    whiteSpace: "nowrap", fontSize: 13,
    background: "#FAFAFA",
  };

  const tdStyle = (i, excluded) => ({
    padding: "11px 14px",
    borderBottom: "1px solid #EBEBEB",
    background: excluded ? "#FAFAFA" : (i % 2 === 0 ? "#FFFFFF" : "#FAFAFA"),
    opacity: excluded ? 0.55 : 1,
    fontSize: 14,
  });

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter,sans-serif", background: "#F7F7F7" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar dummyMode={dummyMode} />

        <div style={{ flex: 1, overflowY: "auto", display: "flex", gap: 0 }}>
          <div style={{ flex: 1, minWidth: 0, padding: "28px 32px" }}>

            <Breadcrumb items={[
              { label: "Payroll", onClick: () => onNavigate("dashboard") },
              { label: "Process Salary" },
            ]} />

            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A1A", margin: "0 0 20px" }}>
              Process Salary
            </h1>

            {/* Warning banner */}
            {dummyMode && (
              <div style={{
                background: "#FFFBEB",
                border: "1px solid #FDE68A",
                borderRadius: 10,
                padding: "11px 16px",
                fontSize: 15,
                color: "#92400E",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                ⚠️ Heads up — your account balance may fall short. Please top up before triggering payroll.
              </div>
            )}

            {/* Table card */}
            <div style={{
              background: "#FFFFFF", border: "1px solid #EBEBEB",
              borderRadius: 14, overflow: "hidden", marginBottom: 0,
            }}>
              {/* Card header */}
              <div style={{
                padding: "18px 22px",
                borderBottom: "1px solid #EBEBEB",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A" }}>
                  Salary Payments —{" "}
                  <span style={{ color: "#E83838" }}>{selectedMonth}</span>
                </div>
                <select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(e.target.value)}
                  style={{
                    border: "1px solid #EBEBEB", borderRadius: 8,
                    padding: "9px 16px", fontSize: 15,
                    background: "#FFFFFF", cursor: "pointer", fontWeight: 500, outline: "none",
                  }}
                >
                  {PROCESS_MONTHS.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              {/* Table */}
              {!dummyMode ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#8A8A8A" }}>
                  <div style={{ fontSize: 40 }}>📭</div>
                  <div style={{ marginTop: 8 }}>No salary data. Enable Dummy Data mode.</div>
                </div>
              ) : (
                <>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          {["EMP ID", "EMPLOYEE NAME & EMAIL", "ACCOUNT DETAIL", "TRANS. TYPE",
                            "GROSS SALARY", "DEDUCTIONS", "TOTAL", "REMARK", "STATUS", "ACTIONS"].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => {
                          const excluded = row.status === "Excluded";
                          return (
                            <tr key={row.id}>
                              <td style={tdStyle(i, excluded)}>
                                <span style={{ color: "#8A8A8A", fontSize: 13 }}>{row.id}</span>
                              </td>
                              <td style={tdStyle(i, excluded)}>
                                <div style={{ fontWeight: 600, color: excluded ? "#9CA3AF" : "#1A1A1A" }}>
                                  {row.name}
                                </div>
                                <div style={{ fontSize: 11, color: "#8A8A8A", marginTop: 2 }}>
                                  {ACTIVE_EMPLOYEES.find(e => e.id === row.id)?.email || ""}
                                </div>
                              </td>
                              <td style={tdStyle(i, excluded)}>
                                <div style={{ fontSize: 13, color: "#1A1A1A" }}>
                                  {row.transactionType === "UPI" && row.upiId
                                    ? row.upiId
                                    : row.bank || "—"}
                                </div>
                                <div style={{ fontSize: 11, color: "#AAA", marginTop: 2 }}>
                                  {row.transactionType === "UPI" && row.upiId ? "UPI ID" : "Account No."}
                                </div>
                              </td>
                              <td style={tdStyle(i, excluded)}>
                                <span style={{
                                  fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                                  background:
                                    row.transactionType === "UPI"  ? "#EEF2FF" :
                                    row.transactionType === "IMPS" ? "#FFF7ED" :
                                    row.transactionType === "NEFT" ? "#F0FDF4" : "#F5F3FF",
                                  color:
                                    row.transactionType === "UPI"  ? "#4F46E5" :
                                    row.transactionType === "IMPS" ? "#D97706" :
                                    row.transactionType === "NEFT" ? "#16A34A" : "#7C3AED",
                                }}>
                                  {row.transactionType || "—"}
                                </span>
                              </td>
                              <td style={{ ...tdStyle(i, excluded), position: "relative" }}>
                                {(() => {
                                  const grossNum = parseInt((row.salary || "0").replace(/[₹,]/g, ""), 10) || 0;
                                  const dedNum   = parseInt((row.deductions || "0").replace(/[₹,]/g, ""), 10) || 0;
                                  return (
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                      <strong>{row.salary}</strong>
                                      <span
                                        title="View breakdown"
                                        onClick={e => {
                                          e.stopPropagation();
                                          setActivePopover(
                                            activePopover?.empId === row.id && activePopover?.type === "gross"
                                              ? null
                                              : { empId: row.id, type: "gross" }
                                          );
                                        }}
                                        style={{
                                          fontSize: 11, fontWeight: 700,
                                          color: "#ffffff", background: "#16A34A",
                                          borderRadius: "50%", width: 16, height: 16,
                                          display: "inline-flex", alignItems: "center",
                                          justifyContent: "center", cursor: "pointer",
                                          flexShrink: 0, marginBottom: 6,
                                          alignSelf: "flex-start",
                                          userSelect: "none",
                                          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                                        }}
                                      >i</span>
                                      {activePopover?.empId === row.id && activePopover?.type === "gross" && (
                                        <BreakdownPopover
                                          type="gross"
                                          items={getBreakdown(grossNum, dedNum).gross}
                                          total={grossNum}
                                          onClose={() => setActivePopover(null)}
                                        />
                                      )}
                                    </div>
                                  );
                                })()}
                              </td>
                              <td style={{ ...tdStyle(i, excluded), position: "relative" }}>
                                {(() => {
                                  const grossNum = parseInt((row.salary || "0").replace(/[₹,]/g, ""), 10) || 0;
                                  const dedNum   = parseInt((row.deductions || "0").replace(/[₹,]/g, ""), 10) || 0;
                                  return (
                                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                      <span style={{ color: "#E83838", fontWeight: 600 }}>{row.deductions}</span>
                                      <span
                                        title="View breakdown"
                                        onClick={e => {
                                          e.stopPropagation();
                                          setActivePopover(
                                            activePopover?.empId === row.id && activePopover?.type === "deduction"
                                              ? null
                                              : { empId: row.id, type: "deduction" }
                                          );
                                        }}
                                        style={{
                                          fontSize: 11, fontWeight: 700,
                                          color: "#ffffff", background: "#E83838",
                                          borderRadius: "50%", width: 16, height: 16,
                                          display: "inline-flex", alignItems: "center",
                                          justifyContent: "center", cursor: "pointer",
                                          flexShrink: 0, marginBottom: 6,
                                          alignSelf: "flex-start",
                                          userSelect: "none",
                                          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                                        }}
                                      >i</span>
                                      {activePopover?.empId === row.id && activePopover?.type === "deduction" && (
                                        <BreakdownPopover
                                          type="deduction"
                                          items={getBreakdown(grossNum, dedNum).deduction}
                                          total={dedNum}
                                          onClose={() => setActivePopover(null)}
                                        />
                                      )}
                                    </div>
                                  );
                                })()}
                              </td>
                              <td style={tdStyle(i, excluded)}>
                                <strong>{row.total}</strong>
                              </td>
                              <td style={tdStyle(i, excluded)}>
                                <span style={{ fontSize: 12, color: "#8A8A8A" }}>{row.remark}</span>
                              </td>
                              <td style={tdStyle(i, excluded)}>
                                <span style={{
                                  ...(STATUS_STYLE[row.status] || {}),
                                  padding: "3px 10px", borderRadius: 20,
                                  fontSize: 12, fontWeight: 600,
                                }}>{row.status}</span>
                              </td>
                              <td style={{ ...tdStyle(i, excluded), opacity: 1 }}>
                                <div style={{ display: "flex", gap: 6 }}>
                                  <button
                                    onClick={() => !excluded && openEdit(row)}
                                    disabled={excluded}
                                    style={{
                                      padding: "5px 12px",
                                      border: "1px solid #EBEBEB",
                                      borderRadius: 6,
                                      background: editRow?.id === row.id ? "#FFF0F0" : "#FFFFFF",
                                      color: editRow?.id === row.id ? "#E83838" : "#1A1A1A",
                                      cursor: excluded ? "not-allowed" : "pointer",
                                      fontSize: 13, fontWeight: 500,
                                      opacity: excluded ? 0.4 : 1,
                                    }}
                                  >✏️ Edit</button>
                                  <button
                                    onClick={() => toggleExclude(row.id)}
                                    style={{
                                      padding: "5px 12px",
                                      borderRadius: 6,
                                      cursor: "pointer",
                                      fontSize: 13, fontWeight: 500,
                                      border: excluded ? "1px solid #BBF7D0" : "1px solid #FECACA",
                                      background: excluded ? "#F0FFF4" : "#FFF0F0",
                                      color: excluded ? "#276749" : "#E83838",
                                    }}
                                  >{excluded ? "↩ Include" : "✕ Exclude"}</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Summary bar */}
                  <div style={{
                    padding: "18px 22px",
                    borderTop: "1px solid #EBEBEB",
                    display: "flex", alignItems: "flex-end",
                    gap: 24, flexWrap: "wrap",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 4 }}>Employees Included</div>
                      <div style={{ fontWeight: 700, fontSize: 22, color: "#1A1A1A" }}>
                        {activeRows.length}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 4 }}>Total Payout</div>
                      <div style={{ fontWeight: 700, fontSize: 22, color: "#1A1A1A" }}>
                        ₹{totalSalary.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div style={{ minWidth: 280 }}>
                      <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 4 }}>Pay From</div>
                      <select
                        value={selectedBank}
                        onChange={e => setSelectedBank(e.target.value)}
                        style={{
                          width: "100%", border: "1px solid #EBEBEB",
                          borderRadius: 8, padding: "9px 10px",
                          fontSize: 15, background: "#FFFFFF", cursor: "pointer",
                          boxSizing: "border-box", outline: "none",
                        }}
                      >
                        {BANK_ACCOUNTS_DROPDOWN.map(b => (
                          <option key={b.id} value={b.id}>{b.label} — {b.balance}</option>
                        ))}
                      </select>
                      <div style={{ fontSize: 12, color: "#8A8A8A", marginTop: 3 }}>
                        Available: <strong>{bank?.balance || "₹0"}</strong>
                      </div>
                    </div>

                    <div style={{ flex: 1 }} />

                    <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <input
                          type="checkbox"
                          checked={verified}
                          onChange={e => setVerified(e.target.checked)}
                          style={{ width: 15, height: 15, accentColor: "#E83838" }}
                        />
                        I've reviewed all details and they're good to go.
                      </label>
                      <button
                        onClick={() => verified && setShowConfirm(true)}
                        disabled={!verified}
                        style={{
                          border: "none", borderRadius: 10,
                          background: verified
                            ? "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)"
                            : "#E8E8E8",
                          color: verified ? "#fff" : "#8A8A8A",
                          fontWeight: 600,
                          cursor: verified ? "pointer" : "not-allowed",
                          padding: "10px 28px", fontSize: 15,
                          whiteSpace: "nowrap",
                          boxShadow: verified ? "0 2px 8px rgba(200,40,40,0.25)" : "none",
                          transition: "all 0.2s",
                        }}
                      >
                        Process Salary
                      </button>
                    </div>
                  </div>
                </>
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

          {/* ── Edit Salary Side Panel ── */}
          {editRow && (
            <div style={{
              width: 300, background: "#FFFFFF",
              borderLeft: "1px solid #EBEBEB",
              display: "flex", flexDirection: "column", flexShrink: 0,
              boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
            }}>

              {/* Header */}
              <div style={{
                padding: "18px 24px",
                borderBottom: "1px solid #EBEBEB",
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A" }}>Edit Salary</div>
                  <div style={{ fontSize: 13, color: "#8A8A8A", marginTop: 2 }}>
                    {editRow.name} · {editRow.id}
                  </div>
                </div>
                <button
                  onClick={() => setEditRow(null)}
                  style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#8A8A8A", lineHeight: 1 }}
                >✕</button>
              </div>

              {/* Fields */}
              <div style={{ padding: "24px", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Employee — read only */}
                <div>
                  <label style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 6, display: "block", fontWeight: 500 }}>
                    Employee
                  </label>
                  <div style={{
                    border: "1px solid #EBEBEB", borderRadius: 8,
                    padding: "10px 12px", fontSize: 15,
                    color: "#8A8A8A", background: "#FFFFFF",
                  }}>{editForm.name}</div>
                </div>

                {/* Employee ID — read only */}
                <div>
                  <label style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 6, display: "block", fontWeight: 500 }}>
                    Employee ID
                  </label>
                  <div style={{
                    border: "1px solid #EBEBEB", borderRadius: 8,
                    padding: "10px 12px", fontSize: 15,
                    color: "#8A8A8A", background: "#FFFFFF",
                  }}>{editForm.id}</div>
                </div>

                {/* Gross Salary */}
                <div>
                  <label style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 6, display: "block", fontWeight: 500 }}>
                    Gross Salary (₹)
                  </label>
                  <input
                    type="number"
                    value={editForm.grossSalary || ""}
                    onChange={e => setEditForm(f => ({ ...f, grossSalary: e.target.value }))}
                    style={{
                      width: "100%", border: "1px solid #EBEBEB", borderRadius: 8,
                      padding: "10px 12px", fontSize: 15, outline: "none",
                      boxSizing: "border-box", background: "#FFFFFF", color: "#1A1A1A",
                    }}
                    onFocus={e => e.target.style.borderColor = "#E83838"}
                    onBlur={e => e.target.style.borderColor = "#EBEBEB"}
                  />
                </div>

                {/* Deductions */}
                <div>
                  <label style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 6, display: "block", fontWeight: 500 }}>
                    Deductions (₹)
                  </label>
                  <input
                    type="number"
                    value={editForm.deductions || ""}
                    onChange={e => setEditForm(f => ({ ...f, deductions: e.target.value }))}
                    style={{
                      width: "100%", border: "1px solid #EBEBEB", borderRadius: 8,
                      padding: "10px 12px", fontSize: 15, outline: "none",
                      boxSizing: "border-box", background: "#FFFFFF", color: "#1A1A1A",
                    }}
                    onFocus={e => e.target.style.borderColor = "#E83838"}
                    onBlur={e => e.target.style.borderColor = "#EBEBEB"}
                  />
                </div>

                {/* Bonus */}
                <div>
                  <label style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 6, display: "block", fontWeight: 500 }}>
                    Bonus (₹)
                  </label>
                  <input
                    type="number"
                    value={editForm.bonus || ""}
                    onChange={e => setEditForm(f => ({ ...f, bonus: e.target.value }))}
                    style={{
                      width: "100%", border: "1px solid #EBEBEB", borderRadius: 8,
                      padding: "10px 12px", fontSize: 15, outline: "none",
                      boxSizing: "border-box", background: "#FFFFFF", color: "#1A1A1A",
                    }}
                    onFocus={e => e.target.style.borderColor = "#E83838"}
                    onBlur={e => e.target.style.borderColor = "#EBEBEB"}
                  />
                </div>

                {/* Net Salary card */}
                <div style={{
                  background: "#FFF5F5",
                  border: "1px solid #FECACA",
                  borderRadius: 10,
                  padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 6 }}>
                    Net Salary (Auto-calculated)
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#E83838" }}>
                    ₹{netSalary().toLocaleString("en-IN")}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div style={{
                padding: "16px 24px",
                borderTop: "1px solid #EBEBEB",
                display: "flex", gap: 10,
              }}>
                <button
                  onClick={() => setEditRow(null)}
                  style={{
                    flex: 1, border: "1px solid #EBEBEB", borderRadius: 8,
                    background: "#FFFFFF", color: "#1A1A1A",
                    fontWeight: 500, cursor: "pointer",
                    padding: "11px", fontSize: 15,
                  }}
                >Cancel</button>
                <button
                  onClick={saveEdit}
                  style={{
                    flex: 1, border: "none", borderRadius: 8,
                    background: "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
                    color: "#fff", fontWeight: 600, cursor: "pointer",
                    padding: "11px", fontSize: 15,
                    boxShadow: "0 2px 8px rgba(200,40,40,0.25)",
                  }}
                >Save Changes</button>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(26,26,26,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#FFFFFF", borderRadius: 20,
            padding: "40px 44px", width: 420, textAlign: "center",
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
          }}>
            <div style={{ fontSize: 42, marginBottom: 16 }}>💸</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A", marginBottom: 8 }}>
              Ready to run payroll?
            </div>
            <div style={{ fontSize: 15, color: "#8A8A8A", marginBottom: 4 }}>
              You're about to disburse salaries to
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#E83838", marginBottom: 4 }}>
              {activeRows.length} employees
            </div>
            <div style={{ fontSize: 15, color: "#8A8A8A", marginBottom: 24 }}>
              Total: ₹{totalSalary.toLocaleString("en-IN")}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  border: "1.5px solid #EBEBEB", borderRadius: 10,
                  background: "#FFFFFF", color: "#1A1A1A",
                  fontWeight: 500, cursor: "pointer",
                  padding: "10px 24px", fontSize: 15,
                }}
              >Go Back</button>
              <button
                onClick={() => { setShowConfirm(false); setShowProgress(true); }}
                style={{
                  border: "none", borderRadius: 10,
                  background: "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
                  color: "#fff", fontWeight: 600, cursor: "pointer",
                  padding: "10px 24px", fontSize: 15,
                  boxShadow: "0 2px 8px rgba(200,40,40,0.25)",
                }}
              >Yes, Disburse Now</button>
            </div>
          </div>
        </div>
      )}

      {showProgress && (
        <ProgressPopup
          label="Disbursing salaries — almost there…"
          onDone={() => {
            setShowProgress(false);
            setRows(prev => prev.map(r => r.status !== "Excluded" ? { ...r, status: "Paid" } : r));
          }}
        />
      )}
    </div>
  );
}
