import { Navbar } from "../components/Navbar";
import { FlatsViewer } from "../components/FlatsViewer";
import { useEffect, useState } from "react";
import { getUserById, getFlatsByIds } from "../services/FireBase";
import { Filters } from "../components/Filters";

const FavoritesPage = () => {
  const [favoriteFlats, setFavoriteFlats] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);

  useEffect(() => {
    const fetchFavoriteFlats = async () => {
      try {
        const userID = JSON.parse(localStorage.getItem("userLogged"));
        if (!userID) {
          throw new Error("No user logged in");
        }

        const userDB = await getUserById(userID);
        if (!userDB) {
          throw new Error("User not found");
        }

        const favorites = userDB.favorites ? userDB.favorites : [];
        const favoriteFlatsDB = await getFlatsByIds(favorites);

        // Convertir dateAvailable de Timestamp a Date
        const convertedFlats = favoriteFlatsDB
          .map((flat) => ({
            ...flat,
            dateAvailable: flat.dateAvailable
              ? flat.dateAvailable.toDate()
              : null, //agregado
          }))
          .filter((flat) => flat.city); // Filtrar objetos sin 'city' agregado

        setFavoriteFlats(convertedFlats);
      } catch (error) {
        console.error("Error fetching favorite flats:", error);
      }
    };

    fetchFavoriteFlats();
  }, []);

  const handleFilteredData = (filteredData) => {
    setFilteredFlats(filteredData);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Filters
          filterType="flats"
          data={favoriteFlats}
          onFilteredData={handleFilteredData}
        />
        <FlatsViewer
          className="w-full md:w-3/4 p-4 overflow-y-auto"
          flats={filteredFlats}
          showEditIcon={false} // Pasar la prop showEditIcon como false
        />
      </div>
    </div>
  );
};

export default FavoritesPage;
