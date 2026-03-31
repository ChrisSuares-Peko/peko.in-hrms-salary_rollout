import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import ProgressPopup from "../components/ProgressPopup";
import { C, FS, btnPrimary, btnSecondary, btnOutlineRed, inputStyle, labelStyle } from "../tokens";
import {
  ACTIVE_EMPLOYEES, PAST_EMPLOYEES, SALARY_BREAKUP,
  BENEFICIARY_STATUS_OPTIONS, BENEFICIARY_STATUS_STYLE, STATUS_STYLE,
} from "../data/employees";

const STATUS_HISTORY_STYLE = {
  Completed:     { bg:"#F0FFF4", color:"#276749" },
  "In Progress": { bg:"#EEF2FF", color:"#4338CA" },
  Failed:        { bg:"#FFF0F0", color:"#FF4F4F" },
};

export default function EmployeesPage({ dummyMode, onNavigate }) {
  const [tab, setTab] = useState("active");
  const [search, setSearch] = useState("");
  const [activeEmps, setActiveEmps] = useState(
    ACTIVE_EMPLOYEES.map(e => ({ ...e }))
  );
  const [editEmp, setEditEmp] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [showBeneficiaryPopup, setShowBeneficiaryPopup] = useState(false);
  const [breakupEmp, setBreakupEmp] = useState(null);

  const filtered = dummyMode
    ? activeEmps.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const pastFiltered = dummyMode
    ? PAST_EMPLOYEES.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  const openEdit = (emp) => {
    setEditEmp({ ...emp, originalBank: emp.bank });
  };

  const handleSaveEmployee = (updatedEmp) => {
    setActiveEmps(prev => prev.map(e =>
      e.id === updatedEmp.id ? { ...e, ...updatedEmp } : e
    ));
    setEditEmp(null);
  };

  const toggleSelect = (id) => {
    setSelected(s =>
      s.includes(id) ? s.filter(x => x !== id) : [...s, id]
    );
  };

  const updateRemark = (id, val) => {
    setActiveEmps(prev => prev.map(e => e.id === id ? { ...e, remark: val } : e));
  };

  const thStyle = {
    padding: "10px 14px", background: C.bg, color: C.muted,
    fontSize: FS.xs, fontWeight: 600, textTransform: "uppercase",
    letterSpacing: 0.5, whiteSpace: "nowrap", position: "sticky", top: 0,
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
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", gap: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Breadcrumb items={[
              { label:"Dashboard", onClick: () => onNavigate("dashboard") },
              { label:"Employees" },
            ]} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h1 style={{ fontSize: FS.xl, fontWeight: 700 }}>Employees</h1>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={{ ...btnSecondary, padding: "8px 16px", fontSize: FS.sm }}
                >
                  ⬇ Export{selected.length > 0 ? ` (${selected.length})` : ""}
                </button>
                <button onClick={() => setShowVerifyPopup(true)}
                  style={{ ...btnSecondary, padding: "8px 16px", fontSize: FS.sm }}>
                  Verify Accounts
                </button>
                <button onClick={() => setShowBeneficiaryPopup(true)}
                  style={{ ...btnPrimary, padding: "8px 16px", fontSize: FS.sm }}>
                  Add Beneficiaries
                </button>
              </div>
            </div>

            {/* Tabs + Search */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
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
                style={{ ...inputStyle, maxWidth: 260 }}
                placeholder="Search employees…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* Active Table */}
            {tab === "active" && (
              <div style={{ background: C.white, borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "auto" }}>
                {!dummyMode ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
                    <div style={{ fontSize: 40 }}>📭</div>
                    <div style={{ marginTop: 8 }}>No employees yet. Enable Dummy Data to see sample data.</div>
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{
                          padding: "12px 14px",
                          borderBottom: "1px solid #EBEBEB",
                          background: C.bg,
                          width: 40,
                        }}>
                          <input
                            type="checkbox"
                            checked={filtered.length > 0 && selected.length === filtered.length}
                            onChange={() => {
                              if (selected.length === filtered.length) {
                                setSelected([]);
                              } else {
                                setSelected(filtered.map(e => e.id));
                              }
                            }}
                            style={{ width: 15, height: 15, accentColor: "#E83838", cursor: "pointer" }}
                          />
                        </th>
                        {["Employee","ID","Joining","Salary","Account Detail","Transaction Type","Status","Beneficiary","Remark",""].map((h, i) => (
                          <th key={i} style={{ ...thStyle, textAlign: "left" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((emp, i) => (
                        <tr key={emp.id}>
                          <td style={{ padding: "12px 14px", borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : C.bg }}>
                            <input
                              type="checkbox"
                              checked={selected.includes(emp.id)}
                              onChange={() => toggleSelect(emp.id)}
                              style={{ width: 15, height: 15, accentColor: "#E83838", cursor: "pointer" }}
                            />
                          </td>
                          <td style={tdStyle(i)}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: "50%",
                                background: C.redLight, color: C.red,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontWeight: 700, fontSize: FS.sm,
                              }}>{emp.initials}</div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: FS.sm }}>{emp.name}</div>
                                <div style={{ fontSize: FS.xs, color: C.muted }}>{emp.email}</div>
                              </div>
                            </div>
                          </td>
                          <td style={tdStyle(i)}><span style={{ fontSize: FS.sm }}>{emp.id}</span></td>
                          <td style={tdStyle(i)}><span style={{ fontSize: FS.sm }}>{emp.joining}</span></td>
                          <td style={tdStyle(i)}><span style={{ fontWeight: 600, fontSize: FS.sm }}>{emp.salary}</span></td>
                          <td style={tdStyle(i)}>
                            <div style={{ fontSize: 13, color: "#1A1A1A" }}>
                              {emp.transactionType === "UPI" && emp.upiId
                                ? emp.upiId
                                : emp.bank || "—"}
                            </div>
                            <div style={{ fontSize: 11, color: "#AAA", marginTop: 2 }}>
                              {emp.transactionType === "UPI" && emp.upiId ? "UPI ID" : "Account No."}
                            </div>
                          </td>
                          <td style={tdStyle(i)}>
                            <span style={{
                              fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                              background:
                                emp.transactionType === "UPI"  ? "#EEF2FF" :
                                emp.transactionType === "IMPS" ? "#FFF7ED" :
                                emp.transactionType === "NEFT" ? "#F0FDF4" : "#F5F3FF",
                              color:
                                emp.transactionType === "UPI"  ? "#4F46E5" :
                                emp.transactionType === "IMPS" ? "#D97706" :
                                emp.transactionType === "NEFT" ? "#16A34A" : "#7C3AED",
                            }}>
                              {emp.transactionType || "—"}
                            </span>
                          </td>
                          <td style={tdStyle(i)}>
                            <span style={{
                              ...STATUS_STYLE[emp.status],
                              padding: "3px 10px", borderRadius: 20, fontSize: FS.xs, fontWeight: 600,
                            }}>{emp.status}</span>
                          </td>
                          <td style={tdStyle(i)}>
                            <span style={{
                              ...(BENEFICIARY_STATUS_STYLE[emp.beneficiaryStatus] || {}),
                              padding: "3px 10px", borderRadius: 20, fontSize: FS.xs, fontWeight: 600,
                            }}>{emp.beneficiaryStatus}</span>
                          </td>
                          <td style={tdStyle(i)}>
                            <input
                              style={{ ...inputStyle, padding: "5px 8px", fontSize: FS.xs, width: 160 }}
                              value={emp.remark}
                              onChange={e => updateRemark(emp.id, e.target.value)}
                            />
                          </td>
                          <td style={tdStyle(i)}>
                            <button
                              onClick={() => openEdit(emp)}
                              style={{ ...btnSecondary, padding: "5px 12px", fontSize: FS.xs }}
                            >Update</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Past Table */}
            {tab === "past" && (
              <div style={{ background: C.white, borderRadius: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "auto" }}>
                {!dummyMode ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
                    <div style={{ fontSize: 40 }}>📭</div>
                    <div style={{ marginTop: 8 }}>No past employees.</div>
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        {["Employee","ID","Joining","Offboarding","Net Salary","Remark","Breakup"].map((h, i) => (
                          <th key={i} style={{ ...thStyle, textAlign: "left" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pastFiltered.map((emp, i) => (
                        <tr key={emp.id}>
                          <td style={tdStyle(i)}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: "50%",
                                background: "#F3F4F6", color: C.muted,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontWeight: 700, fontSize: FS.sm,
                              }}>{emp.initials}</div>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: FS.sm }}>{emp.name}</div>
                                <div style={{ fontSize: FS.xs, color: C.muted }}>{emp.email}</div>
                              </div>
                            </div>
                          </td>
                          <td style={tdStyle(i)}>{emp.id}</td>
                          <td style={tdStyle(i)}>{emp.joining}</td>
                          <td style={tdStyle(i)}>{emp.offboarding}</td>
                          <td style={tdStyle(i)}>
                            <div style={{ fontWeight:600, color:"#1A1A1A" }}>{emp.salary}</div>
                            <div style={{ fontSize:11, color:"#8A8A8A", marginTop:2 }}>Net</div>
                          </td>
                          <td style={tdStyle(i)}>{emp.remark}</td>
                          <td style={tdStyle(i)}>
                            <button
                              onClick={() => setBreakupEmp(emp)}
                              style={{ ...btnOutlineRed, padding: "5px 12px", fontSize: FS.xs }}
                            >View Breakup</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Edit Side Panel */}
          {editEmp && (
            <div style={{
              position: "fixed", top: 0, right: 0, height: "100vh", width: 400,
              background: "#fff", boxShadow: "-4px 0 24px rgba(0,0,0,0.10)",
              zIndex: 200, display: "flex", flexDirection: "column",
              fontFamily: "inherit",
            }}>

              {/* Header */}
              <div style={{
                padding: "20px 24px 16px",
                borderBottom: "1.5px solid #F0F0F0",
              }}>
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 12,
                }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A" }}>
                    Update Employee
                  </span>
                  <button
                    onClick={() => setEditEmp(null)}
                    style={{
                      background: "none", border: "none", fontSize: 20,
                      cursor: "pointer", color: "#888", lineHeight: 1,
                    }}
                  >×</button>
                </div>

                {/* Avatar row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg,#FF6B6B,#E03030)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, fontWeight: 700, color: "#fff", flexShrink: 0,
                  }}>
                    {editEmp.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A1A" }}>
                      {editEmp.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 1 }}>
                      {editEmp.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Body */}
              <div style={{
                flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex",
                flexDirection: "column", gap: 16,
              }}>

                {/* Employee Name — read only */}
                <div>
                  <label style={{
                    fontSize: 12, fontWeight: 600, color: "#555",
                    display: "block", marginBottom: 6,
                  }}>
                    Employee Name
                  </label>
                  <input
                    value={editEmp.name}
                    readOnly
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E8E8E8", background: "#F7F7F7",
                      fontSize: 14, color: "#999", boxSizing: "border-box",
                      cursor: "not-allowed",
                    }}
                  />
                  <div style={{ fontSize: 11, color: "#AAA", marginTop: 4 }}>
                    Name cannot be edited here.
                  </div>
                </div>

                {/* Bank Account Number */}
                <div>
                  <label style={{
                    fontSize: 12, fontWeight: 600, color: "#555",
                    display: "block", marginBottom: 6,
                  }}>
                    Bank Account Number
                  </label>
                  <input
                    value={editEmp.bank}
                    onChange={e => setEditEmp({ ...editEmp, bank: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: editEmp.bank !== editEmp.originalBank
                        ? "1.5px solid #E83838"
                        : "1.5px solid #E0E0E0",
                      background: editEmp.bank !== editEmp.originalBank ? "#FFF5F5" : "#fff",
                      fontSize: 14, color: "#1A1A1A", boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                  {editEmp.bank !== editEmp.originalBank && (
                    <button style={{
                      marginTop: 8, width: "100%", padding: "9px 0", borderRadius: 8,
                      background: "linear-gradient(135deg,#FF6B6B,#E03030)",
                      border: "none", color: "#fff", fontSize: 13, fontWeight: 600,
                      cursor: "pointer",
                    }}>
                      Initiate Account Verification
                    </button>
                  )}
                </div>

                {/* Transaction Type */}
                <div>
                  <label style={{
                    fontSize: 12, fontWeight: 600, color: "#555",
                    display: "block", marginBottom: 6,
                  }}>
                    Transaction Type
                  </label>
                  <select
                    value={editEmp.transactionType || ""}
                    onChange={e => setEditEmp({ ...editEmp, transactionType: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E0E0E0", background: "#fff",
                      fontSize: 14, color: "#1A1A1A", boxSizing: "border-box",
                      outline: "none", appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
                    }}
                  >
                    <option value="" disabled>Select type</option>
                    <option value="UPI">UPI</option>
                    <option value="IMPS">IMPS</option>
                    <option value="NEFT">NEFT</option>
                    <option value="RTGS">RTGS</option>
                  </select>
                </div>

                {/* UPI ID — only shown when Transaction Type is UPI */}
                {editEmp.transactionType === "UPI" && (
                  <div>
                    <label style={{
                      fontSize: 12, fontWeight: 600, color: "#555",
                      display: "block", marginBottom: 6,
                    }}>
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={editEmp.upiId || ""}
                      onChange={e => setEditEmp({ ...editEmp, upiId: e.target.value })}
                      placeholder="e.g. name@okaxis"
                      style={{
                        width: "100%", padding: "10px 12px", borderRadius: 8,
                        border: "1.5px solid #E0E0E0", background: "#fff",
                        fontSize: 14, color: "#1A1A1A", boxSizing: "border-box",
                        outline: "none",
                      }}
                    />
                  </div>
                )}

                {/* IFSC Code */}
                <div>
                  <label style={{
                    fontSize: 12, fontWeight: 600, color: "#555",
                    display: "block", marginBottom: 6,
                  }}>
                    IFSC Code
                  </label>
                  <input
                    value={editEmp.ifsc || ""}
                    onChange={e => setEditEmp({ ...editEmp, ifsc: e.target.value })}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E0E0E0", background: "#fff",
                      fontSize: 14, color: "#1A1A1A", boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Remark */}
                <div>
                  <label style={{
                    fontSize: 12, fontWeight: 600, color: "#555",
                    display: "block", marginBottom: 6,
                  }}>
                    Remark
                  </label>
                  <input
                    value={editEmp.remark || ""}
                    onChange={e => setEditEmp({ ...editEmp, remark: e.target.value })}
                    placeholder="—"
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E0E0E0", background: "#fff",
                      fontSize: 14, color: "#1A1A1A", boxSizing: "border-box",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Beneficiary Status */}
                <div>
                  <label style={{
                    fontSize: 12, fontWeight: 600, color: "#555",
                    display: "block", marginBottom: 8,
                  }}>
                    Beneficiary Status
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["Added", "Pending", "Failed"].map(s => {
                      const active = editEmp.beneficiaryStatus === s;
                      const col = s === "Added" ? "#16A34A" : s === "Pending" ? "#D97706" : "#DC2626";
                      return (
                        <button
                          key={s}
                          onClick={() => setEditEmp({ ...editEmp, beneficiaryStatus: s })}
                          style={{
                            flex: 1, padding: "9px 0", borderRadius: 8, fontSize: 13,
                            fontWeight: 600, cursor: "pointer",
                            border: `1.5px solid ${active ? col : "#E0E0E0"}`,
                            background: active ? col : "#fff",
                            color: active ? "#fff" : "#888",
                            transition: "all 0.15s",
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div style={{
                padding: "16px 24px",
                borderTop: "1.5px solid #F0F0F0",
                display: "flex", gap: 12,
              }}>
                <button
                  onClick={() => setEditEmp(null)}
                  style={{
                    flex: 1, padding: "11px 0", borderRadius: 8,
                    border: "1.5px solid #E0E0E0", background: "#fff",
                    fontSize: 14, fontWeight: 600, color: "#555", cursor: "pointer",
                  }}
                >Cancel</button>
                <button
                  onClick={() => handleSaveEmployee(editEmp)}
                  style={{
                    flex: 1, padding: "11px 0", borderRadius: 8,
                    background: "linear-gradient(135deg,#FF6B6B,#E03030)",
                    border: "none", fontSize: 14, fontWeight: 600,
                    color: "#fff", cursor: "pointer",
                  }}
                >Save Changes</button>
              </div>

            </div>
          )}
        </div>
        <Footer />
      </div>

      {/* Verify Popup */}
      {showVerifyPopup && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(26,26,26,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
        }}>
          <div style={{
            background: C.white, borderRadius: 16, padding: "32px 36px",
            minWidth: 400, boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}>
            <div style={{ fontWeight: 700, fontSize: FS.lg, marginBottom: 16 }}>Verify Bank Accounts</div>
            {dummyMode && activeEmps.filter(e => e.status !== "Approved").map(e => (
              <div key={e.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0", borderBottom: `1px solid ${C.border}`,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: C.redLight, color: C.red,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: FS.sm,
                }}>{e.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: FS.sm, fontWeight: 600 }}>{e.name}</div>
                  <div style={{ fontSize: FS.xs, color: C.muted }}>{e.status}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={() => setShowVerifyPopup(false)} style={{ ...btnSecondary, padding: "10px 20px" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Beneficiary Popup */}
      {showBeneficiaryPopup && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(26,26,26,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
        }}>
          <div style={{
            background: C.white, borderRadius: 16, padding: "32px 36px",
            minWidth: 400, boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}>
            <div style={{ fontWeight: 700, fontSize: FS.lg, marginBottom: 16 }}>Add Beneficiaries</div>
            {dummyMode && activeEmps.filter(e => e.beneficiaryStatus !== "Added").map(e => (
              <div key={e.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0", borderBottom: `1px solid ${C.border}`,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#EEF2FF", color: "#4338CA",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: FS.sm,
                }}>{e.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: FS.sm, fontWeight: 600 }}>{e.name}</div>
                  <div style={{ fontSize: FS.xs, color: C.muted }}>Beneficiary: {e.beneficiaryStatus}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={() => setShowBeneficiaryPopup(false)} style={{ ...btnSecondary, padding: "10px 20px" }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Salary Breakup Modal */}
      {breakupEmp && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(26,26,26,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
        }}>
          <div style={{
            background: C.white, borderRadius: 16, padding: "32px 36px",
            minWidth: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          }}>
            <div style={{ fontWeight: 700, fontSize: FS.lg, marginBottom: 4 }}>Salary Breakup</div>
            <div style={{ color: C.muted, fontSize: FS.sm, marginBottom: 20 }}>{breakupEmp.name} — {breakupEmp.id}</div>
            {(() => {
              const b = SALARY_BREAKUP[breakupEmp.id];
              if (!b) return <div style={{ color: C.muted }}>No breakup available.</div>;
              return (
                <>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: FS.xs, color: C.muted, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Earnings</div>
                    {[["Gross Salary", b.gross],["Basic",b.basic],["HRA",b.hra],["Allowances",b.allowances]].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}`, fontSize:FS.sm }}>
                        <span style={{ color: C.muted }}>{k}</span><span style={{ fontWeight:600 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: FS.xs, color: C.muted, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>Deductions</div>
                    {[["PF",b.pf],["ESI",b.esi],["TDS",b.tds]].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}`, fontSize:FS.sm }}>
                        <span style={{ color: C.muted }}>{k}</span><span style={{ fontWeight:600, color:C.red }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    background: C.redLight, borderRadius: 10, padding: "14px 16px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <span style={{ fontWeight: 700, fontSize: FS.md }}>Net Salary</span>
                    <span style={{ fontWeight: 800, fontSize: FS.xl, color: C.red }}>{b.net}</span>
                  </div>
                </>
              );
            })()}
            <button onClick={() => setBreakupEmp(null)}
              style={{ ...btnSecondary, padding: "10px 24px", marginTop: 20 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
