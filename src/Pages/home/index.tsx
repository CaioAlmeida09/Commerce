import "tailwindcss/tailwind.css";
import { BsCartPlus } from "react-icons/bs";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// quando quiser rodar a api : json-server --watch db.json
export interface productsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}
export interface itemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  product?: {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
  };
}

export function Home() {
  const [products, setProducts] = useState<productsProps[]>([]);

  const { AddItemCart } = useContext(CartContext);

  function TesteProduct(product: itemProps) {
    console.log(product);
    const filterProps = products.filter((item) => {
      return item.id === product.id;
    });
    setProducts(filterProps);
  }
  function HandleAddCart(product: productsProps) {
    toast.success("Item adicionado ao Carrinho");
    AddItemCart(product);
  }
  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/");
      setProducts(response.data);
      console.log(response);
    }
    getProducts();
  }, []);

  async function HandleProducts() {
    const response = await api.get("/");
    setProducts(response.data);
  }

  return (
    <div className="flex items-center justify-start flex-col w-full h-16 px-10">
      <button onClick={HandleProducts}>
        <h1 className="font-bold mt-10 mb-7">Produtos em Alta </h1>
      </button>
      <div
        className={` ${
          products.length === 1
            ? " flex justify-center items-center"
            : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5"
        }`}
      >
        {products.length === 1
          ? products.map((product) => (
              <section key={product.id} className="flex p-8">
                <div className="md:flex md:gap-9 ">
                  {" "}
                  <img
                    src={product.cover}
                    alt={product.title}
                    className=" w-72 h-72 mb-2 m-auto"
                  />
                  <div>
                    <h1 className="text-xl font-bold mb-3"> {product.title}</h1>
                    <p className=" max-w-3xl"> {product.description}</p>
                    <strong className="flex justify-center items-center mt-6 gap-6">
                      <p>
                        {" "}
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                      <Link to={"/cart"}>
                        <button onClick={() => HandleAddCart(product)}>
                          {" "}
                          <BsCartPlus size={24} />
                        </button>
                      </Link>
                    </strong>
                  </div>
                </div>
              </section>
            ))
          : products.map((product) => (
              <section key={product.id} className="w-full">
                <button onClick={() => TesteProduct(product)}>
                  <img
                    className="w-full max-h-50 mb-2"
                    src={product.cover}
                    alt={product.title}
                  />
                </button>
                <p className="font-medium mt-2 mb-2 text-center">
                  {" "}
                  {product.title}
                </p>
                <div className="flex gap-3 justify-center items-center">
                  {" "}
                  <strong className="text-zinc-700/900">
                    {" "}
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                  </strong>
                  <button
                    className="bg-zinc-500 p-1 rounded"
                    onClick={() => HandleAddCart(product)}
                  >
                    <BsCartPlus size={22} />
                  </button>
                </div>
              </section>
            ))}
      </div>
    </div>
  );
}
