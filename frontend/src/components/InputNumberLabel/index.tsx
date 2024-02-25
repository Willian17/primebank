import { InputNumber, InputNumberProps } from "primereact/inputnumber";

interface Props extends InputNumberProps {
  label: string;
}

export default function InputNumberLabel({ label, ...props }: Props) {
  return (
    <div className="p-field flex flex-col">
      <label htmlFor={props.id}>{label}</label>
      <InputNumber {...props} name={props.id} />
    </div>
  );
}
