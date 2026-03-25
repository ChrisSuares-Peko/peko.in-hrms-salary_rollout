import { C, FS, btnPrimary } from "../tokens";

export default function Topbar({ dummyMode }) {
  return (
    <header style={{
      height: 58, background: C.white, borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", padding: "0 24px",
      gap: 16, position: "sticky", top: 0, zIndex: 100,
    }}>
      {/* Search */}
      <div style={{ flex: 1, maxWidth: 400 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: C.bg, border: `1px solid ${C.border}`,
          borderRadius: 10, padding: "8px 14px",
        }}>
          <span style={{ color: C.muted, fontSize: 14 }}>🔍</span>
          <input
            placeholder="What are you looking for today?"
            style={{
              border: "none", outline: "none", background: "transparent",
              fontSize: FS.sm, color: C.primary, width: "100%",
            }}
          />
        </div>
      </div>

      {/* Right section */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
        {/* Cashback pill */}
        <div style={{
          background: "#FFF7ED", color: "#C2410C", borderRadius: 20,
          padding: "4px 12px", fontSize: FS.xs, fontWeight: 600,
          border: "1px solid #FED7AA",
        }}>
          🎁 ₹1,200 Cashback
        </div>

        {/* Claim button */}
        <button style={{
          ...btnPrimary, padding: "7px 14px", fontSize: FS.sm,
        }}>
          Claim free credits
        </button>

        {/* Bell */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: 20 }}>🔔</span>
          {dummyMode && (
            <span style={{
              position: "absolute", top: -2, right: -2,
              width: 8, height: 8, background: C.red,
              borderRadius: "50%", border: "1.5px solid #fff",
            }} />
          )}
        </div>

        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: C.redGrad || C.red,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: FS.sm,
          }}>S</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: FS.sm, fontWeight: 600 }}>Sigma D1</div>
            <div style={{ fontSize: FS.xs, color: C.muted }}>Logistics</div>
          </div>
        </div>
      </div>
    </header>
  );
}
