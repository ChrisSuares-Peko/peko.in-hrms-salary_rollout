import { C, FS } from "../tokens";

export default function Footer() {
  return (
    <footer style={{
      padding: "16px 24px", borderTop: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", gap: 20,
      fontSize: FS.xs, color: C.muted, background: C.white,
      marginTop: "auto",
    }}>
      <span>© 2026 Peko Payments Pvt. Ltd.</span>
      {["Privacy Policy","Terms of Service","Security","Contact Us"].map(link => (
        <span key={link} style={{ cursor: "pointer", textDecoration: "underline" }}>{link}</span>
      ))}
    </footer>
  );
}
