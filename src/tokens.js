export const C = {
  primary:  "#1A1A1A",
  red:      "#E83838",
  redDark:  "#C62828",
  redLight: "#FFF0F0",
  redGrad:  "linear-gradient(135deg,#FF6B6B 0%,#E03030 60%,#C62828 100%)",
  border:   "#EBEBEB",
  muted:    "#8A8A8A",
  bg:       "#F7F7F7",
  white:    "#FFFFFF",
};

export const FS = {
  xs: 11, sm: 13, base: 15, md: 16, lg: 18, xl: 22, xxl: 26,
};

export const btnPrimary = {
  border: "none", borderRadius: 10,
  background: C.redGrad, color: "#fff",
  fontWeight: 600, cursor: "pointer",
  boxShadow: "0 2px 8px rgba(200,40,40,0.25)",
};

export const btnSecondary = {
  border: `1.5px solid ${C.border}`, borderRadius: 10,
  background: C.white, color: C.primary,
  fontWeight: 500, cursor: "pointer",
};

export const btnOutlineRed = {
  border: `1.5px solid ${C.red}`, borderRadius: 10,
  background: C.white, color: C.red,
  fontWeight: 600, cursor: "pointer",
};

export const inputStyle = {
  width: "100%", border: `1px solid ${C.border}`,
  borderRadius: 10, padding: "10px 14px",
  fontSize: FS.base, outline: "none",
  boxSizing: "border-box", background: C.white, color: C.primary,
};

export const labelStyle = {
  fontSize: FS.sm, color: C.muted,
  marginBottom: 6, display: "block", fontWeight: 500,
};
