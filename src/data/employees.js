export const ACTIVE_EMPLOYEES = [
  { initials:"RK", name:"Ravi Kumar",    email:"ravi.kumar@sigma.com",
    id:"EMP001", joining:"2021-06-01", status:"Approved",
    bank:"HDFC – XXXX1234",  salary:"₹85,000", remark:"—",
    beneficiaryStatus:"Added" },
  { initials:"PS", name:"Priya Sharma",  email:"priya.sharma@sigma.com",
    id:"EMP002", joining:"2022-03-15", status:"Pending Verification",
    bank:"ICICI – XXXX5678", salary:"₹62,000", remark:"Awaiting bank verification",
    beneficiaryStatus:"Pending" },
  { initials:"AM", name:"Anjali Mehta",  email:"anjali.mehta@sigma.com",
    id:"EMP003", joining:"2020-11-20", status:"Missing Information",
    bank:"—", salary:"₹74,000", remark:"Missing: PAN details",
    beneficiaryStatus:"Failed" },
  { initials:"SP", name:"Suresh Pillai", email:"suresh.pillai@sigma.com",
    id:"EMP004", joining:"2019-08-05", status:"Approved",
    bank:"HDFC – XXXX3456",  salary:"₹91,000", remark:"—",
    beneficiaryStatus:"Added" },
  { initials:"NJ", name:"Neha Joshi",    email:"neha.joshi@sigma.com",
    id:"EMP005", joining:"2023-01-10", status:"Missing Information",
    bank:"—", salary:"₹55,000", remark:"Missing: Bank Name, IFSC",
    beneficiaryStatus:"Failed" },
];

export const PAST_EMPLOYEES = [
  { initials:"AK", name:"Arjun Kapoor", email:"arjun.k@sigma.com",
    id:"EMP098", joining:"2018-04-01", offboarding:"2023-12-31",
    salary:"₹78,000", remark:"Resigned" },
  { initials:"SM", name:"Sunita Menon", email:"sunita.m@sigma.com",
    id:"EMP075", joining:"2017-09-15", offboarding:"2024-03-31",
    salary:"₹65,000", remark:"Contract ended" },
];

export const SALARY_BREAKUP = {
  EMP098: { gross:"₹78,000", basic:"₹46,800", hra:"₹18,720",
            allowances:"₹12,480", pf:"₹5,616", esi:"₹1,365",
            tds:"₹3,900", net:"₹67,119" },
  EMP075: { gross:"₹65,000", basic:"₹39,000", hra:"₹15,600",
            allowances:"₹10,400", pf:"₹4,680", esi:"₹1,138",
            tds:"₹2,600", net:"₹56,582" },
};

export const BENEFICIARY_STATUS_OPTIONS = ["Added", "Pending", "Failed"];

export const BENEFICIARY_STATUS_STYLE = {
  Added:   { bg:"#F0FFF4", color:"#276749" },
  Pending: { bg:"#FFF7ED", color:"#C2410C" },
  Failed:  { bg:"#FFF0F0", color:"#FF4F4F" },
};

export const STATUS_STYLE = {
  "Approved":             { bg:"#F0FFF4", color:"#276749" },
  "Pending Verification": { bg:"#FFF7ED", color:"#C2410C" },
  "Missing Information":  { bg:"#FFF0F0", color:"#FF4F4F" },
};
