import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderDown, Radio, ChartLine, ServerCog } from "lucide-react";
import { JSX } from "react";
import { DesktopBar } from "./DesktopBar";
import { MobileBar } from "./MobileBar";

export default function Sidebar() {
  return (
    <aside>
      <MobileBar />
      <DesktopBar />
    </aside>
  );
}

/**
 * Navigation links component that optionally accepts an `onClick` handler.
 *
 * @param {Object} props
 * @param {(() => void)?} [props.onClick] - Optional function to run when a link is clicked.
 * @returns {JSX.Element}
 */
export function NavLinks({ onClick }: { onClick?: () => void }): JSX.Element {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded text-xl hover:bg-blue-100 ${isActive ? "bg-blue-200 font-semibold" : ""
    }`;

  return (
    <nav className="space-y-2">
      <NavLink to="/" end className={navItemClass} onClick={onClick}>
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </NavLink>
      <NavLink to="/visualizer" className={navItemClass} onClick={onClick}>
        <ChartLine className="w-5 h-5" />
        Visualizer
      </NavLink>
      <NavLink to="/services" className={navItemClass} onClick={onClick}>
        <ServerCog className="w-5 h-5" />
        Services
      </NavLink>
      <NavLink to="/recordings" className={navItemClass} onClick={onClick}>
        <FolderDown className="w-5 h-5" />
        Recordings
      </NavLink>
      <NavLink to="/sensors" className={navItemClass} onClick={onClick}>
        <Radio className="w-5 h-5" />
        Sensors
      </NavLink>
    </nav>
  );
}

