import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: () => void;
  rounded?: 'rounded-bl-2xl' | 'rounded-br-2xl';
  bg?: 'bg-orange-600 text-white' | 'bg-gray-600 text-white' | 'bg-gray-100';
}

function Button({ children, rounded, bg, onClick }: Props) {
  return (
    <button
      onClick={() => onClick()}
      className={`
        w-16 h-16 text-xl active:shadow-button 
        ${bg ?? "bg-white"}
        ${rounded ?? ""}
     `}
    >
      {children}
    </button>
  )
}

export default Button;
