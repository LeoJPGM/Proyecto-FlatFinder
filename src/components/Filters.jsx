export const Filters = () => {
  return (
    <>
      <div className="filter h-screen border-5 border-gray-300 border-r pl-5">
        <h1 className="text-3xl">FILTROS</h1>
        <div className="py-4">
          <h3>CIUDAD</h3>
          <input
            className="border-2 px-1 py-1 w-60"
            placeholder="Seleccione la ciudad"
          />
          <h3>PRECIO</h3>
          <input
            className="border-2 px-1 py-1 w-20 text-center"
            placeholder="MIN"
          />
          <input
            className="border-2 px-1 py-1 w-20 text-center"
            placeholder="MAX"
          />
          <h3>TAMAÑO DEL AREA</h3>
          <input
            className="border-2 px-1 py-1 w-20 text-center"
            placeholder="MIN"
          />
          <input
            className="border-2 px-1 py-1 w-20 text0center"
            placeholder="MAX"
          />
        </div>
        <h1 className="text-3xl">CATEGORIAS</h1>
        <div className="py-4">
          <h3>ORDENAR POR CIUDAD</h3>
          <input
            className="border-2 px-1 py-1 w-60"
            placeholder="Seleccione la ciudad"
          />
        </div>
      </div>
    </>
  );
};
