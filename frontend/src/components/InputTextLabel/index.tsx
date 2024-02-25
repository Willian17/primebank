import { InputText, InputTextProps } from "primereact/inputtext";

interface Props extends InputTextProps {
  label: string;
}

export default function InputTextLabel({ label, ...props }: Props) {
  return (
    <div className="p-field flex flex-col">
      <label htmlFor={props.id}>{label}</label>
      <InputText {...props} name={props.id} />
    </div>
  );
}
