import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { FormSubmit } from "../helpers/FormSubmit";
import { ProfileScheme } from "../helpers/Schemes";
import { getUserByID } from "../services/userService";
import { updateProfile } from "../services/updateService";
import { useNavigate, useParams } from "react-router-dom";

export const ProfilePage = () => {
  const formProfile = useRef(null);
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const navigate = useNavigate();
  const { userID } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    saveFlats: "",
    profileImageURL: "",
  });

  useEffect(() => {
    if (!userID) {
      const fetchUserData = async () => {
        const userData = await getUserByID(userLogged);
        setUser(userData);
      };

      fetchUserData();
    } else if (userID === userLogged) {
      const fetchUserData = async () => {
        const userData = await getUserByID(userLogged);
        setUser(userData);
      };

      fetchUserData();
    } else {
      const fetchUserData = async () => {
        const userData = await getUserByID(userID);
        setUser(userData);
      };

      fetchUserData();
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = FormSubmit(formProfile, ProfileScheme);

    if (!userID) {
      const result = await updateProfile(userLogged, profile);
      if (result.success) {
        setError(result.success);
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
        }, 1500);
      } else {
        setError(result.success);
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
        }, 1500);
      }
    } else if (userID === userLogged) {
      const result = await updateProfile(userLogged, profile);
      if (result.success) {
        setError(result.success);
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
        }, 1500);
      } else {
        setError(result.success);
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
          navigate("/all-users");
        }, 1500);
      }
    } else {
      const result = await updateProfile(userID, profile);
      if (result.success) {
        setError(result.success);
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
        }, 1500);
      } else {
        setError(result.success);
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
          navigate("/all-users");
        }, 1500);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Navbar className={"relative z-50"} />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <section className="w-1/4 h-full flex items-center justify-center p-5 border-b mt-8">
          <div className="flex flex-col items-center mb-28">
            <div className="w-36 h-36 border rounded-full">
              <img
                src={user.profileImageURL}
                alt="Profile Image"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <h1 className="font-semibold mt-2">
              {user.name} {user.lastName}
            </h1>
            <h2 className="font-light text-sm">{user.email}</h2>
            <h3 className="font-light text-sm">
              Flats creados: {user.saveFlats}
            </h3>
          </div>
        </section>

        <section className="w-3/4 p-2 flex flex-col justify-center items-center gap-8 bg-white shadow-md rounded-lg">
          <h1 className="font-semibold text-2xl text-gray-800 mb-4">
            Información personal
          </h1>

          <form
            ref={formProfile}
            onSubmit={handleSubmit}
            className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Nombre</label>
              <input
                className="border border-gray-300 rounded-lg outline-none pl-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder={user.name}
                type="text"
                name="name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Apellido</label>
              <input
                className="border border-gray-300 rounded-lg outline-none pl-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder={user.lastName}
                type="text"
                name="lastName"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Email</label>
              <input
                className="border border-gray-300 rounded-lg outline-none pl-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder={user.email}
                type="email"
                name="email"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Contraseña
              </label>
              <input
                className="border border-gray-300 rounded-lg outline-none pl-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="*"
                type="password"
                name="password"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Confirmar Contraseña
              </label>
              <input
                className="border border-gray-300 rounded-lg outline-none pl-3 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="*"
                type="password"
                name="confPassword"
              />
            </div>
            <div className="flex items-end justify-end">
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Guardar Datos
              </button>
            </div>
          </form>
          {error ? (
            <p className="text-center text-sm pt-4 text-red-600">{message}</p>
          ) : (
            <p className="text-center text-sm pt-4 text-green-600">{message}</p>
          )}
        </section>
      </div>
    </div>
  );
};
