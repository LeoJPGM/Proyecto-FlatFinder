import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/FireBaseConfig";
import { useNavigate } from "react-router-dom"; // Para ir a la página Edit Flats
import { getUserById, updateUsers } from "../services/FireBase"; // Para favoritos
import { useLocation } from "react-router-dom"; //Se agrega para que el boton eliminar solo aparezca en my flats.

// Función para traer los flats de Firebase
export const fetchFlats = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "flats"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dateAvailable: doc.data().dateAvailable
        ? doc.data().dateAvailable.toDate()
        : null, // Convertir Timestamp a Date si existe
    }));
  } catch (error) {
    console.error("Error fetching flats: ", error);
    return [];
  }
};

// Hook para usar los flats
export const useFlats = (reloadFlats) => {
  const [flats, setFlats] = useState([]);

  useEffect(() => {
    const getFlats = async () => {
      const flatsList = await fetchFlats();
      setFlats(flatsList);
    };
    getFlats();
  }, [reloadFlats]);

  return flats;
};

// Componente Flat para mostrar los flats
export const Flat = ({
  id,
  city,
  streetName,
  streetNumber,
  areaSize,
  hasAc,
  yearBuilt,
  dateAvailable,
  rentPrice,
  flatImageURL,
  onDeleteFlat, // Agregado para eliminar flat
  flat, // Agregado para eliminar flat
  showEditIcon, // Agregado para editar flat
}) => {
  const [isFavorite, setIsFavorite] = useState();
  const navigate = useNavigate(); // Para ir a la página Edit Flats
  const location = useLocation(); // Para verificar la ruta actual

  const handleFavorites = async () => {
    const userID = JSON.parse(localStorage.getItem("userLogged"));
    const userDB = await getUserById(userID);
    if (userDB.favorites && userDB.favorites.includes(id)) {
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    handleFavorites();
  }, []);

  const handleFavoriteClick = async () => {
    const userID = JSON.parse(localStorage.getItem("userLogged"));
    const userDB = await getUserById(userID);

    let favorites;
    if (userDB.favorites && userDB.favorites.includes(id)) {
      favorites = userDB.favorites.filter((favoriteId) => favoriteId !== id);
      setIsFavorite(false);
    } else {
      favorites = userDB.favorites ? [...userDB.favorites, id] : [id];
      setIsFavorite(true);
    }

    await updateUsers(userID, { favorites });
  };

  const fechaFormateada = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateAvailable);

  return (
    <div className="w-72 min-h-[400px] rounded overflow-hidden shadow-lg">
      {/* IMAGEN */}
      <div className="w-full h-48 rounded overflow-hidden">
        <img
          src={flatImageURL}
          alt={`Image of ${city}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2 flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="font-bold text-2xl">{city}</p>
          <p className="font-bold text-2xl text-lime-700">${rentPrice}</p>
        </div>
        <p className="font-bold">
          Dirección:{" "}
          <span className="font-normal">
            {streetName} {"-"} {streetNumber}
          </span>
        </p>
        <p className="font-bold">
          Aire acondicionado:{" "}
          <span className="font-normal">{hasAc ? "Si" : "No"}</span>
        </p>
        <p className="font-bold">
          Tamaño de área: <span className="font-normal">{areaSize}m²</span>
        </p>
        <p className="font-bold">
          Año de construcción: <span className="font-normal">{yearBuilt}</span>
        </p>
        <p className="font-bold">
          Fecha de disponibilidad:{" "}
          <span className="font-normal">{fechaFormateada}</span>
        </p>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-between">
          <Icon
            icon="solar:heart-bold"
            className={`cursor-pointer text-4xl ml-1 ${
              isFavorite ? "text-red-500" : "text-slate-200"
            }`}
            onClick={handleFavoriteClick}
          />
          {showEditIcon && (
            <Icon
              icon="fxemoji:pencil"
              className="text-gray-500 cursor-pointer"
              onClick={() => navigate(`/edit-flat/${id}`)}
            />
          )}
          <div className="pt-1">
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded p-1 mr-1"
              onClick={() => navigate(`/flat-view/${id}`)}
            >
              Ver detalles
            </button>
            {location.pathname === "/my-flats" && (
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded ml-2 p-1 mr-1"
                onClick={() => onDeleteFlat(flat.id)}
              >
                Eliminar Flat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
