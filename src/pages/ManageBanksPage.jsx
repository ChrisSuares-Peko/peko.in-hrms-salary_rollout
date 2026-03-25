import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Breadcrumb from "../components/Breadcrumb";
import ProgressPopup from "../components/ProgressPopup";
import { C, FS, labelStyle, inputStyle } from "../tokens";
import { INITIAL_BANKS } from "../data/banks";

const PURPLE = "#7C3AED";

export default function ManageBanksPage({ dummyMode, onNavigate }) {
  const [banks, setBanks] = useState(INITIAL_BANKS.map(b => ({ ...b })));
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ name:"", account:"", ifsc:"", branch:"" });
  const [addVerified, setAddVerified] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Virtual wizard
  const [showVirtual, setShowVirtual] = useState(false);
  const [virtStep, setVirtStep] = useState(1);
  const [virtForm, setVirtForm] = useState({ name:"", pan:"", email:"", mobile:"", address:"" });
  const [virtProgress, setVirtProgress] = useState(false);
  const [virtCreated, setVirtCreated] = useState(false);

  // Funds modal
  const [showFundsModal, setShowFundsModal] = useState(false);
  const [fundsType, setFundsType] = useState("add");
  const [fundsAmount, setFundsAmount] = useState("");
  const [fundsProgress, setFundsProgress] = useState(false);
  const [fundsSuccess, setFundsSuccess] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const selectedBank = banks.find(b => b.id === selected);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
      <Sidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <Topbar dummyMode={dummyMode} />

        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

          {/* ── Main scrollable content ── */}
          <main style={{ flex:1, overflowY:"auto", padding:"28px 36px" }}>
            <Breadcrumb items={[
              { label:"Dashboard", onClick: () => onNavigate("dashboard") },
              { label:"Manage Banks" },
            ]} />

            {/* Page header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
              <div>
                <h1 style={{ fontSize:22, fontWeight:700, color:"#1A1A1A", margin:0 }}>Manage Banks</h1>
                <div style={{ fontSize:13, color:"#8A8A8A", marginTop:4 }}>
                  View and manage your linked bank accounts
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button
                  onClick={() => { setShowVirtual(true); setVirtStep(1); setVirtCreated(false); setVirtProgress(false); }}
                  style={{
                    border:`1.5px solid ${PURPLE}`, borderRadius:10,
                    background:"#FFFFFF", color:PURPLE,
                    fontWeight:600, cursor:"pointer", padding:"9px 18px", fontSize:14,
                  }}
                >+ Virtual Account</button>
                <button
                  onClick={() => { setShowAdd(a => !a); setSelected(null); }}
                  style={{
                    border:"none", borderRadius:10,
                    background:"linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
                    color:"#fff", fontWeight:600, cursor:"pointer",
                    padding:"9px 18px", fontSize:14,
                    boxShadow:"0 2px 8px rgba(200,40,40,0.25)",
                  }}
                >+ Add Bank Account</button>
              </div>
            </div>

            {/* ── Domestic Bank Accounts ── */}
            <div style={{ fontWeight:600, fontSize:11, color:"#8A8A8A", marginBottom:12, textTransform:"uppercase", letterSpacing:0.5 }}>
              Domestic Bank Accounts
            </div>

            {!dummyMode ? (
              <div style={{ textAlign:"center", padding:"40px 0", color:"#8A8A8A", marginBottom:28 }}>
                <div style={{ fontSize:32 }}>📭</div>
                <div style={{ marginTop:8, fontSize:13 }}>No bank accounts yet. Add one to get started.</div>
              </div>
            ) : (
              <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:28 }}>
                {banks.filter(b => !b.isVirtual).map(b => (
                  <div
                    key={b.id}
                    onClick={() => { setSelected(selected === b.id ? null : b.id); setShowAdd(false); }}
                    style={{
                      background: selected === b.id ? "#FFF0F0" : "#FFFFFF",
                      border: `1.5px solid ${selected === b.id ? "#E83838" : "#EBEBEB"}`,
                      borderRadius:12, padding:"16px 18px", cursor:"pointer", minWidth:200,
                      transition:"all 0.15s",
                      boxShadow: selected === b.id
                        ? "0 4px 16px rgba(232,56,56,0.1)"
                        : "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                      <span style={{ fontSize:20 }}>🏦</span>
                      <div style={{ fontWeight:600, color: selected === b.id ? "#E83838" : "#1A1A1A" }}>
                        {b.type}
                      </div>
                      {b.isDefault && (
                        <span style={{ fontSize:11, fontWeight:700, padding:"1px 7px", borderRadius:20, background:"#E8F5E9", color:"#276749" }}>
                          Default
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize:13, color:"#8A8A8A" }}>{b.name}</div>
                    <div style={{ fontSize:15, fontWeight:600, color:"#1A1A1A", marginTop:4 }}>
                      ••••{b.account.slice(-4)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Virtual Accounts ── */}
            <div style={{ fontWeight:600, fontSize:11, color:"#8A8A8A", marginBottom:12, textTransform:"uppercase", letterSpacing:0.5 }}>
              Virtual Accounts
            </div>
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", marginBottom:28 }}>
              {banks.filter(b => b.isVirtual).map(b => (
                <div
                  key={b.id}
                  onClick={() => { setSelected(selected === b.id ? null : b.id); setShowAdd(false); }}
                  style={{
                    background: selected === b.id ? "#F5F3FF" : "#FFFFFF",
                    border: `1.5px solid ${selected === b.id ? PURPLE : "#EBEBEB"}`,
                    borderRadius:12, padding:"16px 18px", cursor:"pointer", minWidth:220,
                    transition:"all 0.15s",
                    boxShadow: selected === b.id
                      ? "0 4px 16px rgba(124,58,237,0.1)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                    <span style={{ fontSize:20 }}>💳</span>
                    <div style={{ fontWeight:600, color: selected === b.id ? "#4527A0" : "#1A1A1A" }}>
                      {b.type}
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, padding:"1px 7px", borderRadius:20, background:"#F0FFF4", color:"#276749" }}>
                      Active
                    </span>
                  </div>
                  <div style={{ fontSize:13, color:"#8A8A8A" }}>{b.name}</div>
                  <div style={{ fontSize:15, fontWeight:600, color:"#1A1A1A", marginTop:4 }}>{b.account}</div>
                </div>
              ))}
              {banks.filter(b => b.isVirtual).length === 0 && (
                <div style={{ fontSize:13, color:"#8A8A8A", padding:"12px 0" }}>
                  No virtual accounts yet — create one to get started.
                </div>
              )}
            </div>

            {/* ── Domestic Bank Detail Panel ── */}
            {selectedBank && !selectedBank.isVirtual && (
              <div style={{
                background:"#FFFFFF", border:"1.5px solid #FECACA",
                borderRadius:16, padding:"28px 32px",
                boxShadow:"0 2px 12px rgba(0,0,0,0.04)", marginBottom:32,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{
                      width:48, height:48, borderRadius:14,
                      background:"linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:22,
                    }}>🏦</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:18, color:"#1A1A1A" }}>
                        {selectedBank.type}
                        {selectedBank.isDefault && (
                          <span style={{ marginLeft:8, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, background:"#E8F5E9", color:"#276749" }}>
                            Default
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize:13, color:"#8A8A8A", marginTop:2 }}>
                        {selectedBank.name} · ••••{selectedBank.account.slice(-4)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:12 }}>
                    <button style={{
                      border:"1.5px solid #EBEBEB", borderRadius:10, background:"#FFFFFF",
                      color:"#1A1A1A", fontWeight:500, cursor:"pointer",
                      padding:"7px 16px", fontSize:14,
                      display:"flex", alignItems:"center", gap:6,
                    }}>✏️ Edit</button>
                    <button
                      onClick={() => { setBanks(bs => bs.filter(b => b.id !== selectedBank.id)); setSelected(null); }}
                      style={{
                        padding:"7px 16px", border:"1px solid #FECACA", borderRadius:10,
                        background:"#FFF0F0", cursor:"pointer", fontWeight:500, fontSize:14, color:"#E83838",
                      }}
                    >🗑 Delete</button>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px 40px" }}>
                  {[
                    ["Account Name",   selectedBank.name],
                    ["Account Number", selectedBank.account],
                    ["IFSC Code",      selectedBank.ifsc],
                    ["Branch",         selectedBank.branch || "—"],
                  ].map(([lbl, val]) => (
                    <div key={lbl}>
                      <div style={{ fontSize:13, color:"#8A8A8A", marginBottom:5 }}>{lbl}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ fontWeight:600, fontSize:16, color:"#1A1A1A" }}>{val}</div>
                        {(lbl === "Account Number" || lbl === "IFSC Code") && (
                          <span
                            onClick={() => navigator.clipboard?.writeText(val)}
                            title="Copy"
                            style={{ cursor:"pointer", fontSize:13, color:"#E83838" }}
                          >📋</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Virtual Account Detail Panel ── */}
            {selectedBank && selectedBank.isVirtual && (
              <div style={{
                background:"#FFFFFF", border:"1.5px solid #DDD6FE",
                borderRadius:16, padding:"28px 32px",
                boxShadow:"0 2px 12px rgba(0,0,0,0.04)", marginBottom:32,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{
                      width:48, height:48, borderRadius:14,
                      background:"linear-gradient(135deg,#9B59B6,#4527A0)",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:22,
                    }}>💳</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:18, color:"#1A1A1A" }}>
                        Virtual Account
                        <span style={{ marginLeft:8, fontSize:11, fontWeight:700, padding:"2px 10px", borderRadius:20, background:"#F0FFF4", color:"#276749" }}>
                          Active
                        </span>
                      </div>
                      <div style={{ fontSize:13, color:"#8A8A8A", marginTop:2 }}>
                        {selectedBank.name} · Created {selectedBank.created}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"flex-end" }}>
                    <button
                      onClick={() => { setShowVirtual(true); setVirtStep(1); setVirtCreated(false); setVirtProgress(false); }}
                      style={{ border:"1.5px solid #EBEBEB", borderRadius:10, background:"#FFFFFF", color:"#1A1A1A", fontWeight:500, cursor:"pointer", padding:"7px 16px", fontSize:14 }}
                    >✏️ Update</button>
                    <button
                      onClick={() => { setFundsAmount(""); setFundsSuccess(false); setShowFundsModal(true); }}
                      style={{ border:"none", borderRadius:10, background:"linear-gradient(135deg,#9B59B6,#4527A0)", color:"#fff", fontWeight:600, cursor:"pointer", padding:"7px 16px", fontSize:14 }}
                    >💰 Add / Remove Funds</button>
                    <button
                      onClick={handleRefresh}
                      style={{ border:"1.5px solid #EBEBEB", borderRadius:10, background:"#FFFFFF", color:"#1A1A1A", fontWeight:500, cursor:"pointer", padding:"7px 16px", fontSize:14, display:"flex", alignItems:"center", gap:6 }}
                    >🔄 {refreshing ? "Refreshing..." : "Refresh Balance"}</button>
                    <button
                      onClick={() => { setBanks(bs => bs.filter(b => b.id !== selectedBank.id)); setSelected(null); }}
                      style={{ padding:"7px 16px", border:"1px solid #FECACA", borderRadius:10, background:"#FFF0F0", cursor:"pointer", fontWeight:500, fontSize:14, color:"#E83838" }}
                    >🗑 Delete</button>
                  </div>
                </div>

                {/* Balance card */}
                <div style={{
                  background:"linear-gradient(135deg,#EDE7F6,#F5F3FF)",
                  border:"1px solid #DDD6FE", borderRadius:14,
                  padding:"20px 24px", marginBottom:24,
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                }}>
                  <div>
                    <div style={{ fontSize:13, color:"#7C3AED", fontWeight:500, marginBottom:4 }}>Available Balance</div>
                    <div style={{ fontSize:30, fontWeight:700, color:"#4527A0" }}>
                      {refreshing ? "Refreshing…" : selectedBank.balance}
                    </div>
                  </div>
                  <div style={{ fontSize:36 }}>💰</div>
                </div>

                {/* Fields grid */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"18px 40px" }}>
                  {[
                    ["Virtual Account Number", selectedBank.account],
                    ["IFSC Code",              selectedBank.ifsc],
                    ["Account Type",           selectedBank.type],
                    ["Account Category",       selectedBank.branch],
                    ["PAN",                    selectedBank.pan || "—"],
                    ["Registered Email",       selectedBank.email || "—"],
                    ["Mobile",                 selectedBank.mobile || "—"],
                    ["Address",                selectedBank.address || "—"],
                  ].map(([lbl, val]) => (
                    <div key={lbl}>
                      <div style={{ fontSize:13, color:"#8A8A8A", marginBottom:4 }}>{lbl}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ fontWeight:600, fontSize:15, color:"#1A1A1A" }}>{val}</div>
                        {(lbl === "Virtual Account Number" || lbl === "IFSC Code") && (
                          <span
                            onClick={() => navigator.clipboard?.writeText(val)}
                            title="Copy to clipboard"
                            style={{ cursor:"pointer", fontSize:13, color:"#9B59B6" }}
                          >📋</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{
              marginTop:48, borderTop:"1px solid #EBEBEB", paddingTop:20,
              display:"flex", justifyContent:"space-between", flexWrap:"wrap",
              fontSize:13, color:"#8A8A8A", gap:8,
            }}>
              <span>© 2024-2026 Peko Payment Services LLC. All Rights Reserved.</span>
              <span style={{ display:"flex", gap:20 }}>
                {["Peko Platform Agreement","Privacy Policy","Refund Policy","Cookie Policy"].map(l => (
                  <span key={l} style={{ cursor:"pointer", textDecoration:"underline" }}>{l}</span>
                ))}
              </span>
            </div>
          </main>

          {/* ── Add Bank Account side panel ── */}
          {showAdd && (
            <div style={{
              width:380, background:"#FFFFFF",
              borderLeft:"1px solid #EBEBEB",
              display:"flex", flexDirection:"column", flexShrink:0,
              boxShadow:"-4px 0 24px rgba(0,0,0,0.08)",
            }}>
              <div style={{ padding:"20px 24px", borderBottom:"1px solid #EBEBEB", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"#FCE4EC", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏦</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:16, color:"#1A1A1A" }}>Add Bank Account</div>
                    <div style={{ fontSize:12, color:"#8A8A8A" }}>Link your company's bank account</div>
                  </div>
                </div>
                <button
                  onClick={() => { setShowAdd(false); setAddForm({ name:"", account:"", ifsc:"", branch:"" }); setAddVerified(false); }}
                  style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#8A8A8A" }}
                >✕</button>
              </div>

              <div style={{ flex:1, overflowY:"auto", padding:"24px", display:"flex", flexDirection:"column", gap:18 }}>
                {[
                  ["Account Name",        "name",    "e.g. Sigma D1 Logistics",   true],
                  ["Bank Account Number", "account", "Enter your account number",  true],
                  ["IFSC Code",           "ifsc",    "e.g. HDFC0001234",           true],
                  ["Branch",              "branch",  "Enter branch location",      false],
                ].map(([lbl, key, ph, required]) => (
                  <div key={key}>
                    <label style={{ fontSize:13, color:"#8A8A8A", marginBottom:6, display:"block", fontWeight:500 }}>
                      {required && <span style={{ color:"#E83838" }}>* </span>}{lbl}
                      {!required && <span style={{ fontWeight:400, color:"#8A8A8A" }}> (Optional)</span>}
                    </label>
                    <input
                      placeholder={ph}
                      value={addForm[key]}
                      onChange={e => { setAddForm(f => ({ ...f, [key]: e.target.value })); setAddVerified(false); }}
                      style={{
                        width:"100%", border:"1px solid #EBEBEB", borderRadius:10,
                        padding:"10px 14px", fontSize:15, outline:"none",
                        boxSizing:"border-box", background:"#FFFFFF", color:"#1A1A1A",
                      }}
                      onFocus={e => e.target.style.borderColor = "#E83838"}
                      onBlur={e => e.target.style.borderColor = "#EBEBEB"}
                    />
                  </div>
                ))}

                {!addVerified && (
                  <button
                    onClick={() => setShowAddPopup(true)}
                    disabled={!addForm.name || !addForm.account || !addForm.ifsc}
                    style={{
                      border:"1.5px solid #E83838", borderRadius:10,
                      background:"#FFFFFF", color:"#E83838",
                      fontWeight:600,
                      cursor: (!addForm.name || !addForm.account || !addForm.ifsc) ? "not-allowed" : "pointer",
                      padding:"10px", fontSize:15,
                      display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                      opacity: (!addForm.name || !addForm.account || !addForm.ifsc) ? 0.5 : 1,
                      boxSizing:"border-box", width:"100%",
                    }}
                  >🔍 Verify Bank Account</button>
                )}

                {addVerified && (
                  <div style={{ padding:"12px 16px", background:"#F0FFF4", border:"1px solid #B7EBC3", borderRadius:10, color:"#276749", display:"flex", alignItems:"center", gap:8, fontSize:14 }}>
                    ✅ Account verified — you're good to go!
                  </div>
                )}
              </div>

              <div style={{ padding:"16px 24px", borderTop:"1px solid #EBEBEB", display:"flex", gap:10 }}>
                <button
                  onClick={() => { setShowAdd(false); setAddForm({ name:"", account:"", ifsc:"", branch:"" }); setAddVerified(false); }}
                  style={{ flex:1, border:"1.5px solid #EBEBEB", borderRadius:10, background:"#FFFFFF", color:"#1A1A1A", fontWeight:500, cursor:"pointer", padding:"10px", fontSize:15 }}
                >Cancel</button>
                <button
                  onClick={() => {
                    if (addVerified) {
                      const nb = { ...addForm, id:`ba${Date.now()}`, balance:"₹0", type:"Current Account", isDefault:false, isVirtual:false };
                      setBanks(bs => [...bs, nb]);
                      setSelected(nb.id);
                      setShowAdd(false);
                      setAddForm({ name:"", account:"", ifsc:"", branch:"" });
                      setAddVerified(false);
                    }
                  }}
                  disabled={!addVerified}
                  style={{
                    flex:1, border:"none", borderRadius:10,
                    background: addVerified
                      ? "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)"
                      : "#E8E8E8",
                    color: addVerified ? "#fff" : "#8A8A8A",
                    fontWeight:600, cursor: addVerified ? "pointer" : "not-allowed",
                    padding:"10px", fontSize:15,
                  }}
                >Add Account</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Verify Bank Popup ── */}
      {showAddPopup && (
        <ProgressPopup
          label="Verifying bank account…"
          onDone={() => { setShowAddPopup(false); setAddVerified(true); }}
        />
      )}

      {/* ── Virtual Account Wizard ── */}
      {showVirtual && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(26,26,26,0.45)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000,
        }}>
          <div style={{
            background:"#FFFFFF", borderRadius:16, padding:"36px 40px",
            width:480, boxShadow:"0 8px 40px rgba(0,0,0,0.18)",
          }}>
            {virtCreated ? (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:52, marginBottom:16 }}>🎉</div>
                <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>Virtual Account Created!</div>
                <div style={{ color:"#8A8A8A", fontSize:14, marginBottom:24 }}>
                  Your virtual account is now active and ready to use.
                </div>
                <button
                  onClick={() => { setShowVirtual(false); setVirtCreated(false); setVirtStep(1); }}
                  style={{ border:"none", borderRadius:10, background:"linear-gradient(135deg,#9B59B6,#4527A0)", color:"#fff", fontWeight:600, cursor:"pointer", padding:"11px 32px", fontSize:15 }}
                >Done</button>
              </div>
            ) : virtProgress ? (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:16 }}>⏳</div>
                <div style={{ fontWeight:700, marginBottom:8 }}>Creating Virtual Account…</div>
                <div style={{ height:8, background:"#EBEBEB", borderRadius:99, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:"100%", background:`linear-gradient(135deg,#9B59B6,${PURPLE})`, borderRadius:99 }} />
                </div>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24 }}>
                  {["Entity","Bank","Review"].map((s, i) => (
                    <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      {i > 0 && <div style={{ width:24, height:1, background:"#EBEBEB" }} />}
                      <div style={{
                        width:28, height:28, borderRadius:"50%",
                        background: virtStep > i + 1 ? "#276749" : virtStep === i + 1 ? PURPLE : "#EBEBEB",
                        color: virtStep >= i + 1 ? "#fff" : "#8A8A8A",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontWeight:700, fontSize:12,
                      }}>{virtStep > i + 1 ? "✓" : i + 1}</div>
                      <span style={{ fontSize:12, color: virtStep === i + 1 ? PURPLE : "#8A8A8A" }}>{s}</span>
                    </div>
                  ))}
                </div>

                <div style={{ fontWeight:700, fontSize:16, marginBottom:20 }}>
                  {virtStep === 1 ? "Entity Details" : virtStep === 2 ? "Bank Details" : "Review & Create"}
                </div>

                {virtStep === 1 && (
                  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                    {[
                      ["name",   "Entity Name *",    "Company name"],
                      ["pan",    "PAN Number *",      "ABCDE1234F"],
                      ["email",  "Email *",           "accounts@company.com"],
                      ["mobile", "Mobile *",          "10-digit"],
                    ].map(([k, l, p]) => (
                      <div key={k}>
                        <label style={labelStyle}>{l}</label>
                        <input
                          style={inputStyle} placeholder={p} value={virtForm[k] || ""}
                          onChange={e => setVirtForm(f => ({ ...f, [k]: e.target.value }))}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {virtStep === 2 && (
                  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                    <div>
                      <label style={labelStyle}>Registered Address *</label>
                      <input
                        style={inputStyle} value={virtForm.address || ""}
                        onChange={e => setVirtForm(f => ({ ...f, address: e.target.value }))}
                        placeholder="Full address"
                      />
                    </div>
                    <div style={{ background:"#F5F3FF", borderRadius:10, padding:"14px 16px", fontSize:14, color:PURPLE }}>
                      💡 A virtual account will be created on the Peko network and can be pre-loaded for instant payroll disbursements.
                    </div>
                  </div>
                )}

                {virtStep === 3 && (
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {[
                      ["Entity",  virtForm.name],
                      ["PAN",     virtForm.pan],
                      ["Email",   virtForm.email],
                      ["Mobile",  virtForm.mobile],
                      ["Address", virtForm.address],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #EBEBEB" }}>
                        <span style={{ color:"#8A8A8A", fontSize:14 }}>{k}</span>
                        <span style={{ fontWeight:600, fontSize:14 }}>{v || "—"}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display:"flex", gap:10, marginTop:24 }}>
                  <button
                    onClick={() => { if (virtStep === 1) setShowVirtual(false); else setVirtStep(s => s - 1); }}
                    style={{ flex:1, padding:"10px 0", border:"1.5px solid #EBEBEB", borderRadius:10, background:"#FFFFFF", color:"#1A1A1A", fontWeight:500, cursor:"pointer", fontSize:15 }}
                  >{virtStep === 1 ? "Cancel" : "Back"}</button>
                  <button
                    onClick={() => {
                      if (virtStep < 3) {
                        setVirtStep(s => s + 1);
                      } else {
                        setVirtProgress(true);
                        setTimeout(() => { setVirtProgress(false); setVirtCreated(true); }, 2000);
                      }
                    }}
                    style={{
                      flex:1, padding:"10px 0", border:"none", borderRadius:10,
                      background:`linear-gradient(135deg,#9B59B6,${PURPLE})`,
                      color:"#fff", fontWeight:600, cursor:"pointer", fontSize:15,
                    }}
                  >{virtStep === 3 ? "Create Virtual Account" : "Next →"}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Funds Modal ── */}
      {showFundsModal && !fundsProgress && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(26,26,26,0.45)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000,
        }}>
          <div style={{
            background:"#FFFFFF", borderRadius:16, padding:"36px 40px",
            minWidth:380, boxShadow:"0 8px 40px rgba(0,0,0,0.18)",
          }}>
            {fundsSuccess ? (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
                <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>
                  {fundsType === "add" ? "Funds Added!" : "Funds Removed!"}
                </div>
                <div style={{ color:"#8A8A8A", marginBottom:24 }}>
                  ₹{parseInt(fundsAmount || "0").toLocaleString("en-IN")} has been {fundsType === "add" ? "added to" : "removed from"} your virtual account.
                </div>
                <button onClick={() => setShowFundsModal(false)} style={{ border:"none", borderRadius:10, background:"linear-gradient(135deg,#9B59B6,#4527A0)", color:"#fff", fontWeight:600, cursor:"pointer", padding:"10px 28px", fontSize:15 }}>Done</button>
              </div>
            ) : (
              <>
                <div style={{ fontWeight:700, fontSize:16, marginBottom:16 }}>
                  {fundsType === "add" ? "Add Funds" : "Remove Funds"}
                </div>
                <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                  {["add","remove"].map(t => (
                    <button key={t} onClick={() => setFundsType(t)} style={{
                      flex:1, padding:"8px 0", borderRadius:8, fontWeight:600, fontSize:14,
                      cursor:"pointer",
                      background: fundsType === t ? (t === "add" ? "#F0FFF4" : "#FFF0F0") : "#FFFFFF",
                      color: fundsType === t ? (t === "add" ? "#276749" : "#E83838") : "#8A8A8A",
                      border: `1.5px solid ${fundsType === t ? (t === "add" ? "#276749" : "#E83838") : "#EBEBEB"}`,
                    }}>{t === "add" ? "+ Add Funds" : "− Remove Funds"}</button>
                  ))}
                </div>
                <div style={{ marginBottom:20 }}>
                  <label style={labelStyle}>Amount (₹)</label>
                  <input
                    style={inputStyle} type="number" placeholder="Enter amount"
                    value={fundsAmount} onChange={e => setFundsAmount(e.target.value)}
                  />
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <button onClick={() => setShowFundsModal(false)} style={{ flex:1, padding:"10px 0", border:"1.5px solid #EBEBEB", borderRadius:10, background:"#FFFFFF", color:"#1A1A1A", fontWeight:500, cursor:"pointer", fontSize:15 }}>Cancel</button>
                  <button
                    onClick={() => setFundsProgress(true)}
                    style={{ flex:1, padding:"10px 0", border:"none", borderRadius:10, background:`linear-gradient(135deg,#9B59B6,${PURPLE})`, color:"#fff", fontWeight:600, cursor:"pointer", fontSize:15 }}
                  >Confirm</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {fundsProgress && (
        <ProgressPopup
          label={fundsType === "add" ? "Adding funds…" : "Removing funds…"}
          onDone={() => { setFundsProgress(false); setFundsSuccess(true); }}
        />
      )}
    </div>
  );
}
