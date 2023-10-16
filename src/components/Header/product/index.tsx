import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { BsCartPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: 120;
  cover: string;
}

export function Product() {
  const { id } = useParams();
  useEffect(() => {
    async function getProducts() {
      const response = await api.get(`/products/${id}`);
      setProducts(response.data);
    }
    getProducts();
  }, [id]);
  const [products, setProducts] = useState<ProductsProps>();
  const { AddItemCart } = useContext(CartContext);

  function HandleAddCart(products: ProductsProps) {
    toast.success("Item adicionado ao Carrinho");
    AddItemCart(products);
  }

  return (
    <div>
      <main className="flex w-full max-w-7xl px-6 mx-auto my-6">
        <section className="w-full">
          <div className="flex flex-col lg:flex-row">
            {" "}
            <img
              className="flex-1 w-full max-h-72 object-contain"
              src={products?.cover}
              alt={products?.title}
            />
            <div className="flex-1">
              <h1 className="font-bold text-2xl mt-4 mb-2">
                {" "}
                {products?.title}
              </h1>
              <p className="md-text-base text-xs my-4">
                {" "}
                {products?.description}
              </p>
              <strong className="flex gap-2 text-zinc-700/90 text-xl justify-center mt-3">
                <p>
                  {" "}
                  {products?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <Link to={"/cart"}>
                  <button onClick={() => HandleAddCart(products)}>
                    {" "}
                    <BsCartPlus size={24} />
                  </button>
                </Link>
              </strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
