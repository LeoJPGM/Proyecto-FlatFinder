import { useEffect, useState } from "react";
import { imageProfileUpload } from "../services/FireStorage";
import defaultImage from "../assets/images/ProfileImage.png";
import { useNavigate } from "react-router-dom";
import { checkProfileImage } from "../services/authService";

export const ProfileWelcome = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageValidate = async () => {
      const hasProfileImage = await checkProfileImage();
      if (hasProfileImage) {
        navigate("/all-flats");
      } else {
        setLoading(false);
      }
    };

    imageValidate();
  }, [navigate]);

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

  const handleUpload = () => {
    if (imageFile) {
      const userID = JSON.parse(localStorage.getItem("userLogged"));
      imageProfileUpload(userID, imageFile);
      setMessage("Imagen subida correctamente");
      setTimeout(() => {
        navigate("/all-flats");
      }, 2000);
    }
  };

  const handleDefault = async () => {
    const userID = JSON.parse(localStorage.getItem("userLogged"));
    const response = await fetch(defaultImage);
    const blob = await response.blob();
    await imageProfileUpload(userID, blob);
    setTimeout(() => {
      navigate("/all-flats");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="mb-6 flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          className="hidden"
          onChange={handleImageChange}
        />
        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-32 h-32 border-4 border-gray-300 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          {imageFile ? (
            <img
              src={imagePreview}
              alt="Image Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <img
              src={defaultImage}
              alt="Default Image"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </label>
      </div>
      <p className="text-green-600 text-lg mb-4">{message}</p>
      <h1 className="text-3xl font-semibold text-gray-800">Bienvenido</h1>
      <p className="text-lg text-gray-600 mt-4 text-center animate-slideUP">
        Por favor seleccione una imagen de perfil para terminar la configuración
        de su cuenta.
      </p>
      {imageFile ? (
        <button
          onClick={handleUpload}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-sky-400 to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
        >
          Continuar
        </button>
      ) : (
        <button
          onClick={handleDefault}
          className="mt-6 px-6 py-3 text-blue-600 font-semibold underline hover:text-blue-800 transition-colors duration-300"
        >
          Omitir
        </button>
      )}
    </div>
  );
};
