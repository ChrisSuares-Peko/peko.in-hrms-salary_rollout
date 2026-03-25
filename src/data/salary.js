export const SALARY_ROWS = [
  { id:"EMP001", name:"Ravi Kumar",    bank:"HDFC – XXXX1234",
    salary:"₹85,000", deductions:"₹12,750", total:"₹72,250",
    remark:"Account Verified",             status:"Unpaid" },
  { id:"EMP002", name:"Priya Sharma",  bank:"ICICI – XXXX5678",
    salary:"₹62,000", deductions:"₹9,300",  total:"₹52,700",
    remark:"Account Verification Pending", status:"Unpaid" },
  { id:"EMP003", name:"Anjali Mehta",  bank:"SBI – XXXX9012",
    salary:"₹74,000", deductions:"₹11,100", total:"₹62,900",
    remark:"Account Verified",             status:"Unpaid" },
  { id:"EMP004", name:"Suresh Pillai", bank:"HDFC – XXXX3456",
    salary:"₹91,000", deductions:"₹13,650", total:"₹77,350",
    remark:"Account Verified",             status:"Unpaid" },
  { id:"EMP005", name:"Neha Joshi",    bank:"ICICI – XXXX7890",
    salary:"₹55,000", deductions:"₹8,250",  total:"₹46,750",
    remark:"Account Verification Pending", status:"Unpaid" },
];

export const PROCESS_MONTHS = [
  "Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026"
];

export const HISTORY_DATA = {
  2026: [
    { month:"January 2026",  employees:5, salaries:5, total:"₹3,11,200", status:"Completed"   },
    { month:"February 2026", employees:5, salaries:5, total:"₹3,11,200", status:"Completed"   },
    { month:"March 2026",    employees:5, salaries:4, total:"₹2,65,200", status:"In Progress" },
  ],
  2025: [
    { month:"January 2025",   employees:4, salaries:4, total:"₹2,72,000", status:"Completed" },
    { month:"February 2025",  employees:4, salaries:4, total:"₹2,72,000", status:"Completed" },
    { month:"March 2025",     employees:4, salaries:3, total:"₹2,20,000", status:"Completed" },
    { month:"April 2025",     employees:5, salaries:5, total:"₹3,05,000", status:"Completed" },
    { month:"May 2025",       employees:5, salaries:5, total:"₹3,05,000", status:"Completed" },
    { month:"June 2025",      employees:5, salaries:4, total:"₹2,59,000", status:"Completed" },
    { month:"July 2025",      employees:5, salaries:5, total:"₹3,11,200", status:"Completed" },
    { month:"August 2025",    employees:5, salaries:5, total:"₹3,11,200", status:"Completed" },
    { month:"September 2025", employees:5, salaries:5, total:"₹3,11,200", status:"Completed" },
    { month:"October 2025",   employees:5, salaries:5, total:"₹3,11,200", status:"Completed" },
    { month:"November 2025",  employees:5, salaries:5, total:"₹3,11,200", status:"Failed"    },
    { month:"December 2025",  employees:5, salaries:5, total:"₹3,11,200", status:"Completed" },
  ],
};

export const HISTORY_DETAIL = [
  { id:"EMP001", name:"Ravi Kumar",    bank:"HDFC – XXXX1234",
    gross:"₹85,000", deductions:"₹12,750", total:"₹72,250", remark:"—",       status:"Paid"    },
  { id:"EMP002", name:"Priya Sharma",  bank:"ICICI – XXXX5678",
    gross:"₹62,000", deductions:"₹9,300",  total:"₹52,700", remark:"Pending", status:"Pending" },
  { id:"EMP003", name:"Anjali Mehta",  bank:"SBI – XXXX9012",
    gross:"₹74,000", deductions:"₹11,100", total:"₹62,900", remark:"—",       status:"Paid"    },
  { id:"EMP004", name:"Suresh Pillai", bank:"HDFC – XXXX3456",
    gross:"₹91,000", deductions:"₹13,650", total:"₹77,350", remark:"—",       status:"Paid"    },
  { id:"EMP005", name:"Neha Joshi",    bank:"ICICI – XXXX7890",
    gross:"₹55,000", deductions:"₹8,250",  total:"₹46,750", remark:"Pending", status:"Pending" },
];

export const STATS_MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

export const STATS_DATA = {
  2026: [
    { id:"EMP001", name:"Ravi Kumar",    vals:["₹72,250","₹72,250","₹72,250","","","","","","","","",""] },
    { id:"EMP002", name:"Priya Sharma",  vals:["₹52,700","₹52,700","₹52,700","","","","","","","","",""] },
    { id:"EMP003", name:"Anjali Mehta",  vals:["₹62,900","₹62,900","","","","","","","","","",""]        },
    { id:"EMP004", name:"Suresh Pillai", vals:["₹77,350","₹77,350","₹77,350","","","","","","","","",""] },
    { id:"EMP005", name:"Neha Joshi",    vals:["₹46,750","₹46,750","₹46,750","","","","","","","","",""] },
  ],
  2025: [
    { id:"EMP001", name:"Ravi Kumar",    vals:["₹70,000","₹70,000","₹70,000","₹70,000","₹70,000","₹70,000","₹72,250","₹72,250","₹72,250","₹72,250","₹72,250","₹72,250"] },
    { id:"EMP002", name:"Priya Sharma",  vals:["₹50,000","₹50,000","₹50,000","₹50,000","₹50,000","₹50,000","₹52,700","₹52,700","₹52,700","₹52,700","₹52,700","₹52,700"] },
    { id:"EMP003", name:"Anjali Mehta",  vals:["₹60,000","₹60,000","₹60,000","₹60,000","₹60,000","₹60,000","₹62,900","₹62,900","₹62,900","₹62,900","₹62,900","₹62,900"] },
    { id:"EMP004", name:"Suresh Pillai", vals:["₹75,000","₹75,000","₹75,000","₹75,000","₹75,000","₹75,000","₹77,350","₹77,350","₹77,350","₹77,350","₹77,350","₹77,350"] },
    { id:"EMP005", name:"Neha Joshi",    vals:["₹45,000","₹45,000","₹45,000","₹45,000","₹45,000","₹45,000","₹46,750","₹46,750","₹46,750","₹46,750","₹46,750","₹46,750"] },
  ],
};

export const PAYROLL_COSTS = {
  2026: [367000,367000,391000,0,0,0,0,0,0,0,0,0],
  2025: [352000,352000,360000,360000,368000,368000,372000,372000,376000,376000,380000,384000],
  2024: [320000,320000,330000,330000,336000,336000,340000,340000,344000,348000,350000,352000],
};

export const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const BANK_ACCOUNTS_DROPDOWN = [
  { id:"b1", label:"HDFC – XXXX1234",  balance:"₹12,40,000" },
  { id:"b2", label:"ICICI – XXXX5678", balance:"₹8,75,500"  },
  { id:"b3", label:"SBI – XXXX9012",   balance:"₹3,20,000"  },
];

export const SALARY_MONTHS_LIST = [
  "2026-04","2026-03","2026-02","2026-01","2025-12","2025-11"
];
