import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, total, RemoveItemCart, AddItemCart } = useContext(CartContext);
  return (
    <div className="flex items-center justify-start flex-col w-full h-16 md:px-10 px-5">
      <h1 className="font-medium text-2x1 text-center my-4 mt-10">
        Meu Carrinho
      </h1>
      {cart.length === 0 && (
        <div className="flex flex-col justify-start items-center mt-8 font-medium">
          {" "}
          <p> Ops, seu carrinho está vazio ...</p>
          <Link
            className="bg-zinc-400 rounded px-3 py-1 mt-3 text-white font-medium hover:px-4 hover:py-2 hover:bg-slate-800"
            to="/"
          >
            Acessar produtos
          </Link>
        </div>
      )}
      {cart.map((item) => (
        <section
          key={item.id}
          className="w-full py-3 px-1  flex items-center justify-between border-b-2 border-gray-300"
        >
          <div className="md:mr-48 mr-10">
            <img
              src={item.cover}
              alt="logo-produto"
              className="md:max-w-xs w-40"
            />
          </div>
          <div className="flex items-center justify-between w-full md:flex-row flex-col gap-3">
            <strong className="md:text-xl text-xs">
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
            <div className="flex gap-3 fle ">
              <button
                onClick={() => RemoveItemCart(item)}
                className="bg-slate-600 px-2 rounded text-white font medium flex items-center justify-center"
              >
                -
              </button>
              {item.amount}
              <button
                onClick={() => AddItemCart(item)}
                className="bg-slate-600 px-2 rounded text-white font medium flex items-center justify-center"
              >
                +
              </button>
            </div>
            <p className="md:text-xl text-xs">
              Subtotal:{" "}
              <b>
                {item.total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
              </b>
            </p>
          </div>
        </section>
      ))}
      <hr />
      {cart.length > 0 && <h3> Total: {total}</h3>}
    </div>
  );
}
