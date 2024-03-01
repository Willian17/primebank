import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import api from "../../../config/api";
import { useEffect, useRef, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { FaRegTrashCan } from "react-icons/fa6";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import BankAccountListDto from "./dtos/BankAccountListDto";

export default function Table() {
  const [bankAccounts, setBankAccounts] = useState<BankAccountListDto[]>([]);
  const toast = useRef<any>(null);

  useEffect(() => {
    getBankAccounts();
  }, []);

  async function getBankAccounts() {
    const response = await api.get("/bank-account");
    setBankAccounts(response.data);
  }

  function bodyAccountMask(bankAccount: BankAccountListDto) {
    return bankAccount.conta.replace(/(\d{7})(\d{1})/, "$1-$2");
  }

  function bodyStatusTemplate(bankAccount: BankAccountListDto) {
    return (
      <InputSwitch
        checked={bankAccount.ativo}
        onChange={(e) => handleChangeStatus(bankAccount)}
      />
    );
  }

  async function handleChangeStatus(bankAccount: BankAccountListDto) {
    await api.patch(`/bank-account/status/${bankAccount.id}`, {
      ativo: !bankAccount.ativo,
    });
    await getBankAccounts();
  }

  function confirmDialogDelete(bankAccount: BankAccountListDto) {
    confirmDialog({
      message: "Voce tem certeza que deseja excluir esta conta bancária?",
      header: "Confirmação",
      icon: "pi pi-info-circle",
      defaultFocus: "accept",
      acceptClassName: "p-button-danger",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => {
        handleDeleteBankAccount(bankAccount);
      },
    });
  }

  async function handleDeleteBankAccount(bankAccount: BankAccountListDto) {
    await api.delete(`/bank-account/${bankAccount.id}`);
    showSuccessToast("Conta excluída com sucesso");
    await getBankAccounts();
  }

  function showSuccessToast(message: string) {
    toast.current &&
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: message,
        life: 3000,
      });
  }

  function bodyActionTemplate(bankAccount: BankAccountListDto) {
    return (
      <Button
        onClick={() => confirmDialogDelete(bankAccount)}
        className="p-button-danger"
        disabled={bankAccount.transacoes.length > 0}
        tooltip="Excluir"
        tooltipOptions={{ position: "bottom" }}
      >
        <FaRegTrashCan size={18} />
      </Button>
    );
  }

  return (
    <>
      <DataTable value={bankAccounts}>
        <Column field="cliente.nome" header="Nome cliente"></Column>
        <Column field="banco" header="Banco"></Column>
        <Column field="agencia" header="Agencia"></Column>
        <Column header="Conta" body={bodyAccountMask}></Column>
        <Column header="Status" body={bodyStatusTemplate}></Column>
        <Column header="Ações" body={bodyActionTemplate}></Column>
      </DataTable>

      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  );
}
