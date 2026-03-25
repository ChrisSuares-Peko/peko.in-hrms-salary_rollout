import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import ProgressPopup from "../components/ProgressPopup";
import { C, FS, btnPrimary, btnSecondary, inputStyle, labelStyle } from "../tokens";

export default function SetupPage({ dummyMode, onNavigate }) {
  const [selected, setSelected] = useState(null);

  // Bank form
  const [bankForm, setBankForm] = useState({ name: "", account: "", ifsc: "", branch: "" });
  const [bankVerified, setBankVerified] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  // Virtual form
  const [virtForm, setVirtForm] = useState({ name: "", pan: "", email: "", mobile: "", address: "", purpose: "" });

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Topbar dummyMode={dummyMode} />
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>

          {/* Hero */}
          <div style={{
            maxWidth: 760, margin: "0 auto 32px",
            background: "linear-gradient(135deg,#1A1A1A 0%,#2D2D2D 100%)",
            borderRadius: 16, padding: "28px 32px", color: "#fff",
            display: "flex", alignItems: "center", gap: 24,
          }}>
            <div style={{ fontSize: 48 }}>🚀</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: FS.xl, marginBottom: 6 }}>Setup Your Payroll Account</div>
              <div style={{ fontSize: FS.sm, opacity: 0.8, marginBottom: 14 }}>
                Choose how you'd like to fund your payroll disbursements.
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {["🔒 RBI Compliant", "⚡ 2-min Setup"].map(badge => (
                  <span key={badge} style={{
                    background: "rgba(255,255,255,0.15)", borderRadius: 20,
                    padding: "4px 12px", fontSize: FS.xs, fontWeight: 600,
                  }}>{badge}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 1 label */}
          <div style={{ maxWidth: 760, margin: "0 auto 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              background: "#E83838", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700,
            }}>1</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A" }}>
              Choose account type
            </div>
          </div>

          {/* Conversion cards */}
          <div style={{ maxWidth: 760, margin: "0 auto 24px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              alignItems: "stretch",
            }}>

              {/* ── Virtual Account Card ── */}
              <div
                onClick={() => setSelected("virtual")}
                style={{
                  background: selected === "virtual"
                    ? "linear-gradient(160deg,#F5F3FF 0%,#EDE7F6 100%)"
                    : "#FFF8F8",
                  border: selected === "virtual" ? "2px solid #7C3AED" : "2px solid #E83838",
                  borderRadius: 16,
                  padding: "28px 26px",
                  display: "flex", flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: selected === "virtual"
                    ? "0 8px 32px rgba(124,58,237,0.12)"
                    : "0 2px 8px rgba(232,56,56,0.08)",
                  opacity: selected === "bank" ? 0.75 : 1,
                }}
              >
                {/* Badges */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
                  <span style={{
                    background: selected === "virtual"
                      ? "linear-gradient(135deg,#9B59B6,#4527A0)"
                      : "linear-gradient(135deg,#FF6B6B,#C62828)",
                    color: "#fff", fontSize: 11, fontWeight: 700,
                    padding: "3px 10px", borderRadius: 20,
                  }}>⭐ Recommended</span>
                  <span style={{
                    background: selected === "virtual" ? "#EDE7F6" : "#FFF0F0",
                    color: selected === "virtual" ? "#4527A0" : "#E83838",
                    fontSize: 11, fontWeight: 700,
                    padding: "3px 10px", borderRadius: 20,
                    border: `1px solid ${selected === "virtual" ? "#C4B5FD" : "#FECACA"}`,
                  }}>🔥 Most Popular for Payroll</span>
                </div>

                {/* Icon + Title */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: selected === "virtual"
                      ? "linear-gradient(135deg,#9B59B6,#4527A0)"
                      : "linear-gradient(135deg,#FF6B6B,#C62828)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 20,
                  }}>💳</div>
                  <div>
                    <div style={{
                      fontWeight: 700, fontSize: 18,
                      color: selected === "virtual" ? "#3B0764" : "#1A1A1A",
                    }}>Virtual Account</div>
                    <div style={{
                      fontSize: 12,
                      color: selected === "virtual" ? "#7C3AED" : "#8A8A8A",
                      fontWeight: 500,
                    }}>Peko-managed · Instant & seamless</div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: selected === "virtual" ? "#DDD6FE" : "#EBEBEB",
                  margin: "16px 0",
                }} />

                {/* Tagline */}
                <div style={{
                  fontSize: 13,
                  color: selected === "virtual" ? "#7C3AED" : "#8A8A8A",
                  marginBottom: 16, fontStyle: "italic",
                }}>
                  Built for seamless, end-to-end payroll management
                </div>

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24, flex: 1 }}>
                  {[
                    ["⚡", "Instant Setup", "Live in minutes, no paperwork"],
                    ["👁️", "Live Balance Visibility", "View available payroll balance anytime"],
                    ["🎛️", "Full Platform Control", "Manage funds, beneficiaries & payouts in one place"],
                    ["🏦", "Dedicated Payroll Account", "Separate account designed for salary disbursement"],
                    ["🚀", "One-Click Salary Payouts", "Disburse salaries to your entire team instantly"],
                  ].map(([icon, title, sub]) => (
                    <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{
                          fontWeight: 600, fontSize: 13,
                          color: selected === "virtual" ? "#3B0764" : "#1A1A1A",
                        }}>{title}</div>
                        <div style={{
                          fontSize: 12,
                          color: selected === "virtual" ? "#7C3AED" : "#8A8A8A",
                          marginTop: 2, lineHeight: 1.4,
                        }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={e => { e.stopPropagation(); setSelected("virtual"); }}
                  style={{
                    border: "none", borderRadius: 12,
                    background: selected === "virtual"
                      ? "linear-gradient(135deg,#9B59B6,#4527A0)"
                      : "linear-gradient(135deg,#FF6B6B,#C62828)",
                    color: "#fff", fontWeight: 700,
                    cursor: "pointer", padding: "13px 20px",
                    fontSize: 15, width: "100%",
                    boxShadow: selected === "virtual"
                      ? "0 4px 14px rgba(69,39,160,0.35)"
                      : "0 4px 14px rgba(200,40,40,0.25)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8,
                  }}
                >
                  👉 Create Virtual Account
                </button>

                {/* Microcopy */}
                <div style={{
                  textAlign: "center", fontSize: 12, marginTop: 8, fontWeight: 500,
                  color: selected === "virtual" ? "#7C3AED" : "#8A8A8A",
                }}>
                  Takes less than a minute to set up
                </div>
              </div>

              {/* ── Bank Account Card ── */}
              <div
                onClick={() => setSelected("bank")}
                style={{
                  background: selected === "bank"
                    ? "linear-gradient(160deg,#F5F3FF 0%,#EDE7F6 100%)"
                    : "#FFFFFF",
                  border: selected === "bank" ? "2px solid #7C3AED" : "2px solid #E83838",
                  borderRadius: 16,
                  padding: "28px 26px",
                  display: "flex", flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: selected === "bank"
                    ? "0 8px 32px rgba(124,58,237,0.12)"
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  opacity: selected === "virtual" ? 0.75 : 1,
                }}
              >
                {/* Spacer to align with Virtual card badges */}
                <div style={{ height: 26, marginBottom: 18 }} />

                {/* Icon + Title */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: selected === "bank"
                      ? "linear-gradient(135deg,#9B59B6,#4527A0)"
                      : "linear-gradient(135deg,#FF6B6B,#C62828)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 20,
                  }}>🏦</div>
                  <div>
                    <div style={{
                      fontWeight: 700, fontSize: 18,
                      color: selected === "bank" ? "#3B0764" : "#1A1A1A",
                    }}>Bank Account</div>
                    <div style={{
                      fontSize: 12,
                      color: selected === "bank" ? "#7C3AED" : "#8A8A8A",
                      fontWeight: 500,
                    }}>Your existing bank · External workflow</div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{
                  height: 1,
                  background: selected === "bank" ? "#DDD6FE" : "#EBEBEB",
                  margin: "16px 0",
                }} />

                {/* Tagline */}
                <div style={{
                  fontSize: 13,
                  color: selected === "bank" ? "#7C3AED" : "#8A8A8A",
                  marginBottom: 16, fontStyle: "italic",
                }}>
                  Works with your current banking setup
                </div>

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24, flex: 1 }}>
                  {[
                    ["👁️", "External Balance Check", "View balances via bank and manage beneficiaries at the bank portal"],
                    ["⏱️", "Account Verification Required", "Setup requires verification before first use"],
                    ["📋", "External Reconciliation", "Match and track transactions outside the platform"],
                    ["🔗", "Bank-Dependent Workflow", "Subject to your bank's systems and availability"],
                    ["🕒", "Standard Processing Timelines", "Payouts follow bank processing schedules"],
                  ].map(([icon, title, sub]) => (
                    <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{icon}</span>
                      <div>
                        <div style={{
                          fontWeight: 600, fontSize: 13,
                          color: selected === "bank" ? "#3B0764" : "#8A8A8A",
                        }}>{title}</div>
                        <div style={{
                          fontSize: 12,
                          color: selected === "bank" ? "#7C3AED" : "#9CA3AF",
                          marginTop: 2, lineHeight: 1.4,
                        }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={e => { e.stopPropagation(); setSelected("bank"); }}
                  style={{
                    border: "none", borderRadius: 12,
                    background: selected === "bank"
                      ? "linear-gradient(135deg,#9B59B6,#4527A0)"
                      : "linear-gradient(135deg,#FF6B6B,#C62828)",
                    color: "#fff", fontWeight: 700,
                    cursor: "pointer", padding: "13px 20px",
                    fontSize: 15, width: "100%",
                    boxShadow: selected === "bank"
                      ? "0 4px 14px rgba(69,39,160,0.35)"
                      : "0 4px 14px rgba(200,40,40,0.25)",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8,
                  }}
                >
                  🏦 Use Bank Account Instead
                </button>

                {/* Why choose this? */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: selected === "bank" ? "#7C3AED" : "#8A8A8A" }}>
                    Why choose this?
                  </div>
                  <div
                    title="Use a bank account if you already have a verified business account and prefer direct transfers without a virtual layer."
                    style={{
                      width: 16, height: 16, borderRadius: "50%",
                      background: "#E5E7EB", display: "flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, color: "#8A8A8A", cursor: "help",
                    }}
                  >?</div>
                </div>
              </div>

            </div>
          </div>

          {/* Step 2 */}
          {selected && (
            <>
              <div style={{ maxWidth: 760, margin: "0 auto 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "#E83838", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                }}>2</div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A1A" }}>Enter account details</div>
              </div>

              <div style={{
                maxWidth: 760, margin: "0 auto 24px",
                background: C.white, borderRadius: 14, padding: "28px 32px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}>
                {selected === "bank" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Account Holder Name *</label>
                        <input
                          style={inputStyle}
                          value={bankForm.name}
                          placeholder="e.g. Sigma D1 Logistics"
                          onChange={e => setBankForm(f => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Account Number *</label>
                        <input
                          style={inputStyle}
                          value={bankForm.account}
                          placeholder="Enter account number"
                          onChange={e => setBankForm(f => ({ ...f, account: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>IFSC Code *</label>
                        <input
                          style={inputStyle}
                          value={bankForm.ifsc}
                          placeholder="e.g. HDFC0001234"
                          onChange={e => setBankForm(f => ({ ...f, ifsc: e.target.value }))}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Branch</label>
                        <input
                          style={inputStyle}
                          value={bankForm.branch}
                          placeholder="Branch name"
                          onChange={e => setBankForm(f => ({ ...f, branch: e.target.value }))}
                        />
                      </div>
                    </div>
                    {!bankVerified ? (
                      <button
                        onClick={() => setShowProgress(true)}
                        style={{ ...btnPrimary, padding: "11px 24px", alignSelf: "flex-start" }}
                      >
                        Verify Account
                      </button>
                    ) : (
                      <div style={{ color: "#276749", fontWeight: 600, fontSize: FS.sm }}>✅ Account Verified</div>
                    )}
                  </div>
                )}

                {selected === "virtual" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Entity Name *</label>
                        <input style={inputStyle} value={virtForm.name} placeholder="Company name"
                          onChange={e => setVirtForm(f => ({ ...f, name: e.target.value }))} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>PAN Number *</label>
                        <input style={inputStyle} value={virtForm.pan} placeholder="ABCDE1234F"
                          onChange={e => setVirtForm(f => ({ ...f, pan: e.target.value }))} />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Email *</label>
                        <input style={inputStyle} value={virtForm.email} placeholder="accounts@company.com"
                          onChange={e => setVirtForm(f => ({ ...f, email: e.target.value }))} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Mobile *</label>
                        <input style={inputStyle} value={virtForm.mobile} placeholder="10-digit mobile"
                          onChange={e => setVirtForm(f => ({ ...f, mobile: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Registered Address *</label>
                      <input style={inputStyle} value={virtForm.address} placeholder="Full address"
                        onChange={e => setVirtForm(f => ({ ...f, address: e.target.value }))} />
                    </div>
                    <div>
                      <label style={labelStyle}>Purpose of Account</label>
                      <input style={inputStyle} value={virtForm.purpose} placeholder="e.g. Payroll disbursements"
                        onChange={e => setVirtForm(f => ({ ...f, purpose: e.target.value }))} />
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                  <button
                    onClick={() => onNavigate("dashboard")}
                    style={{ ...btnPrimary, padding: "12px 28px", fontSize: FS.base }}
                  >
                    Proceed to Dashboard →
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    style={{ ...btnSecondary, padding: "12px 24px", fontSize: FS.base }}
                  >
                    Back
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
        <Footer />
      </div>

      {showProgress && (
        <ProgressPopup
          label="Verifying bank account…"
          onDone={() => { setShowProgress(false); setBankVerified(true); }}
        />
      )}
    </div>
  );
}
