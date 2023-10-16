import "tailwindcss/tailwind.css";
import { BsCartPlus } from "react-icons/bs";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// quando quiser rodar a api : json-server --watch db.json
export interface productsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}
export function Home() {
  const [products, setProducts] = useState<productsProps[]>([]);

  const { AddItemCart } = useContext(CartContext);

  function HandleAddCart(product: productsProps) {
    toast.success("Item adicionado ao Carrinho");
    AddItemCart(product);
  }
  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);

  return (
    <div className="flex items-center justify-start flex-col w-full h-16 px-10">
      <h1 className="font-bold mt-10 mb-7">Produtos em Alta </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <section key={product.id} className="w-full">
            <Link to={`product/${product.id}`}>
              <img
                className="w-full max-h-50 mb-2"
                src={product.cover}
                alt={product.title}
              />
            </Link>
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
                className="bg-zinc-900 p-1 rounded"
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
