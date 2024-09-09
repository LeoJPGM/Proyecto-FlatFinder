import { Navbar } from "../components/Navbar";
import { FormSubmit } from "../helpers/FormSubmit";
import { useRef, useState, useEffect } from "react";
import { FlatUpdateScheme } from "../helpers/Schemes";
import { getFlatById, updateFlat } from "../services/FireBase";
import { useParams } from "react-router-dom";
import { imageFlatUpload } from "../services/FireStorage"; //PARA IMAGEN
import { useNavigate } from "react-router-dom";

export const EditFlatPage = () => {
  const form = useRef(null);
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  //Funcion para el checkbox
  const [check, setCheck] = useState(false);
  //Funcion para traer los flats de Firebase
  const [flatData, setFlatData] = useState({
    city: "",
    streetName: "",
    streetNumber: "",
    areaSize: "",
    hasAc: false,
    yearBuilt: "",
    rentPrice: "",
    dateAvailable: "",
  });

  //Funcion para traer los flats de Firebase
  useEffect(() => {
    const fetchFlatData = async () => {
      const data = await getFlatById(id);
      console.log(JSON.stringify(data.dateAvailable));
      const transformedDate = new Date(data.dateAvailable.seconds * 1000);
      const formattedDate = transformedDate.toISOString().split("T")[0];
      console.log(formattedDate);
      data.dateAvailable = formattedDate;
      console.log(data.hasAc);
      setFlatData(data);
      setCheck(data);
    };
    fetchFlatData();
  }, [id]);

  //Funcion para almacenar datos HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //constante para almacenar datos
    const newFlat = FormSubmit(form, FlatUpdateScheme);
    //Si la validacion es correcta, se almacenan los datos
    if (newFlat.success) {
      //Guardar flats en firebase
      await updateFlat(id, newFlat.data);
      await handleUpload(id);

      setMessage("Flat editado correctamente");
      setTimeout(() => {
        setMessage("");
        navigate("/all-flats");
      }, 1500);
    } else {
      //Si la validacion es incorrecta, se muestra el error
      setError(true);
      setMessage(newFlat.errorMessage);

      setTimeout(() => {
        setMessage("");
        setError(false);
      }, 1500);
    }
  };

  //FUNCION PARA IMAGENES
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.type.startsWith("image/")) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      alert("Selecciona una imagen");
    }
  };

  //Para subir la URL y actualizar el flat
  const handleUpload = async (flatID) => {
    if (imageFile) {
      imageFlatUpload(flatID, imageFile);
      setMessage("Imagen subida correctamente");
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
        <div className="flex justify-center items-center py-8 bg-white rounded-lg shadow-lg mx-4 my-8 max-w-3xl mx-auto p-6">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Flat</h2>
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
                <img
                  src={imagePreview ? imagePreview : flatData.flatImageURL}
                  alt="Image Flat"
                  className="w-full h-full object-cover rounded-full"
                />
              </label>
              <p className="text-xs mt-2 animate-slideUP text-center">
                {`Por favor, seleccione una imagen. (Opcional)`}
              </p>
            </div>
            <form className="mt-4" ref={form} onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Ciudad</label>
                  <input
                    name="city"
                    type="text"
                    defaultValue={flatData.city}
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
                    defaultValue={flatData.streetName}
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
                    defaultValue={flatData.streetNumber}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">{`Tamaño del area (m²)`}</label>
                  <input
                    name="areaSize"
                    type="number"
                    defaultValue={flatData.areaSize}
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
                    defaultChecked={flatData.hasAc ? "on" : undefined}
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
                    defaultValue={flatData.yearBuilt}
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
                    defaultValue={flatData.rentPrice}
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
                    defaultValue={flatData.dateAvailable}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {error ? (
                <p className="text-center text-sm pb-2 text-red-600">
                  {message}
                </p>
              ) : (
                <p className="text-center text-sm pb-2 text-green-600">
                  {message}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
