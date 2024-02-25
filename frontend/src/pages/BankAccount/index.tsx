import { Button } from "primereact/button";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

export default function BankAccount() {
  const navigate = useNavigate();
  function handleNavigateCreateBankAccount() {
    navigate("/contas-bancarias/cadastro");
  }
  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold">Contas bancárias</h1>
      <div className="flex justify-end mb-4 rounded-lg">
        <Button
          label="Cadastrar"
          className="px-6"
          onClick={handleNavigateCreateBankAccount}
        />
      </div>

      <Table />
    </div>
  );
}
