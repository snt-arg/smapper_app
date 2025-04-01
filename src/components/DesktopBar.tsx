import { JSX } from "react";
import { NavLinks } from "./SideBar";

/**
 * Side bar for larger screens.
 *
 * @returns {JSX.Element}
 */
export function DesktopBar(): JSX.Element {
  return (
    <div className="hidden lg:block w-60 min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-5">SMapper</h1>
      <NavLinks />
    </div>
  );
}

