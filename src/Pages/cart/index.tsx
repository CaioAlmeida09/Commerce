export function Cart() {
  return (
    <div className="flex items-center justify-start flex-col w-full h-16 px-10">
      <h1 className="font-medium text-2x1 text-center my-4 mt-10">
        Meu Carrinho
      </h1>
      <section className="w-full py-12 px-1  flex items-center justify-between border-b-2 border-gray-300">
        {" "}
        <div className="mr-48">
          <img
            src="https://meublogdecomida.files.wordpress.com/2015/07/rancho-do-cuscuz-frango-cc3b3pia.jpg"
            alt="logo-produto"
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between w-full md:flex-row flex-col gap-3">
          <strong> 9 R$</strong>
          <div className="flex gap-3 fle ">
            <button className="bg-slate-600 px-2 rounded text-white font medium flex items-center justify-center">
              -
            </button>
            1
            <button className="bg-slate-600 px-2 rounded text-white font medium flex items-center justify-center">
              +
            </button>
          </div>
          <p> total </p>
        </div>
      </section>
    </div>
  );
}
