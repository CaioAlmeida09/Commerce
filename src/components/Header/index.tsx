import "tailwindcss/tailwind.css";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export function Header() {
  const { cartAmount } = useContext(CartContext);

  return (
    <header className="flex items-center justify-between w-full h-16 px-10 bg-slate-200">
      <Link to="/" className="font-bold text-2xl">
        Produtos em Alta
      </Link>
      <Link className="relative" to="/cart">
        <FiShoppingCart color=" #121212" size={24} />
        {cartAmount > 0 && (
          <span className="absolute -right-2 -top-3 bg-sky-500 rounded-full w-5 h-5  text-white text-xs px-2.5 flex items-center justify-center">
            {cartAmount}
          </span>
        )}
      </Link>
    </header>
  );
}
