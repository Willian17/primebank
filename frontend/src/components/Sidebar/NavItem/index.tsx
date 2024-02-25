import { Button } from "primereact/button";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";

interface Props {
  to: string;
  icon: React.ReactNode;
  tooltip: string;
}

export default function NavItem({ to, icon, tooltip }: Props) {
  function isCurrentPage(router: string) {
    return window.location.pathname === router;
  }

  return (
    <NavLink to={to}>
      <Button
        className="p-button-text p-button-icon-only"
        raised={isCurrentPage(to)}
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
