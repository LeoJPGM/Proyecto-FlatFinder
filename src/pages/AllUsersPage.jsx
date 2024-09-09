import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Filters } from "../components/Filters";
import { deleteUserAccount, getUsers, updateUsers } from "../services/FireBase";
import { searchUser } from "../services/messageService";
import { useNavigate } from "react-router-dom";

export const AllUsersPage = () => {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setUsers(users);
      setFilteredUsers(users);
    };

    fetchData();
  }, []);

  const handleFilteredData = (filteredData) => {
    setFilteredUsers(filteredData);
  };

  const handleDeleteAccount = async (userID) => {
    if (userID === userLogged) {
      await deleteUserAccount(userLogged);
      localStorage.removeItem("userLogged");
    } else {
      await deleteUserAccount(userID);
    }

    window.location.reload();
  };

  const handleChangeRol = async (userID) => {
    const userData = await searchUser(userID);
    const rol = {
      admin: true,
      user: false,
    };

    if (userData.admin) {
      await updateUsers(userID, { admin: rol.user });
      window.location.reload();
    } else {
      await updateUsers(userID, { admin: rol.admin });
      window.location.reload();
    }
  };

  const handleEditProfile = (userID) => {
    navigate(`/profile/${userID}`);
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
      <div className="flex font-inter">
        <Filters
          filterType="users"
          data={users}
          onFilteredData={handleFilteredData}
        />
        <div className="w-full sm:w-3/4 p-4 h-screen overflow-auto">
          <h1 className="text-xl mb-4">Lista de usuarios</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Imagen
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Apellido
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Edad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  saveFlats
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Admin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Funciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const birthDate = new Date(user.birthday.seconds * 1000);
                const age = new Date().getFullYear() - birthDate.getFullYear();
                return (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10">
                          <img
                            src={user.profileImageURL}
                            alt="userImage"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {age} años
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.saveFlats}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {user.admin ? "Administrador" : "Usuario"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleChangeRol(user.id)}
                        className="border border-transparent bg-lime-500 text-white p-1 rounded-md hover:bg-lime-600"
                      >
                        Cambiar Rol
                      </button>

                      <button
                        onClick={() => handleEditProfile(user.id)}
                        className="ml-5 border border-transparent bg-cyan-500 text-white p-1 rounded-md hover:bg-cyan-600"
                      >
                        Editar Perfil
                      </button>

                      <button
                        onClick={() => handleDeleteAccount(user.id)}
                        className="ml-5 border border-transparent bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                      >
                        Eliminar cuenta
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
