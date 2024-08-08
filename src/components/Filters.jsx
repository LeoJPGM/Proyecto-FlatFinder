export const Filters = () => {
  return (
    <aside className="w-300 h-screen font-inter pl-5 border-r">
      <h1 className="text-32 font-semibold mt-2 mb-3">FILTROS</h1>
      <div className="mb-2 font-medium">
        <h2>CIUDAD</h2>
        <select className="w-236 h-8 font-light mt-1 text-xs text-neutral-500 border border-neutral-300 rounded-md outline-none">
          <option>SELECCIONE UNA CIUDAD</option>
        </select>
      </div>
      <div className="mb-2 font-medium">
        <h2>PRECIO</h2>
        <div className="mt-1 font-light flex gap-2">
          <input
            className="text-center text-xs w-57 h-7 border border-neutral-300 rounded-md outline-none"
            type="text"
            placeholder="MIN"
          />
          <span className="text-neutral-400">-</span>
          <input
            className="text-center text-xs w-57 h-7 border border-neutral-300 rounded-md outline-none"
            type="text"
            placeholder="MAX"
          />
        </div>
      </div>
      <div className="mb-5 font-medium">
        <h2>TAMAÑO DEL AREA</h2>
        <div className="mt-1 font-light flex gap-2">
          <input
            className="text-center text-xs w-57 h-7 border border-neutral-300 rounded-md outline-none"
            type="text"
            placeholder="MIN"
          />
          <span className="text-neutral-400">-</span>
          <input
            className="text-center text-xs w-57 h-7 border border-neutral-300 rounded-md outline-none"
            type="text"
            placeholder="MAX"
          />
        </div>
      </div>
      <h1 className="text-32 font-semibold mb-3">CATEGORIAS</h1>
      <div className="mb-2 font-medium">
        <h2>ORDENAR POR CIUDAD</h2>
        <select className="w-236 h-8 font-light mt-1 text-xs text-neutral-500 border border-neutral-300 rounded-md outline-none">
          <option>SELECCIONE UNA CIUDAD</option>
        </select>
      </div>
    </aside>
  );
};
