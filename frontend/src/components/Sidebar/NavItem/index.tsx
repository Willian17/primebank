import { Button } from "primereact/button";
import { IconContext } from "react-icons";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  to: string;
  icon: React.ReactNode;
  tooltip: string;
}

export default function NavItem({ to, icon, tooltip }: Props) {
  const location = useLocation();

  function isMenuActived() {
    return location.pathname === to;
  }
  return (
    <NavLink to={to}>
      <Button
        raised={isMenuActived()}
        className={"p-button-text p-button-icon-only"}
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
