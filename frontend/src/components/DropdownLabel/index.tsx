import { Dropdown, DropdownProps } from "primereact/dropdown";

interface Props extends DropdownProps {
  label: string;
}

export default function DropdownLabel({ label, ...props }: Props) {
  return (
    <div className="p-field flex flex-col">
      <label htmlFor={props.id}>{label}</label>
      <Dropdown {...props} name={props.id} />
    </div>
  );
}
