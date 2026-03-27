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
  const [showDeleteGuard, setShowDeleteGuard] = useState(false);
  const [fundsForm, setFundsForm] = useState({ action:"Credit" });
  const [fundsAmount, setFundsAmount] = useState("");
  const [fundsPurpose, setFundsPurpose] = useState("");
  const [fundsTransferType, setFundsTransferType] = useState("");
  const [fundsProcessing, setFundsProcessing] = useState(false);
  const [fundsProgress, setFundsProgress] = useState(0);
  const [fundsSuccess, setFundsSuccess] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const selectedBank = banks.find(b => b.id === selected);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const closeFundsModal = () => {
    setShowFundsModal(false);
    setFundsForm({ action:"Credit" });
    setFundsAmount("");
    setFundsPurpose("");
    setFundsTransferType("");
    setFundsProcessing(false);
    setFundsSuccess(false);
    setFundsProgress(0);
  };

  const startFunds = () => {
    setFundsProcessing(true); setFundsProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now()-start)/2000)*100));
      setFundsProgress(pct);
      if (pct >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          setFundsProcessing(false);
          setFundsSuccess(true);
          const amt = parseInt(fundsAmount || 0);
          setBanks(bs => bs.map(b => {
            if (b.id !== selected) return b;
            const cur = parseInt(b.balance.replace(/[₹,]/g, ""));
            const next = fundsForm.action === "Credit" ? cur + amt : Math.max(0, cur - amt);
            return { ...b, balance: `₹${next.toLocaleString("en-IN")}` };
          }));
        }, 300);
      }
    }, 30);
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
                      onClick={() => { setFundsSuccess(false); setShowFundsModal(true); }}
                      style={{ border:"none", borderRadius:10, background:"linear-gradient(135deg,#9B59B6,#4527A0)", color:"#fff", fontWeight:600, cursor:"pointer", padding:"7px 16px", fontSize:14 }}
                    >💰 Add / Remove Funds</button>
                    <button
                      onClick={handleRefresh}
                      style={{ border:"1.5px solid #EBEBEB", borderRadius:10, background:"#FFFFFF", color:"#1A1A1A", fontWeight:500, cursor:"pointer", padding:"7px 16px", fontSize:14, display:"flex", alignItems:"center", gap:6 }}
                    >🔄 {refreshing ? "Refreshing..." : "Refresh Balance"}</button>
                    <button
                      onClick={() => {
                        const bal = parseInt(selectedBank?.balance?.replace(/[₹,]/g, "") || "0");
                        if (bal > 0) {
                          setShowDeleteGuard(true);
                        } else {
                          setBanks(bs => bs.filter(b => b.id !== selectedBank.id));
                          setSelected(null);
                        }
                      }}
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
              <div style={{ padding:"18px 24px", borderBottom:"1px solid #EBEBEB", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:18, color:"#1A1A1A" }}>Add Bank Account</div>
                  <div style={{ fontSize:13, color:"#8A8A8A", marginTop:2 }}>Link your company's bank account</div>
                </div>
                <button
                  onClick={() => { setShowAdd(false); setAddForm({ name:"", account:"", ifsc:"", branch:"" }); setAddVerified(false); }}
                  style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#8A8A8A" }}
                >✕</button>
              </div>

              <div style={{ flex:1, overflowY:"auto", padding:"24px", display:"flex", flexDirection:"column", gap:16 }}>
                {[
                  ["Account Name",        "name",    "e.g. Sigma D1 Logistics",   true],
                  ["Bank Account Number", "account", "Enter account number",       true],
                  ["IFSC Code",           "ifsc",    "e.g. HDFC0001234",           true],
                  ["Branch",              "branch",  "Enter branch (optional)",    false],
                ].map(([lbl, key, ph, required]) => (
                  <div key={key}>
                    <label style={{ fontSize:13, color:"#8A8A8A", marginBottom:6, display:"block", fontWeight:500 }}>
                      {required && <span style={{ color:"#E83838" }}>* </span>}{lbl}
                    </label>
                    <input
                      placeholder={ph}
                      value={addForm[key]}
                      onChange={e => { setAddForm(f => ({ ...f, [key]: e.target.value })); setAddVerified(false); }}
                      style={{
                        width:"100%", border:"1px solid #EBEBEB", borderRadius:8,
                        padding:"10px 12px", fontSize:15, outline:"none",
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
                      border:"1.5px solid #E83838", borderRadius:8,
                      background:"#FFFFFF", color:"#E83838",
                      fontWeight:600,
                      cursor: (!addForm.name || !addForm.account || !addForm.ifsc) ? "not-allowed" : "pointer",
                      padding:"10px", fontSize:15,
                      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                      opacity: (!addForm.name || !addForm.account || !addForm.ifsc) ? 0.5 : 1,
                      boxSizing:"border-box", width:"100%",
                    }}
                  >🔍 Verify Bank Account</button>
                )}

                {addVerified && (
                  <div style={{ padding:"12px 14px", background:"#F0FFF4", border:"1px solid #B7EBC3", borderRadius:8, color:"#276749", display:"flex", alignItems:"center", gap:8, fontSize:14 }}>
                    ✅ Account verified — you're good to go!
                  </div>
                )}
              </div>

              <div style={{ padding:"16px 24px", borderTop:"1px solid #EBEBEB", display:"flex", gap:10 }}>
                <button
                  onClick={() => { setShowAdd(false); setAddForm({ name:"", account:"", ifsc:"", branch:"" }); setAddVerified(false); }}
                  style={{ flex:1, border:"1px solid #EBEBEB", borderRadius:8, background:"#FFFFFF", color:"#1A1A1A", fontWeight:500, cursor:"pointer", padding:"11px", fontSize:15 }}
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
                    flex:1, border:"none", borderRadius:8,
                    background: addVerified
                      ? "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)"
                      : "#E8E8E8",
                    color: addVerified ? "#fff" : "#8A8A8A",
                    fontWeight:600, cursor: addVerified ? "pointer" : "not-allowed",
                    padding:"11px", fontSize:15,
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
      {showFundsModal && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(26,26,26,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#FFFFFF",
            borderRadius: 20,
            width: 480,
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}>

            {/* Header */}
            <div style={{
              padding: "22px 28px",
              borderBottom: "1px solid #EBEBEB",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "linear-gradient(135deg,#9B59B6,#4527A0)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
                }}>💳</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A" }}>
                    Update Account Balance
                  </div>
                  <div style={{ fontSize: 13, color: "#8A8A8A", marginTop: 2 }}>
                    {selectedBank?.account} · Virtual Account
                  </div>
                </div>
              </div>
              {!fundsProcessing && (
                <button onClick={closeFundsModal} style={{
                  background: "none", border: "none",
                  fontSize: 20, cursor: "pointer", color: "#8A8A8A",
                }}>✕</button>
              )}
            </div>

            {/* Body */}
            {!fundsSuccess ? (
              <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Action — Credit / Debit toggle */}
                <div>
                  <label style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 8, display: "block", fontWeight: 500 }}>
                    Action <span style={{ color: "#E83838" }}>*</span>
                  </label>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[
                      { val: "Credit", label: "➕ Credit (Add Funds)",   bg: "#F0FFF4", border: "#276749", color: "#276749" },
                      { val: "Debit",  label: "➖ Debit (Remove Funds)", bg: "#FFF0F0", border: "#E83838", color: "#E83838" },
                    ].map(({ val, label, bg, border, color }) => (
                      <div
                        key={val}
                        onClick={() => setFundsForm(f => ({ ...f, action: val }))}
                        style={{
                          flex: 1, padding: "10px 0",
                          border: `1.5px solid ${fundsForm.action === val ? border : "#EBEBEB"}`,
                          borderRadius: 8, textAlign: "center",
                          cursor: "pointer", fontSize: 13, fontWeight: 600,
                          background: fundsForm.action === val ? bg : "#FFFFFF",
                          color: fundsForm.action === val ? color : "#8A8A8A",
                          transition: "all 0.15s",
                        }}
                      >{label}</div>
                    ))}
                  </div>
                </div>

                {/* Amount */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
                    Amount (₹) <span style={{ color: "#E83838" }}>*</span>
                  </label>
                  <input
                    type="number"
                    value={fundsAmount}
                    onChange={e => setFundsAmount(e.target.value)}
                    placeholder="Enter transaction amount"
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E0E0E0", fontSize: 14,
                      color: "#1A1A1A", boxSizing: "border-box", outline: "none",
                    }}
                  />
                </div>

                {/* Purpose */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
                    Purpose <span style={{ color: "#E83838" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={fundsPurpose}
                    onChange={e => setFundsPurpose(e.target.value)}
                    placeholder="e.g. Salary disbursement for March 2026"
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E0E0E0", fontSize: 14,
                      color: "#1A1A1A", boxSizing: "border-box", outline: "none",
                    }}
                  />
                </div>

                {/* Account Number — read only */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={selectedBank?.account || "VA9823401567"}
                    readOnly
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E8E8E8", background: "#F7F7F7",
                      fontSize: 14, color: "#999", boxSizing: "border-box",
                      cursor: "not-allowed",
                    }}
                  />
                </div>

                {/* Transfer Type */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 6 }}>
                    Transfer Type <span style={{ color: "#E83838" }}>*</span>
                  </label>
                  <select
                    value={fundsTransferType}
                    onChange={e => setFundsTransferType(e.target.value)}
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 8,
                      border: "1.5px solid #E0E0E0", fontSize: 14,
                      color: fundsTransferType ? "#1A1A1A" : "#AAA",
                      background: "#fff", boxSizing: "border-box", outline: "none",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                    }}
                  >
                    <option value="" disabled>Select transfer type</option>
                    <option value="IMPS">IMPS</option>
                    <option value="NEFT">NEFT</option>
                    <option value="RTGS">RTGS</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>

                {/* Current Balance display */}
                <div style={{
                  background: "#F5F3FF", border: "1px solid #DDD6FE",
                  borderRadius: 8, padding: "12px 14px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 13, color: "#7C3AED", fontWeight: 500 }}>Current Balance</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#4527A0" }}>
                    {selectedBank?.balance}
                  </span>
                </div>

                {/* Progress bar — shown when processing */}
                {fundsProcessing && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#8A8A8A", marginBottom: 6 }}>
                      <span>Processing transaction...</span>
                      <span>{fundsProgress}%</span>
                    </div>
                    <div style={{ background: "#E5E7EB", borderRadius: 99, height: 6, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 99,
                        background: "linear-gradient(135deg,#9B59B6,#4527A0)",
                        width: `${fundsProgress}%`,
                        transition: "width 0.05s linear",
                      }} />
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                  {!fundsProcessing && (
                    <button onClick={closeFundsModal} style={{
                      flex: 1, border: "1px solid #EBEBEB", borderRadius: 8,
                      background: "#FFFFFF", color: "#1A1A1A",
                      fontWeight: 500, cursor: "pointer", padding: "11px", fontSize: 15,
                    }}>Cancel</button>
                  )}
                  <button
                    onClick={startFunds}
                    disabled={!fundsAmount || !fundsPurpose || !fundsTransferType || fundsProcessing}
                    style={{
                      flex: 1, border: "none", borderRadius: 8,
                      background: (!fundsAmount || !fundsPurpose || !fundsTransferType || fundsProcessing)
                        ? "#E8E8E8"
                        : "linear-gradient(135deg,#9B59B6,#4527A0)",
                      color: (!fundsAmount || !fundsPurpose || !fundsTransferType || fundsProcessing)
                        ? "#8A8A8A" : "#fff",
                      fontWeight: 600, fontSize: 15,
                      cursor: fundsProcessing ? "not-allowed" : "pointer",
                      padding: "11px",
                      boxShadow: "0 2px 8px rgba(69,39,160,0.2)",
                    }}
                  >
                    {fundsProcessing ? "Processing..." : `Confirm ${fundsForm.action || "Transaction"}`}
                  </button>
                </div>

              </div>
            ) : (

              /* Success screen */
              <div style={{ padding: "32px 28px", textAlign: "center" }}>
                <div style={{
                  width: 60, height: 60, borderRadius: "50%",
                  background: "#F0FFF4", border: "2px solid #B7EBC3",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, margin: "0 auto 16px",
                }}>✅</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A", marginBottom: 6 }}>
                  Transaction Recorded
                </div>
                <div style={{ fontSize: 13, color: "#8A8A8A", marginBottom: 20 }}>
                  ₹{parseInt(fundsAmount || 0).toLocaleString("en-IN")} has been{" "}
                  {fundsForm.action === "Credit" ? "credited to" : "debited from"} your virtual account.
                </div>
                <div style={{
                  background: "#F5F3FF", border: "1px solid #DDD6FE",
                  borderRadius: 10, padding: "16px 20px", marginBottom: 20, textAlign: "left",
                }}>
                  {[
                    ["Action",          fundsForm.action],
                    ["Amount",          `₹${parseInt(fundsAmount || 0).toLocaleString("en-IN")}`],
                    ["Purpose",         fundsPurpose],
                    ["Transfer Type",   fundsTransferType],
                    ["Updated Balance", selectedBank?.balance],
                  ].map(([k, v]) => (
                    <div key={k} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "8px 0", borderBottom: "1px solid #EDE9FE",
                      fontSize: 13,
                    }}>
                      <span style={{ color: "#7C3AED", fontWeight: 500 }}>{k}</span>
                      <span style={{ fontWeight: 600, color: "#1A1A1A" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={closeFundsModal} style={{
                  border: "none", borderRadius: 8,
                  background: "linear-gradient(135deg,#9B59B6,#4527A0)",
                  color: "#fff", fontWeight: 600, cursor: "pointer",
                  padding: "11px 32px", fontSize: 15,
                }}>Done</button>
              </div>

            )}
          </div>
        </div>
      )}
      {/* ── Delete Guard Modal ── */}
      {showDeleteGuard && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.45)",
          display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000,
        }}>
          <div style={{
            background:"#fff", borderRadius:16, padding:"32px 28px",
            width:"100%", maxWidth:420, boxShadow:"0 8px 40px rgba(0,0,0,0.18)",
            textAlign:"center",
          }}>
            <div style={{
              width:56, height:56, borderRadius:"50%",
              background:"#FFF4E5", display:"flex",
              alignItems:"center", justifyContent:"center",
              margin:"0 auto 20px", fontSize:26,
            }}>
              ⚠️
            </div>
            <h3 style={{ margin:"0 0 12px", fontSize:17, fontWeight:700, color:"#1A1A1A" }}>
              Unable to Delete Account
            </h3>
            <p style={{ margin:"0 0 28px", fontSize:14, color:"#555", lineHeight:1.6 }}>
              This account cannot be deleted as there are funds still available in it.
              To proceed, please transfer all funds to another account first.
            </p>
            <div style={{ display:"flex", gap:12 }}>
              <button
                onClick={() => setShowDeleteGuard(false)}
                style={{
                  flex:1, padding:"11px 0", borderRadius:8,
                  border:"1.5px solid #E0E0E0", background:"#fff",
                  fontSize:14, fontWeight:600, color:"#555", cursor:"pointer",
                }}
              >Cancel</button>
              <button
                onClick={() => {
                  setShowDeleteGuard(false);
                  setShowFundsModal(true);
                }}
                style={{
                  flex:1, padding:"11px 0", borderRadius:8,
                  background:"linear-gradient(135deg,#7C3AED,#5B21B6)",
                  border:"none", fontSize:14, fontWeight:600,
                  color:"#fff", cursor:"pointer",
                }}
              >Transfer Funds</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
