import { C, FS } from "../tokens";

const NAV_ITEMS = [
  { emoji:"⊞",  label:"Dashboard" },
  { emoji:"💳", label:"Bill Payments" },
  { emoji:"✈️",  label:"Corporate Travel" },
  { emoji:"👥", label:"Payroll", badge:"New", badgeColor:"red", active:true },
  { emoji:"🖨️", label:"Office Supplies" },
  { emoji:"💻", label:"Softwares" },
  { emoji:"📦", label:"Logistics" },
  { emoji:"🎁",  label:"Gift Cards" },
  { emoji:"🏪", label:"Marketplace", badge:"Free", badgeColor:"green" },
  { emoji:"📋", label:"Tax & More", badge:"New", badgeColor:"red" },
  { emoji:"📊", label:"Accounting" },
  { emoji:"🧾", label:"Invoicing" },
  { emoji:"🛡️",  label:"Insurance" },
  { emoji:"🔗", label:"Hub" },
];

const BOTTOM_ITEMS = [
  { emoji:"📈", label:"Reports" },
  { emoji:"❓", label:"Need Help?" },
  { emoji:"⚙️", label:"Settings" },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: 210, minWidth: 210, height: "100vh", background: C.white,
      borderRight: `1px solid ${C.border}`, display: "flex",
      flexDirection: "column", position: "sticky", top: 0,
      overflowY: "auto", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 18,
            boxShadow: "0 2px 8px rgba(200,40,40,0.3)",
          }}>P</div>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: -0.3 }}>peko</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav style={{ flex: 1, padding: "10px 10px" }}>
        {NAV_ITEMS.map(item => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 8, cursor: "pointer",
            marginBottom: 1,
            background: item.active ? "#FFF0F0" : "transparent",
            color: item.active ? "#E83838" : C.primary,
            fontWeight: item.active ? 600 : 400,
            fontSize: 13,
            transition: "background 0.15s",
          }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{item.emoji}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{
                fontSize: 10, fontWeight: 700,
                background: item.badgeColor === "green" ? "#4CAF50" : "#E83838",
                color: "#fff", borderRadius: 20,
                padding: "1px 7px", flexShrink: 0,
              }}>{item.badge}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Nav */}
      <div style={{ padding: "10px 10px 16px", borderTop: `1px solid ${C.border}` }}>
        {BOTTOM_ITEMS.map(item => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 8, cursor: "pointer",
            marginBottom: 1, fontSize: 13, color: C.muted,
            transition: "background 0.15s",
          }}>
            <span style={{ fontSize: 14 }}>{item.emoji}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
