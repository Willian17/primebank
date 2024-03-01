import { Button } from "primereact/button";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: React.ReactNode;
  tooltip: string;
}

export default function NavItem({ to, icon, tooltip }: Props) {
  return (
    <NavLink to={to}>
      <Button
        className="p-button-text p-button-icon-only"
        icon={
          <IconContext.Provider value={{ size: "25", color: "#5D7285" }}>
            {icon}
          </IconContext.Provider>
        }
        tooltip={tooltip}
        tooltipOptions={{ position: "bottom" }}
      />
    </NavLink>
  );
}
