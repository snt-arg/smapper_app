import { JSX, useState } from "react";
import BurgerButton from "./BurgerButton";
import { NavLinks } from "./SideBar";

/**
 * Navigation bar for small to large screens.
 *
 * @returns {JSX.Element}
 */
export function MobileBar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <header className="lg:hidden bg-gray-100 min-w-screen h-14 flex justify-between px-4 items-center">
        <h1 className="text-3xl font-bold">SMapper</h1>
        <BurgerButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} color="black" />
      </header>

      <div
        className={`lg:hidden fixed inset-0 bg-gray-100 z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-300">
          <h1 className="text-2xl font-bold">SMapper</h1>
          <BurgerButton isOpen={menuOpen} onClick={() => setMenuOpen(false)} color="black" />
        </div>
        <div className="p-4">
          <NavLinks onClick={() => setMenuOpen(false)} />
        </div>
      </div>
    </div>
  );
}

