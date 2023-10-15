import { createContext, ReactNode, useState } from "react";
import { productsProps } from "../Pages/home";
import toast from "react-hot-toast";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  AddItemCart: (newItem: productsProps) => void;
  RemoveItemCart: (itemDelete: CartProps) => void;
  total: string;
}

interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
  result: number;
}
interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);
function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([]);
  const [total, setTotal] = useState("");

  function AddItemCart(newItem: productsProps) {
    const IndexItem = cart.findIndex((item) => item.id === newItem.id);
    alert("Item adicionado ao carrinho");

    if (IndexItem !== -1) {
      const cartList = [...cart];
      cartList[IndexItem].amount = cartList[IndexItem].amount + 1;
      cartList[IndexItem].total =
        cartList[IndexItem].amount * cartList[IndexItem].price;
      setCart(cartList);
      TotalResultCart(cartList);

      return;
    }
    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
    TotalResultCart([...cart, data]);
  }

  function RemoveItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);
    if (cart[indexItem]?.amount > 1) {
      const CartList = cart;
      CartList[indexItem].amount = CartList[indexItem].amount - 1;
      CartList[indexItem].total =
        CartList[indexItem].total - CartList[indexItem].price;
      setCart(CartList);
      TotalResultCart(CartList);
      return;
    }
    const newList = cart.filter((item) => item.id !== product.id);
    setCart(newList);
    TotalResultCart(newList);
  }

  function TotalResultCart(itens: CartProps[]) {
    const myCart = itens;
    const resultCart = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const formatedResult = resultCart.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    setTotal(formatedResult);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        AddItemCart,
        RemoveItemCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;
