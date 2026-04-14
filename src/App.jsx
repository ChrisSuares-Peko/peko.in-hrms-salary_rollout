import { useState } from "react";
import LandingPage           from "./pages/LandingPage";
import SetupPage             from "./pages/SetupPage";
import AccountSetupPage      from "./pages/AccountSetupPage";
import DashboardPage         from "./pages/DashboardPage";
import EmployeesPage         from "./pages/EmployeesPage";
import ProcessSalaryPage     from "./pages/ProcessSalaryPage";
import SalaryHistoryPage     from "./pages/SalaryHistoryPage";
import SalaryStatsPage       from "./pages/SalaryStatsPage";
import ManageBanksPage       from "./pages/ManageBanksPage";
import GenerateReportsPage   from "./pages/GenerateReportsPage";
import PageNavigator         from "./components/PageNavigator";
import DummyModeToggle       from "./components/DummyModeToggle";

export default function App() {
  const [page, setPage]           = useState("landing");
  const [dummyMode, setDummyMode] = useState(false);

  return (
    <>
      {page === "landing"   && <LandingPage         dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "setup"     && <SetupPage           dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "dashboard" && <DashboardPage       dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "employees" && <EmployeesPage       dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "process"   && <ProcessSalaryPage   dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "history"   && <SalaryHistoryPage   dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "stats"     && <SalaryStatsPage     dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "banks"     && <ManageBanksPage     dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "reports"   && <GenerateReportsPage dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "account-setup-bank"    && <AccountSetupPage type="bank"    dummyMode={dummyMode} onNavigate={setPage} />}
      {page === "account-setup-virtual" && <AccountSetupPage type="virtual" dummyMode={dummyMode} onNavigate={setPage} />}

      <PageNavigator   currentPage={page} onNavigate={setPage} />
      <DummyModeToggle dummyMode={dummyMode} onToggle={() => setDummyMode(m => !m)} />
    </>
  );
}
