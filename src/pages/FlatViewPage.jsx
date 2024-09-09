import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../config/FireBaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Navbar } from "../components/Navbar";
import { searchUser } from "../services/messageService";

const FlatViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flat, setFlat] = useState(null);
  const [user, setUser] = useState({ name: "", lastName: "", email: "" });
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  useEffect(() => {
    const fetchFlat = async () => {
      try {
        const flatDoc = doc(db, "flats", id);
        const flatSnapshot = await getDoc(flatDoc);
        if (flatSnapshot.exists()) {
          setFlat(flatSnapshot.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching flat: ", error);
      }
    };
    fetchFlat();
  }, [id]);

  useEffect(() => {
    if (flat) {
      const fetchUserData = async () => {
        try {
          const userData = await searchUser(flat.userId);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };
      fetchUserData();
    }
  }, [flat]);

  if (!flat) {
    return <div>Loading...</div>;
  }

  const fechaFormateada = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(flat.dateAvailable);

  return (
    <div className="w-screen h-screen font-inter flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-4/5">
          <div className="border rounded-2xl flex w-full h-96 bg-white shadow-xl">
            <div className="w-2/5 h-full">
              <img
                src={flat.flatImageURL}
                alt="Flat Image"
                className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
              />
            </div>
            <div className="w-3/5 h-full p-4">
              <div className="w-full h-9 flex justify-between">
                <h1 className="font-bold text-4xl">Detalles</h1>
                {flat.userId === userLogged ? (
                  <button
                    onClick={() => navigate(`/edit-flat/${id}`)}
                    className="border rounded-md p-2 bg-amber-500 hover:bg-amber-600 text-white text-sm"
                  >
                    Editar Flat
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/messages/${flat.userId}`)}
                    className="border rounded-md p-2 bg-lime-600 hover:bg-lime-700 text-white text-sm"
                  >
                    Contactar con el propietario
                  </button>
                )}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <p className="font-bold text-xl">Datos del propietario:</p>
                <p className="font-semibold">
                  Nombre:{" "}
                  <span className="font-normal">
                    {user.name} {user.lastName}
                  </span>
                </p>
                <p className="font-semibold">
                  Email: <span className="font-normal">{user.email}</span>
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <p className="font-bold text-xl">Datos del piso:</p>
                <div className="grid grid-cols-2 gap-2">
                  <p className="font-semibold">
                    Ciudad: <span className="font-normal">{flat.city}</span>
                  </p>
                  <p className="font-semibold">
                    Direccion:{" "}
                    <span className="font-normal">
                      {flat.streetName} {flat.streetNumber}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Aire acondicionado:{" "}
                    <span className="font-normal">
                      {flat.hasAc ? "Si" : "No"}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Tamaño de area:{" "}
                    <span className="font-normal">{flat.areaSize}m²</span>
                  </p>
                  <p className="font-semibold">
                    Año de construcción:{" "}
                    <span className="font-normal">{flat.yearBuilt}</span>
                  </p>
                  <p className="font-semibold">
                    Fecha de disponibilidad:{" "}
                    <span className="font-normal">{fechaFormateada}</span>
                  </p>
                  <p className="font-semibold">
                    Precio:{" "}
                    <span className="font-normal">${flat.rentPrice}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatViewPage;
