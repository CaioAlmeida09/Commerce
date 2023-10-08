import { createContext, ReactNode, useState } from "react";
import { productsProps } from "../Pages/home";
interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  AddItemCart: (newItem: productsProps) => void;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}
interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);
function CartProvider({ children }: CartProviderProps) {
  function AddItemCart(newItem: productsProps) {
    const IndexItem = cart.findIndex((item) => item.id === newItem.id);
    if (IndexItem !== -1) {
      const cartList = cart;
      cartList[IndexItem].amount = cartList[IndexItem].amount + 1;
      cartList[IndexItem].total =
        cartList[IndexItem].amount * cartList[IndexItem].price;
      setCart(cartList);
      return;
    }
    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
  }
  const [cart, setCart] = useState<CartProps[]>([]);
  return (
    <CartContext.Provider
      value={{ cart, cartAmount: cart.length, AddItemCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;
