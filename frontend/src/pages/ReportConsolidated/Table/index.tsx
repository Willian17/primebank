import api from "../../../config/api";
import React, { useEffect, useState } from "react";
import { ReportConsolidatedDto } from "./dtos/ReportConsolidatedDto";
import "./styles.css";

export default function Table({ group }: { group: string }) {
  const [bankAccounts, setBankAccounts] = useState<ReportConsolidatedDto[]>([]);

  useEffect(() => {
    getBankAccounts();
    // eslint-disable-next-line
  }, [group]);

  async function getBankAccounts() {
    const response = await api.get("/bank-account/report-consolidated", {
      params: {
        group: group,
      },
    });
    setBankAccounts(response.data);
  }

  function bodyAccountMask(conta: string) {
    return conta.replace(/(\d{7})(\d{1})/, "$1-$2");
  }

  return (
    <div className="mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-gray-200">
            <tr>
              <th>Nome Cliente</th>
              <th>Banco</th>
              <th>Conta</th>
              <th>Saldo Anterior</th>
              <th>Total Débito</th>
              <th>Total Crédito</th>
              <th>Saldo Final</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((report, index) => (
              <React.Fragment key={index}>
                {report.contasBancarias.map((account, accountIndex) => (
                  <tr key={accountIndex}>
                    <td>{account.nomeCliente}</td>
                    <td>{account.banco}</td>
                    <td>{bodyAccountMask(account.conta)}</td>
                    <td
                      className={
                        account.saldoAnterior < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      R${account.saldoAnterior}
                    </td>
                    <td className="text-red-600">R${account.totalDebito}</td>
                    <td className="text-green-600">R${account.totalCredito}</td>
                    <td
                      className={
                        account.saldoFinal < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      R${account.saldoFinal}
                    </td>
                  </tr>
                ))}
                <tr className="row-total">
                  <td className="p-6 font-semibold" colSpan={3}>
                    Total
                  </td>
                  <td
                    className={
                      report.saldoAnterior < 0
                        ? "p-6 font-semibold text-red-600"
                        : "p-6 font-semibold text-green-600"
                    }
                  >
                    R${report.saldoAnterior}
                  </td>
                  <td className={"p-6 font-semibold text-red-600"}>
                    R${report.totalDebito}
                  </td>
                  <td className={"p-6 font-semibold text-green-600"}>
                    R${report.totalCredito}
                  </td>
                  <td
                    className={
                      report.saldoFinal < 0
                        ? "p-6 font-semibold text-red-600"
                        : "p-6 font-semibold text-green-600"
                    }
                  >
                    R${report.saldoFinal}
                  </td>
                </tr>
                <tr></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
