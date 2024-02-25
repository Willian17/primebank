import { Button } from "primereact/button";
import {
  FaBuildingColumns,
  FaChartSimple,
  FaMoneyBillTransfer,
  FaReceipt,
  FaUser,
} from "react-icons/fa6";
import NavItem from "./NavItem";

export function Sidebar() {
  return (
    <menu className="flex flex-col items-center p-4 ">
      <Button
        className="p-button-rounded mb-10"
        icon={<FaBuildingColumns size={25} color="#fff" />}
        tooltip="PrimeBank"
        tooltipOptions={{ position: "bottom" }}
      />

      <div className="flex flex-col gap-4">
        <NavItem
          to="/contas-bancarias"
          icon={<FaUser />}
          tooltip="Contas Bancárias"
        />
        <NavItem
          to="/transacoes"
          icon={<FaMoneyBillTransfer />}
          tooltip="Transações"
        />
        <NavItem
          to="/relatorio-consolidado"
          icon={<FaChartSimple />}
          tooltip="Relatório Consolidado"
        />
        <NavItem
          to="/extrato-conta-bancaria"
          icon={<FaReceipt />}
          tooltip="Extrato"
        />
      </div>
    </menu>
  );
}

export default Sidebar;
