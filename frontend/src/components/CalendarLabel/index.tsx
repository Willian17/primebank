import { addLocale } from "primereact/api";
import { Calendar, CalendarPropsRange } from "primereact/calendar";

interface Props extends CalendarPropsRange {
  label: string;
}

export default function CalendarLabel({ label, ...props }: Props) {
  addLocale("pt", {
    firstDayOfWeek: 1,
    dayNames: [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    today: "Hoje",
    clear: "Limpar",
  });
  return (
    <div className="p-field flex flex-col">
      <label htmlFor={props.id}>{label}</label>
      <Calendar name={props.id} locale="pt" {...props} />
    </div>
  );
}
