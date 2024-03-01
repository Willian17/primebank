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
          className="px-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          onClick={handleNavigateCreateBankAccount}
        />
      </div>

      <Table />
    </div>
  );
}
