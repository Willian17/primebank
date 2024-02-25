import { InputMask, InputMaskProps } from "primereact/inputmask";

interface Props extends InputMaskProps {
  label: string;
}

export default function InputMaskLabel({ label, ...props }: Props) {
  return (
    <div className="p-field flex flex-col">
      <label htmlFor={props.id}>{label}</label>
      <InputMask {...props} name={props.id} unmask={true} />
    </div>
  );
}
