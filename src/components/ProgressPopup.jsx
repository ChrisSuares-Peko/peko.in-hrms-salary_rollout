import { useState, useEffect } from "react";
import { C, FS, btnPrimary } from "../tokens";

export default function ProgressPopup({ label, onDone }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setDone(true);
          setTimeout(() => onDone && onDone(), 600);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(26,26,26,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 2000,
    }}>
      <div style={{
        background: C.white, borderRadius: 16, padding: "40px 48px",
        minWidth: 360, textAlign: "center",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>
          {done ? "✅" : "⏳"}
        </div>
        <div style={{ fontWeight: 700, fontSize: FS.lg, marginBottom: 8 }}>
          {done ? "Done!" : label || "Processing…"}
        </div>
        <div style={{ fontSize: FS.sm, color: C.muted, marginBottom: 24 }}>
          {done ? "All done. Continuing…" : "Please wait a moment"}
        </div>
        {/* Progress bar */}
        <div style={{
          height: 8, background: C.border, borderRadius: 99, overflow: "hidden",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: C.redGrad || C.red,
            borderRadius: 99,
            transition: "width 0.05s linear",
          }} />
        </div>
        <div style={{ fontSize: FS.xs, color: C.muted, marginTop: 8 }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
