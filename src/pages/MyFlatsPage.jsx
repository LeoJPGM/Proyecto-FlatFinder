import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Filters } from "../components/Filters";
import { FlatsViewer } from "../components/FlatsViewer";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const MyFlatsPage = () => {
  const [flatsByUser, setFlatsByUser] = useState([]);
  const [filteredFlats, setFilteredFlats] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchFlatsByUser = async () => {
      const userLogged = JSON.parse(localStorage.getItem("userLogged"));
      if (userLogged) {
        try {
          const flatsQuery = query(
            collection(db, "flats"),
            where("userId", "==", userLogged)
          );
          const flatsSnapshot = await getDocs(flatsQuery);
          const flatsList = flatsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            dateAvailable: doc.data().dateAvailable
              ? doc.data().dateAvailable.toDate()
              : null,
          }));
          setFlatsByUser(flatsList);
        } catch (error) {
          console.error("Error al obtener flats:", error);
        }
      }
    };

    fetchFlatsByUser();
  }, [db]);

  const deleteFlatById = async (flatId) => {
    try {
      await deleteDoc(doc(db, "flats", flatId));
      setFlatsByUser(flatsByUser.filter((flat) => flat.id !== flatId));
      setFilteredFlats(filteredFlats.filter((flat) => flat.id !== flatId));
    } catch (error) {
      console.error("Error al eliminar flat:", error);
    }
  };

  const handleFilteredData = (filteredData) => {
    setFilteredFlats(filteredData);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Filters
          filterType="flats"
          data={flatsByUser}
          onFilteredData={handleFilteredData}
        />
        <FlatsViewer
          className="w-full md:w-3/4 p-4 overflow-y-auto"
          flats={filteredFlats}
          onDeleteFlat={deleteFlatById}
          showEditIcon={true} // Pasar la prop showEditIcon como true
        />
      </div>
    </div>
  );
};
