import "tailwindcss/tailwind.css";
import { BsCartPlus } from "react-icons/bs";
import { api } from "../../services/api";
import { useEffect, useState } from "react";

// quando quiser rodar a api : json-server --watch db.json
interface productsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}
export function Home() {
  const [products, setProducts] = useState<productsProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);
  function HandleAddCart(product: productsProps) {
    console.log(product);
  }

  return (
    <div className="flex items-center justify-start flex-col w-full h-16 px-10">
      <h1 className="font-bold mt-10 mb-7">Cardápio </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <section key={product.id} className="w-full">
            <img
              className="w-full max-h-50 mb-2"
              src={product.cover}
              alt={product.title}
            />
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
