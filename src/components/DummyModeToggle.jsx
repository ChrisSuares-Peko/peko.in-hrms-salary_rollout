import { C, FS } from "../tokens";

export default function DummyModeToggle({ dummyMode, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        position: "fixed", top: 10, right: 46, zIndex: 1000,
        display: "flex", alignItems: "center", gap: 8,
        background: dummyMode ? "#FFF0F0" : C.white,
        border: `1.5px solid ${dummyMode ? C.red : C.border}`,
        borderRadius: 20, padding: "5px 12px",
        cursor: "pointer", userSelect: "none",
        fontSize: FS.xs, fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.2s",
      }}
    >
      {/* Toggle switch */}
      <div style={{
        width: 28, height: 16, borderRadius: 99,
        background: dummyMode ? C.red : C.border,
        position: "relative", transition: "background 0.2s",
      }}>
        <div style={{
          position: "absolute", top: 2,
          left: dummyMode ? 14 : 2,
          width: 12, height: 12,
          borderRadius: "50%", background: "#fff",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }} />
      </div>
      <span style={{ color: dummyMode ? C.red : C.muted }}>
        {dummyMode ? "📊 Dummy Data" : "⬜ Empty State"}
      </span>
    </div>
  );
}
