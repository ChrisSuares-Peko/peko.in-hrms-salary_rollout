import { C, FS } from "../tokens";

export default function Breadcrumb({ items }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: FS.sm, marginBottom: 18 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {i > 0 && <span style={{ color: C.muted }}>›</span>}
            <span
              onClick={item.onClick || undefined}
              style={{
                color: isLast ? C.red : C.muted,
                fontWeight: isLast ? 600 : 400,
                cursor: item.onClick ? "pointer" : "default",
                textDecoration: item.onClick ? "underline" : "none",
              }}
            >
              {item.label}
            </span>
          </span>
        );
      })}
    </div>
  );
}
