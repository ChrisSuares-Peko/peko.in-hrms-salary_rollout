export const REPORT_CARDS = [
  { key:"epfo", title:"EPFO", icon:"📋", color:"#4338CA", bg:"#EEF2FF",
    desc:"Employee Provident Fund contributions" },
  { key:"lwf",  title:"LWF",  icon:"🏛️", color:"#276749", bg:"#F0FFF4",
    desc:"Labour Welfare Fund deductions" },
  { key:"pt",   title:"PT",   icon:"💼", color:"#C2410C", bg:"#FFF7ED",
    desc:"Professional Tax deductions" },
];

export const REPORT_DATA = {
  epfo: [
    { id:"EMP001", name:"Ravi Kumar",    uan:"100123456789", gross:"₹85,000", employer:"₹10,200", employee:"₹10,200", total:"₹20,400", month:"Mar 2026", status:"Generated" },
    { id:"EMP002", name:"Priya Sharma",  uan:"100234567890", gross:"₹62,000", employer:"₹7,440",  employee:"₹7,440",  total:"₹14,880", month:"Mar 2026", status:"Generated" },
    { id:"EMP003", name:"Anjali Mehta",  uan:"100345678901", gross:"₹74,000", employer:"₹8,880",  employee:"₹8,880",  total:"₹17,760", month:"Mar 2026", status:"Pending"   },
    { id:"EMP004", name:"Suresh Pillai", uan:"100456789012", gross:"₹91,000", employer:"₹10,920", employee:"₹10,920", total:"₹21,840", month:"Mar 2026", status:"Generated" },
    { id:"EMP005", name:"Neha Joshi",    uan:"100567890123", gross:"₹55,000", employer:"₹6,600",  employee:"₹6,600",  total:"₹13,200", month:"Mar 2026", status:"Pending"   },
  ],
  lwf: [
    { id:"EMP001", name:"Ravi Kumar",    state:"Maharashtra", gross:"₹85,000", employee:"₹25", employer:"₹75", total:"₹100", month:"Mar 2026", status:"Generated" },
    { id:"EMP002", name:"Priya Sharma",  state:"Karnataka",   gross:"₹62,000", employee:"₹20", employer:"₹60", total:"₹80",  month:"Mar 2026", status:"Generated" },
    { id:"EMP003", name:"Anjali Mehta",  state:"Maharashtra", gross:"₹74,000", employee:"₹25", employer:"₹75", total:"₹100", month:"Mar 2026", status:"Pending"   },
    { id:"EMP004", name:"Suresh Pillai", state:"Delhi",       gross:"₹91,000", employee:"₹30", employer:"₹90", total:"₹120", month:"Mar 2026", status:"Generated" },
    { id:"EMP005", name:"Neha Joshi",    state:"Karnataka",   gross:"₹55,000", employee:"₹20", employer:"₹60", total:"₹80",  month:"Mar 2026", status:"Pending"   },
  ],
  pt: [
    { id:"EMP001", name:"Ravi Kumar",    state:"Maharashtra", gross:"₹85,000", pt:"₹2,500", month:"Mar 2026", status:"Generated" },
    { id:"EMP002", name:"Priya Sharma",  state:"Karnataka",   gross:"₹62,000", pt:"₹2,000", month:"Mar 2026", status:"Generated" },
    { id:"EMP003", name:"Anjali Mehta",  state:"Maharashtra", gross:"₹74,000", pt:"₹2,500", month:"Mar 2026", status:"Pending"   },
    { id:"EMP004", name:"Suresh Pillai", state:"Delhi",       gross:"₹91,000", pt:"₹2,500", month:"Mar 2026", status:"Generated" },
    { id:"EMP005", name:"Neha Joshi",    state:"Karnataka",   gross:"₹55,000", pt:"₹1,250", month:"Mar 2026", status:"Pending"   },
  ],
};

export const REPORT_COLS = {
  epfo: ["Employee ID","Employee Name","UAN","Gross Salary","Employer PF","Employee PF","Total PF","Month","Status"],
  lwf:  ["Employee ID","Employee Name","State","Gross Salary","Employee LWF","Employer LWF","Total LWF","Month","Status"],
  pt:   ["Employee ID","Employee Name","State","Gross Salary","PT Deduction","Month","Status"],
};

export const REPORT_STATUS_STYLE = {
  Generated: { bg:"#F0FFF4", color:"#276749" },
  Pending:   { bg:"#FFF7ED", color:"#C2410C" },
};

export const PROCESS_MONTHS = [
  "Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026"
];
