import { FormEvent, useRef, useState } from "react";
import InputTextLabel from "../../components/InputTextLabel";
import InputMaskLabel from "../../components/InputMaskLabel";
import { Button } from "primereact/button";
import CalendarLabel from "../../components/CalendarLabel";
import { Nullable } from "primereact/ts-helpers";
import api from "../../config/api";
import { ListExtractsDto } from "./dtos/ListExtractsDto";
import ListExtract from "./ListExtract";
import { Toast } from "primereact/toast";

export default function ExtractBankAccount() {
  const [formData, setFormData] = useState({
    conta: "",
    agencia: "",
  });
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

  const [extracts, setExtracts] = useState<ListExtractsDto[]>([]);

  const toast = useRef<any>(null);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const [dataInicial, dataFinal] = dates || [];

    try {
      const response = await api.get(
        `/transaction/extract/${formData.agencia}/${formData.conta}`,
        {
          params: {
            dataInicial: dataInicial?.toISOString()?.split("T")[0],
            dataFinal: dataFinal?.toISOString()?.split("T")[0],
          },
        }
      );
      setExtracts(response.data);
    } catch (error: any) {
      const message =
        error.response.data.message || "Erro ao consultar extrato";

      showErrorToast(message);
    }
  }

  function showErrorToast(message: string) {
    toast.current.show({ severity: "error", summary: "Erro", detail: message });
  }

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold">Extrato conta bancária</h1>

      <form className="grid grid-cols-2 gap-4 my-4" onSubmit={handleSearch}>
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

        <CalendarLabel
          label="Período"
          value={dates}
          onChange={(e) => setDates(e.value)}
          selectionMode="range"
          dateFormat="dd/mm/yy"
          readOnlyInput
        />

        <Button
          type="submit"
          label="Buscar"
          className="mt-4 px-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
        />
      </form>

      <ListExtract extracts={extracts} />

      <Toast ref={toast} />
    </div>
  );
}
