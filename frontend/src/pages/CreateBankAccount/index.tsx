import { useState, useRef } from "react";
import { Button } from "primereact/button";
import api from "../../config/api";
import InputTextLabel from "../../components/InputTextLabel";
import InputMaskLabel from "../../components/InputMaskLabel";
import InputNumberLabel from "../../components/InputNumberLabel";
import DropdownLabel from "../../components/DropdownLabel";
import { Toast } from "primereact/toast";
import { optionsBanco } from "./data/optionsBanco";
import { useNavigate } from "react-router-dom";

export default function CreateBankAccount() {
  const [formData, setFormData] = useState({
    nomeCliente: "",
    cpfCliente: "",
    conta: "",
    agencia: "",
    banco: null,
    saldo: 0,
  });
  const [bancos] = useState(optionsBanco);
  const toast = useRef<any>(null);
  const navigate = useNavigate();

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
      banco: e.value,
    }));
  }

  async function handleSubmit() {
    try {
      await api.post("/bank-account", formData);
      navigate("/contas-bancarias");
    } catch (error: any) {
      const message =
        error.response.data.message || "Erro ao criar conta bancária";

      if (Array.isArray(message)) {
        message.forEach((msg: string) => {
          showErrorToast(msg);
        });
        return;
      }

      showErrorToast(message);
    }
  }

  function showErrorToast(message: string) {
    toast.current.show({ severity: "error", summary: "Erro", detail: message });
  }

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold mb-4">Criar Conta bancária</h1>
      <div className="grid grid-cols-2 gap-4">
        <InputTextLabel
          label="Nome do Cliente"
          value={formData.nomeCliente}
          id="nomeCliente"
          onChange={handleChange}
          required
        />
        <InputMaskLabel
          label="CPF do cliente"
          id="cpfCliente"
          onChange={handleChange}
          value={formData.cpfCliente}
          mask="999.999.999-99"
          required
        />
        <InputMaskLabel
          label="Agencia"
          id="agencia"
          onChange={handleChange}
          value={formData.agencia}
          mask="9999"
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
          id="banco"
          label="Banco"
          value={formData.banco}
          options={bancos}
          optionLabel="label"
          onChange={handleDropdownChange}
          placeholder="Selecione o Banco"
          required
        />
        <InputNumberLabel
          label="Saldo Inicial"
          id="saldoicial"
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          value={formData.saldo}
          onValueChange={handleChange}
          required
        />
      </div>
      <Button label="Cadastrar" className="mt-4 px-6" onClick={handleSubmit} />

      <Toast ref={toast} />
    </div>
  );
}
