import { Navbar } from "../components/Navbar";
import { FormSubmit } from "../helpers/FormSubmit";
import { useRef, useState } from "react";
import { FlatScheme } from "../helpers/Schemes";
import { setFlats, updateUsers } from "../services/FireBase"; // Asegúrate de importar updateUsers
import { imageFlatUpload } from "../services/FireStorage";
import { useNavigate } from "react-router-dom";
import { increment } from "firebase/firestore";

export const NewFlatPage = () => {
  const form = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.type.startsWith("image/")) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setError(false);
        setMessage(""); // Clear previous messages
      } else {
        setError(true);
        setMessage("Por favor, selecciona un archivo de imagen válido.");
      }
    }
  };

  const handleUpload = async (flatID) => {
    try {
      await imageFlatUpload(flatID, imageFile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si se ha seleccionado una imagen
    if (imageFile === null) {
      setError(true);
      setMessage("Por favor, selecciona una imagen antes de continuar.");
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 1500);
      return; // Detiene la ejecución si no se ha seleccionado una imagen
    }

    const newFlat = FormSubmit(form, FlatScheme);

    if (newFlat.success) {
      const userId = JSON.parse(localStorage.getItem("userLogged"));
      const flatData = {
        ...newFlat.data,
        userId,
      };
      const flat = await setFlats(flatData);

      await handleUpload(flat.id);

      // Actualizar el contador de saveFlats del usuario
      try {
        // Aquí se asume que `saveFlats` es un campo que debes incrementar
        await updateUsers(userId, {
          saveFlats: increment(1), // Incrementa el contador en 1
        });
        setMessage("Flat creado correctamente");
      } catch (error) {
        console.error("Error actualizando el contador de saveFlats:", error);
        setMessage(
          "Flat creado pero hubo un problema actualizando el contador."
        );
      }

      setTimeout(() => {
        setMessage("");
        navigate("/all-flats");
      }, 1500);
    } else {
      setError(true);
      setMessage(newFlat.errorMessage);
      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 1500);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div
        className="flex flex-col flex-grow overflow-y-auto bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://a0.muscache.com/im/pictures/1fc28506-d659-4588-a787-4dd290a7c230.jpg?im_w=1440')",
        }}
      >
        <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-lg my-8 max-w-3xl mx-auto p-6">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Crear un Flat
            </h2>
            <div className="flex flex-col items-center mt-4 mb-4">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="fileInput"
                className="flex items-center justify-center w-36 h-36 border rounded-full cursor-pointer"
              >
                {imageFile ? (
                  <img
                    src={imagePreview}
                    alt="Image Flat"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-500">Seleccionar Imagen</span>
                )}
              </label>
              <p className="text-xs mt-2 animate-slideUP text-center">
                {`Por favor, seleccione una imagen. (Obligatorio)`}
              </p>
            </div>
            <form ref={form} onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {/* Fields for Flat Details */}
                <div className="mb-4">
                  <label className="block text-gray-700">Ciudad</label>
                  <input
                    name="city"
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Nombre de la calle
                  </label>
                  <input
                    name="streetName"
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Numero de la calle
                  </label>
                  <input
                    name="streetNumber"
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">{`Tamaño del area (m²)`}</label>
                  <input
                    name="areaSize"
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mt-7 mb-4 flex gap-2 items-center">
                  <label className="block text-gray-700">
                    ¿Tiene aire acondicionado?
                  </label>
                  <input
                    name="hasAc"
                    type="checkbox"
                    className="w-5 h-5 text-blue-500 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Año de construcción
                  </label>
                  <input
                    name="yearBuilt"
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Precio de renta ($)
                  </label>
                  <input
                    name="rentPrice"
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Fecha de disponibilidad
                  </label>
                  <input
                    name="dateAvailable"
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <p
                className={`text-center text-sm pb-2 ${
                  error ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
              <button
                type="submit"
                className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Crear Flat
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
