import Table from "./Table";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { SelectItem } from "primereact/selectitem";

export default function ReportConsolidated() {
  const [groupOptions] = useState<SelectItem[]>([
    {
      label: "Banco",
      value: "BANCO",
    },
    {
      label: "Cliente",
      value: "CLIENTE",
    },
    {
      label: "Número da conta",
      value: "CONTA",
    },
  ]);
  const [group, setGroup] = useState(groupOptions[0].value);

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold">Relatório consolidado</h1>
      <div className="flex justify-end mb-4 rounded-lg">
        <div className="flex flex-col">
          <span className="mr-2">Agrupar por:</span>
          <Dropdown
            value={group}
            options={groupOptions}
            onChange={(e) => setGroup(e.value)}
            placeholder="Selecione um grupo"
            className="min-w-52"
          />
        </div>
      </div>
      <Table group={group} />
    </div>
  );
}
