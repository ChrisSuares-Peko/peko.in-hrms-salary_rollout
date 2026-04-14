import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// Step definitions per account type
const STEPS = {
  virtual: [
    {
      id: 1,
      title: "Application Submission",
      description: "Your virtual account application has been submitted to Decentro for processing.",
      detail: "We've received your entity details and are initiating the account creation process with our banking partner.",
      icon: "📋",
      duration: "Instant",
    },
    {
      id: 2,
      title: "Account Creation",
      description: "Your dedicated virtual account is being created on the banking infrastructure.",
      detail: "This involves provisioning your account number, IFSC code, and linking it to your settlement bank account.",
      icon: "⚙️",
      duration: "1–2 minutes",
    },
    {
      id: 3,
      title: "Sharing Account Details",
      description: "Your virtual account credentials are ready and have been shared with you.",
      detail: "Your Virtual Account Number and IFSC code are now active. You can start receiving funds and processing payroll immediately.",
      icon: "📤",
      duration: "Instant",
    },
  ],
  bank: [
    {
      id: 1,
      title: "Application Submission",
      description: "Your bank account linking request has been submitted successfully.",
      detail: "We've received your account details and are initiating the verification process with your bank.",
      icon: "📋",
      duration: "Instant",
    },
    {
      id: 2,
      title: "Account Verification",
      description: "Your bank account is being verified via a penny drop or micro-deposit check.",
      detail: "A small test transaction will be sent to your account to confirm ownership. This typically takes 1–2 business days.",
      icon: "🔍",
      duration: "1–2 business days",
    },
  ],
};

// Step status: "completed" | "active" | "pending"
function getStepStatus(stepIndex, currentStep) {
  if (stepIndex < currentStep) return "completed";
  if (stepIndex === currentStep) return "active";
  return "pending";
}

