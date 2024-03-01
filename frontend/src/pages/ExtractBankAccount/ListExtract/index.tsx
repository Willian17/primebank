import { ListExtractsDto } from "../dtos/ListExtractsDto";
import { Tag } from "primereact/tag";
import { DataView } from "primereact/dataview";
import { TypeTransactionEnum } from "../../Transaction/enum/TypeTransactionEnum";
import moment from "moment";
import "moment/locale/pt-br";

export default function ListExtract({
  extracts,
}: {
  extracts: ListExtractsDto[];
}) {
  function calculateSaldoFinal() {
    const lastExtract = extracts[extracts.length - 1];
    const isCredito = lastExtract.tipo === TypeTransactionEnum.CREDITO;
    const saldoFinal: number = isCredito
      ? +lastExtract.saldoAnterior + +lastExtract.valor
      : +lastExtract.saldoAnterior - +lastExtract.valor;
    return saldoFinal.toFixed(2);
  }
  function getSeverity(tipo: TypeTransactionEnum) {
    switch (tipo) {
      case TypeTransactionEnum.DEBITO:
        return "danger";

      case TypeTransactionEnum.CREDITO:
        return "success";

      default:
        return null;
    }
  }

  function itemTemplate(extract: ListExtractsDto) {
    return (
      <div
        className="col-12 flex p-6 border border-surface-300"
        key={extract.id}
      >
        <div className="flex flex-col justify-center font-semibold mr-2">
          <span className="text-xl">
            {moment(extract.data).locale("pt-br").format("DD")}
          </span>
          <span className="text-xl">
            {moment(extract.data).locale("pt-br").format("MMM")}
          </span>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col a">
            <p className="text-2xl font-bold text-900 max-w-md text-overflow-ellipsis overflow-hidden whitespace-nowrap">
              {extract.nomeCliente}
            </p>
            <span>{moment(extract.data).locale("pt-br").format("HH:mm")}h</span>
            <span>Saldo Anterior: R${extract.saldoAnterior}</span>
          </div>
          <div className="flex flex-col w-36">
            <span className="text-2xl font-semibold">R${extract.valor}</span>
            <div className="max-h-15">
              <Tag
                value={extract.tipo}
                severity={getSeverity(extract.tipo)}
              ></Tag>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {extracts.length > 0 && (
        <>
          <div className="mt-6">
            <span className="text-2xl">
              Saldo anterior:{" "}
              <span className="font-bold">R${extracts[0].saldoAnterior}</span>
            </span>
            <span className="ml-4 text-2xl">
              Saldo final:{" "}
              <span className="font-bold">R${calculateSaldoFinal()}</span>
            </span>
          </div>
          <DataView
            value={extracts}
            layout="list"
            itemTemplate={itemTemplate}
          />
        </>
      )}
    </>
  );
}
