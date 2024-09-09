import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { getUserByID } from "../services/userService";
import { deleteUserAccount } from "../services/FireBase";

export const Navbar = ({ className }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messageConf, setMessageConf] = useState(false);
  const [user, setUser] = useState({
    admin: false,
    name: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userID = JSON.parse(localStorage.getItem("userLogged"));
      const userData = await getUserByID(userID);
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleDeleteAccount = async () => {
    const userID = JSON.parse(localStorage.getItem("userLogged"));
    await deleteUserAccount(userID);
    localStorage.removeItem("userLogged");
    window.location.reload();
  };

  const handleLogoutAccount = () => {
    localStorage.removeItem("userLogged");
    window.location.reload();
  };
  return (
    <>
      <nav
        className={`flex items-center justify-between p-4 bg-orange-50 border-b	 ${className}`}
      >
        <div className="text-2xl font-bold">
          <div className="w-72 h-16">
            <a href="/all-flats">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/flatfinder-46b30.appspot.com/o/Logo(1).png?alt=media&token=18efa839-e3f2-41bf-810f-c393c5605886"
                alt="FlatFinder Logo"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <a href="/my-flats" className="flex items-center text-lg font-bold">
              <Icon icon="tabler:home-filled" className="mr-2" />
              MIS FLATS
            </a>
            <a
              href="/favorites-flats"
              className="flex items-center text-lg font-bold"
            >
              <Icon icon="teenyicons:heart-outline" className="mr-2" />
              FAVORITOS
            </a>
            <a href="/messages" className="flex items-center text-lg font-bold">
              <Icon icon="ooui:message" className="mr-2" />
              MENSAJES
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Icon icon="fluent-mdl2:context-menu" className="text-2xl" />
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg p-4">
            <div className="border-b-2">
              <p>
                Hola, {user.name} {user.lastName}
              </p>
            </div>
            <a href="/profile" className="block mt-2 text-cyan-500">
              <div className="flex gap-1">
                <Icon className="text-2xl" icon="mingcute:profile-line" />
                Mi Perfil
              </div>
            </a>
            <a href="/new-flats" className="block mt-2 text-violet-500">
              <div className="flex gap-1">
                <Icon className="text-2xl" icon="mdi:house-add-outline" />
                Crear Flat
              </div>
            </a>
            <div className="md:hidden">
              <a href="/my-flats" className="block mt-2">
                <div className="flex gap-1 text-lime-500">
                  <Icon className="text-2xl" icon="ic:outline-home" />
                  Mis Flats
                </div>
              </a>
              <a href="/favorites-flats" className="block mt-2">
                <div className="flex gap-1 text-pink-600">
                  <Icon className="text-2xl" icon="ph:heart-bold" />
                  Favoritos
                </div>
              </a>
              <a href="/messages" className="block mt-2">
                <div className="flex gap-1 text-orange-500">
                  <Icon className="text-2xl" icon="flowbite:messages-outline" />
                  Mensajes
                </div>
              </a>
            </div>
            {user.admin && (
              <a href="/all-users" className="block mt-2">
                <div className="flex gap-1 text-yellow-600">
                  <Icon className="text-2xl" icon="mdi:users-outline" />
                  Todos los usuarios
                </div>
              </a>
            )}
            <button
              onClick={() => setMessageConf(!messageConf)}
              className="block mt-2"
            >
              <div className="flex gap-1 text-red-600">
                <Icon
                  className="text-2xl"
                  icon="material-symbols:delete-outline"
                />
                Eliminar Cuenta
              </div>
            </button>
            <button onClick={handleLogoutAccount} className="block mt-2">
              <div className="flex gap-1 text-green-intensity-100">
                <Icon className="text-2xl" icon="ic:outline-logout" />
                Salir
              </div>
            </button>
          </div>
        )}
      </nav>
      {messageConf && (
        <div className="w-screen h-screen absolute z-10 flex justify-center items-center backdrop-blur-sm">
          <div className="w-80 h-60 bg-white rounded-lg flex flex-col justify-center shadow-2xl font-inter">
            <p className="text-center">
              Estas seguro de que quieres eliminar tu cuenta?
            </p>
            <div className="flex justify-center gap-5 mt-3">
              <button
                onClick={handleDeleteAccount}
                className="border rounded w-16 bg-red-600 text-white"
              >
                Si
              </button>
              <button
                onClick={() => setMessageConf(false)}
                className="border rounded w-16 bg-sky-500 text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
};
