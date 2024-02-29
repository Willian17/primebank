import { Navigate, Route, Routes } from "react-router-dom";
import BankAccount from "../pages/BankAccount";
import CreateBankAccount from "../pages/CreateBankAccount";
import Transaction from "../pages/Transaction";
import ReportConsolidated from "../pages/ReportConsolidated";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contas-bancarias" />} />
      <Route path="*" element={<Navigate to="/contas-bancarias" />} />
      <Route path="/contas-bancarias" element={<BankAccount />} />
      <Route
        path="/contas-bancarias/cadastro"
        element={<CreateBankAccount />}
      />
      <Route path="/transacao" element={<Transaction />} />
      <Route path="/relatorio-consolidado" element={<ReportConsolidated />} />
    </Routes>
  );
}
