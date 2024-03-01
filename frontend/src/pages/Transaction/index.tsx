import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FormEvent, useRef, useState } from "react";
import api from "../../config/api";
import InputMaskLabel from "../../components/InputMaskLabel";
import DropdownLabel from "../../components/DropdownLabel";
import InputNumberLabel from "../../components/InputNumberLabel";
import { SelectItem } from "primereact/selectitem";
import { TypeTransactionEnum } from "./enum/TypeTransactionEnum";
import InputTextLabel from "../../components/InputTextLabel";

export default function Transaction() {
  const [formData, setFormData] = useState({
    conta: "",
    agencia: "",
    tipo: null,
    valor: 0,
  });
  const [tiposTransacao] = useState<SelectItem[]>([
    {
      label: "Crédito",
      value: TypeTransactionEnum.CREDITO,
    },
    {
      label: "Débito",
      value: TypeTransactionEnum.DEBITO,
    },
  ]);
  const toast = useRef<any>(null);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleDropdownChange(e: any) {
    setFormData((prevData) => ({
      ...prevData,
      tipo: e.value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await api.post("/transaction", formData);
      showSucessToast("Transação realizada com sucesso");
      clearFormData();
    } catch (error: any) {
      const message =
        error.response.data.message || "Erro ao realizar transação";

      if (Array.isArray(message)) {
        message.forEach((msg: string) => {
          showErrorToast(msg);
        });
        return;
      }

      showErrorToast(message);
    }
  }

  function clearFormData() {
    setFormData({
      conta: "",
      agencia: "",
      tipo: null,
      valor: 0,
    });
  }

  function showErrorToast(message: string) {
    toast.current.show({ severity: "error", summary: "Erro", detail: message });
  }
  function showSucessToast(message: string) {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
    });
  }

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold mb-4">Realizar transação</h1>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <InputTextLabel
          label="Agencia"
          id="agencia"
          onChange={handleChange}
          value={formData.agencia}
          maxLength={4}
          minLength={3}
          required
        />
        <InputMaskLabel
          label="Número da Conta"
          id="conta"
          onChange={handleChange}
          value={formData.conta}
          mask="9999999-9"
          required
        />
        <DropdownLabel
          id="tipo"
          label="Tipo"
          value={formData.tipo}
          options={tiposTransacao}
          optionLabel="label"
          onChange={handleDropdownChange}
          placeholder="Selecione o tipo da transacao"
          required
        />
        <InputNumberLabel
          label="Valor"
          id="valor"
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          value={formData.valor}
          onValueChange={handleChange}
          required
        />
        <Button type="submit" label="Cadastrar" className="mt-4 px-6" />
      </form>

      <Toast ref={toast} />
    </div>
  );
}
