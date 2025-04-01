interface BurgerButtonProps {
  onClick: () => void;
  isOpen: boolean;
  color: string;
}

export default function BurgerButton({ onClick, isOpen, color }: BurgerButtonProps) {
  return (
    <button
      className={`text-${color} focus:outline-none hover:cursor-pointer`}
      onClick={onClick}
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
        ></path>
      </svg>
    </button>
  );
}