export default function AccountSetupPage({ type, dummyMode, onNavigate }) {
  const steps = STEPS[type] || STEPS.virtual;
  const [currentStep, setCurrentStep] = useState(0); // index of active step
  const [allDone, setAllDone] = useState(false);

  // Auto-advance steps to simulate progress (2s per step)
  useEffect(() => {
    if (currentStep >= steps.length) {
      setAllDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStep(s => s + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentStep, steps.length]);

  const isVirtual = type === "virtual";
  const accentColor = isVirtual ? "#4527A0" : "#E83838";
  const accentGrad  = isVirtual
    ? "linear-gradient(135deg,#9B59B6,#4527A0)"
    : "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)";
  const accentLight = isVirtual ? "#F5F3FF" : "#FFF0F0";
  const accentBorder = isVirtual ? "#DDD6FE" : "#FECACA";

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"Inter,sans-serif", background:"#F7F7F7" }}>
      <Sidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <Topbar dummyMode={dummyMode} />

        <main style={{ flex:1, overflowY:"auto", padding:"48px 0", display:"flex", alignItems:"flex-start", justifyContent:"center" }}>
          <div style={{ width:"100%", maxWidth:640, padding:"0 24px" }}>

            {/* Header */}
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <div style={{
                width:64, height:64, borderRadius:18,
                background: accentGrad,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:28, margin:"0 auto 20px",
                boxShadow: isVirtual
                  ? "0 8px 24px rgba(69,39,160,0.25)"
                  : "0 8px 24px rgba(200,40,40,0.25)",
              }}>
                {isVirtual ? "💳" : "🏦"}
              </div>
              <h1 style={{ fontSize:24, fontWeight:700, color:"#1A1A1A", margin:"0 0 8px" }}>
                {isVirtual ? "Setting Up Your Virtual Account" : "Linking Your Bank Account"}
              </h1>
              <p style={{ fontSize:15, color:"#8A8A8A", margin:0, lineHeight:1.6 }}>
                {isVirtual
                  ? "Your dedicated payroll account is being configured. This only takes a moment."
                  : "We're verifying your bank account details. Sit tight — we'll update you at each step."}
              </p>
            </div>

            {/* Steps tracker */}
            <div style={{
              background:"#FFFFFF",
              border:"1px solid #EBEBEB",
              borderRadius:16,
              padding:"32px",
              marginBottom:32,
              boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
            }}>
              {steps.map((step, idx) => {
                const status = getStepStatus(idx, currentStep);
                const isLast = idx === steps.length - 1;

                return (
                  <div key={step.id} style={{ display:"flex", gap:20 }}>

                    {/* Left: icon + connector line */}
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>

                      {/* Step circle */}
                      <div style={{
                        width:44, height:44,
                        borderRadius:"50%",
                        border: status === "pending"
                          ? "2px solid #EBEBEB"
                          : `2px solid ${accentColor}`,
                        background: status === "completed"
                          ? accentGrad
                          : status === "active"
                          ? accentLight
                          : "#FFFFFF",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        flexShrink:0,
                        transition:"all 0.4s ease",
                        boxShadow: status === "active"
                          ? isVirtual
                            ? "0 0 0 4px rgba(124,58,237,0.15)"
                            : "0 0 0 4px rgba(232,56,56,0.12)"
                          : "none",
                      }}>
                        {status === "completed" ? (
                          <span style={{ color:"#FFFFFF", fontSize:18, fontWeight:700 }}>✓</span>
                        ) : status === "active" ? (
                          // Pulsing spinner for active step
                          <div style={{
                            width:18, height:18,
                            borderRadius:"50%",
                            border:`2.5px solid ${accentColor}`,
                            borderTopColor:"transparent",
                            animation:"spin 0.8s linear infinite",
                          }} />
                        ) : (
                          <span style={{ color:"#D1D5DB", fontSize:16 }}>{step.id}</span>
                        )}
                      </div>

                      {/* Connector line */}
                      {!isLast && (
                        <div style={{
                          width:2,
                          flex:1,
                          minHeight:32,
                          marginTop:4,
                          background: status === "completed"
                            ? accentColor
                            : "#EBEBEB",
                          transition:"background 0.4s ease",
                        }} />
                      )}
                    </div>

                    {/* Right: step content */}
                    <div style={{ paddingBottom: isLast ? 0 : 32, flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                        <span style={{ fontSize:18 }}>{step.icon}</span>
                        <div style={{
                          fontWeight:700, fontSize:16,
                          color: status === "pending" ? "#8A8A8A" : "#1A1A1A",
                          transition:"color 0.3s",
                        }}>
                          {step.title}
                        </div>
                        {/* Status badge */}
                        {status === "completed" && (
                          <span style={{
                            fontSize:11, fontWeight:700,
                            padding:"2px 8px", borderRadius:20,
                            background:"#F0FFF4", color:"#276749",
                          }}>Completed</span>
                        )}
                        {status === "active" && (
                          <span style={{
                            fontSize:11, fontWeight:700,
                            padding:"2px 8px", borderRadius:20,
                            background: accentLight, color: accentColor,
                          }}>In Progress</span>
                        )}
                        {status === "pending" && (
                          <span style={{
                            fontSize:11, fontWeight:700,
                            padding:"2px 8px", borderRadius:20,
                            background:"#F3F4F6", color:"#6B7280",
                          }}>Pending</span>
                        )}
                      </div>

                      <p style={{
                        fontSize:13, color: status === "pending" ? "#9CA3AF" : "#8A8A8A",
                        margin:"0 0 4px", lineHeight:1.6,
                        transition:"color 0.3s",
                      }}>
                        {step.description}
                      </p>

                      {/* Expanded detail — only for active or completed */}
                      {status !== "pending" && (
                        <p style={{
                          fontSize:12, color: accentColor,
                          margin:"6px 0 0",
                          padding:"8px 12px",
                          background: accentLight,
                          borderRadius:8,
                          borderLeft:`3px solid ${accentColor}`,
                          lineHeight:1.6,
                        }}>
                          {step.detail}
                        </p>
                      )}

                      {/* Duration chip */}
                      <div style={{ marginTop:8, fontSize:12, color:"#8A8A8A" }}>
                        🕐 Estimated time: <strong>{step.duration}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Account details card — shown when all done (virtual only) */}
            {allDone && isVirtual && (
              <div style={{
                background:"#FFFFFF",
                border:`1.5px solid ${accentBorder}`,
                borderRadius:14,
                padding:"24px 28px",
                marginBottom:24,
                boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
              }}>
                <div style={{ fontWeight:700, fontSize:16, color:"#1A1A1A", marginBottom:16 }}>
                  🎉 Your Virtual Account is Ready
                </div>
                {[
                  ["Virtual Account Number", "VA9823401567"],
                  ["IFSC Code",              "PEKO0001234"],
                  ["Account Status",         "Active"],
                ].map(([k, v]) => (
                  <div key={k} style={{
                    display:"flex", justifyContent:"space-between",
                    padding:"10px 0",
                    borderBottom:"1px solid #F3F4F6",
                    fontSize:14,
                  }}>
                    <span style={{ color:"#8A8A8A" }}>{k}</span>
                    <span style={{ fontWeight:600, color: k === "Account Status" ? "#276749" : "#1A1A1A" }}>
                      {k === "Account Status"
                        ? <span style={{ background:"#F0FFF4", color:"#276749", padding:"2px 10px", borderRadius:20, fontSize:12, fontWeight:700 }}>Active</span>
                        : v}
                      {(k === "Virtual Account Number" || k === "IFSC Code") && (
                        <span
                          onClick={() => navigator.clipboard?.writeText(v)}
                          style={{ marginLeft:8, cursor:"pointer", fontSize:13, color: accentColor }}
                          title="Copy"
                        >📋</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA — Proceed to Dashboard (only shown when all steps done) */}
            {allDone && (
              <button
                onClick={() => onNavigate("dashboard")}
                style={{
                  width:"100%", border:"none", borderRadius:12,
                  background: accentGrad,
                  color:"#fff", fontWeight:700, cursor:"pointer",
                  padding:"15px 20px", fontSize:16,
                  boxShadow: isVirtual
                    ? "0 4px 14px rgba(69,39,160,0.30)"
                    : "0 4px 14px rgba(200,40,40,0.30)",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                }}
              >
                Proceed to Dashboard →
              </button>
            )}

            {/* Spinner animation keyframe */}
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to   { transform: rotate(360deg); }
              }
            `}</style>

          </div>
        </main>
      </div>
    </div>
  );
}
