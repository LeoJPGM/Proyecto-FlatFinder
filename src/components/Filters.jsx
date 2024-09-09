import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export const Filters = ({ className, filterType, data, onFilteredData }) => {
  const [filters, setFilters] = useState({
    city: "",
    streetName: "",
    streetNumber: "",
    minAreaSize: "",
    maxAreaSize: "",
    hasAc: "",
    minYearBuilt: "",
    maxYearBuilt: "",
    minRentPrice: "",
    maxRentPrice: "",
    name: "",
    lastName: "",
    email: "",
    role: "all",
    ageOrder: "none",
    saveFlatsOrder: "none",
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

  const applyFilters = () => {
    let filteredData = [...data];

    if (filterType === "flats") {
      if (filters.city)
        filteredData = filteredData.filter((item) =>
          item.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      if (filters.streetName)
        filteredData = filteredData.filter((item) =>
          item.streetName
            .toLowerCase()
            .includes(filters.streetName.toLowerCase())
        );
      if (filters.streetNumber)
        filteredData = filteredData.filter((item) =>
          item.streetNumber.toString().includes(filters.streetNumber)
        );
      if (filters.minAreaSize)
        filteredData = filteredData.filter(
          (item) => item.areaSize >= parseFloat(filters.minAreaSize)
        );
      if (filters.maxAreaSize)
        filteredData = filteredData.filter(
          (item) => item.areaSize <= parseFloat(filters.maxAreaSize)
        );
      if (filters.hasAc)
        filteredData = filteredData.filter(
          (item) => item.hasAc === (filters.hasAc === "true")
        );
      if (filters.minYearBuilt)
        filteredData = filteredData.filter(
          (item) => item.yearBuilt >= parseInt(filters.minYearBuilt, 10)
        );
      if (filters.maxYearBuilt)
        filteredData = filteredData.filter(
          (item) => item.yearBuilt <= parseInt(filters.maxYearBuilt, 10)
        );
      if (filters.minRentPrice)
        filteredData = filteredData.filter(
          (item) => item.rentPrice >= parseFloat(filters.minRentPrice)
        );
      if (filters.maxRentPrice)
        filteredData = filteredData.filter(
          (item) => item.rentPrice <= parseFloat(filters.maxRentPrice)
        );
    }

    if (filterType === "users") {
      if (filters.name)
        filteredData = filteredData.filter((user) =>
          user.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      if (filters.lastName)
        filteredData = filteredData.filter((user) =>
          user.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
        );
      if (filters.email)
        filteredData = filteredData.filter((user) =>
          user.email.toLowerCase().includes(filters.email.toLowerCase())
        );
      if (filters.role && filters.role !== "all")
        filteredData = filteredData.filter((user) =>
          filters.role === "admin" ? user.admin : !user.admin
        );
      if (filters.ageOrder !== "none")
        filteredData = filteredData.sort((a, b) => {
          const ageA =
            new Date().getFullYear() -
            new Date(a.birthday.seconds * 1000).getFullYear();
          const ageB =
            new Date().getFullYear() -
            new Date(b.birthday.seconds * 1000).getFullYear();
          return filters.ageOrder === "asc" ? ageA - ageB : ageB - ageA;
        });
      if (filters.saveFlatsOrder !== "none")
        filteredData = filteredData.sort((a, b) =>
          filters.saveFlatsOrder === "asc"
            ? a.saveFlats - b.saveFlats
            : b.saveFlats - a.saveFlats
        );
    }

    onFilteredData(filteredData);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative">
      {/* Icono para mostrar el filtro en móviles */}
      <div
        onClick={toggleMobileMenu}
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 z-50 p-2 rounded-md shadow-lg cursor-pointer md:hidden flex items-center justify-center ${
          isMobileMenuOpen ? "translate-x-64" : ""
        }`}
        aria-label={isMobileMenuOpen ? "Cerrar filtros" : "Abrir filtros"}
      >
        <Icon
          icon="ep:arrow-up-bold"
          className={`w-6 h-6 transition-transform duration-300 ${
            isMobileMenuOpen ? "-rotate-90" : "rotate-90"
          }`}
        />
      </div>

      {/* Filtros */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-orange-50 shadow-lg transition-transform duration-300 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 ${className}`}
      >
        <div className="p-4 h-full overflow-y-auto scrollbar-hide">
          <h1 className="text-xl font-semibold mb-6 text-gray-700">Filtros</h1>
          {filterType === "flats" && (
            <>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">Ciudad</h2>
                <input
                  name="city"
                  className="w-full h-10 pl-3 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  type="text"
                  placeholder="Ciudad"
                  value={filters.city}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Nombre de la Calle
                </h2>
                <input
                  name="streetName"
                  className="w-full h-10 pl-3 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  type="text"
                  placeholder="Nombre de la Calle"
                  value={filters.streetName}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Número de la Calle
                </h2>
                <input
                  name="streetNumber"
                  className="w-full h-10 pl-3 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  type="text"
                  placeholder="Número de la Calle"
                  value={filters.streetNumber}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Tamaño del Área
                </h2>
                <div className="mt-2 flex gap-2">
                  <input
                    name="minAreaSize"
                    className="text-center text-sm w-20 h-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Min"
                    value={filters.minAreaSize}
                    onChange={handleFilterChange}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    name="maxAreaSize"
                    className="text-center text-sm w-20 h-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Max"
                    value={filters.maxAreaSize}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Aire Acondicionado
                </h2>
                <select
                  name="hasAc"
                  className="w-full h-10 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  value={filters.hasAc}
                  onChange={handleFilterChange}
                >
                  <option value="">Seleccione</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Año de Construcción
                </h2>
                <div className="mt-2 flex gap-2">
                  <input
                    name="minYearBuilt"
                    className="text-center text-sm w-20 h-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Min"
                    value={filters.minYearBuilt}
                    onChange={handleFilterChange}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    name="maxYearBuilt"
                    className="text-center text-sm w-20 h-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Max"
                    value={filters.maxYearBuilt}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Precio de Alquiler
                </h2>
                <div className="mt-2 flex gap-2">
                  <input
                    name="minRentPrice"
                    className="text-center text-sm w-20 h-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Min"
                    value={filters.minRentPrice}
                    onChange={handleFilterChange}
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    name="maxRentPrice"
                    className="text-center text-sm w-20 h-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Max"
                    value={filters.maxRentPrice}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </>
          )}
          {filterType === "users" && (
            <>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">Nombre</h2>
                <input
                  name="name"
                  className="w-full h-10 pl-3 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  type="text"
                  placeholder="Nombre"
                  value={filters.name}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">Apellido</h2>
                <input
                  name="lastName"
                  className="w-full h-10 pl-3 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  type="text"
                  placeholder="Apellido"
                  value={filters.lastName}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">Email</h2>
                <input
                  name="email"
                  className="w-full h-10 pl-3 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  type="email"
                  placeholder="Email"
                  value={filters.email}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">Rol</h2>
                <select
                  name="role"
                  className="w-full h-10 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  value={filters.role}
                  onChange={handleFilterChange}
                >
                  <option value="all">Todos</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
                </select>
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Ordenar por Edad
                </h2>
                <select
                  name="ageOrder"
                  className="w-full h-10 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  value={filters.ageOrder}
                  onChange={handleFilterChange}
                >
                  <option value="none">Ninguno</option>
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>
              <div className="mb-4">
                <h2 className="text-sm font-medium text-gray-600">
                  Ordenar por Guardados
                </h2>
                <select
                  name="saveFlatsOrder"
                  className="w-full h-10 mt-2 text-sm text-gray-800 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
                  value={filters.saveFlatsOrder}
                  onChange={handleFilterChange}
                >
                  <option value="none">Ninguno</option>
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

Filters.propTypes = {
  className: PropTypes.string,
  filterType: PropTypes.oneOf(["flats", "users"]).isRequired,
  data: PropTypes.array.isRequired,
  onFilteredData: PropTypes.func.isRequired,
};
