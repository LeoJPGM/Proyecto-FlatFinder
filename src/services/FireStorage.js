// Importa las funciones necesarias del módulo de Firebase Storage.
import {
  getDownloadURL,
  uploadBytes,
  ref,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/FireBaseConfig"; // Importa la configuración del almacenamiento de Firebase.
import { updateUsers, updateFlat } from "./FireBase"; // Importa funciones para actualizar usuarios y flats en la base de datos.

// Función para subir una imagen de perfil del usuario a Firebase Storage
export const imageProfileUpload = async (userID, file) => {
  // Crea una referencia a la ubicación en el almacenamiento de Firebase donde se almacenará la imagen.
  const storageRef = ref(storage, `profilePictures/${userID}`);

  // Sube el archivo a la referencia especificada.
  uploadBytes(storageRef, file)
    .then((snapshot) => {
      // Obtiene la URL de descarga del archivo subido.
      getDownloadURL(snapshot.ref).then((url) => {
        // Actualiza la base de datos de usuarios con la URL de la imagen de perfil.
        updateUsers(userID, { profileImageURL: url });
      });
    })
    .catch((error) => {
      // Maneja cualquier error que ocurra durante la carga o la obtención de la URL.
      return { succes: false, message: error.message };
    });
};

// Función para subir una imagen de un flat a Firebase Storage
export const imageFlatUpload = async (flatID, file) => {
  // Crea una referencia a la ubicación en el almacenamiento de Firebase donde se almacenará la imagen.
  const storageRef = ref(storage, `flatsPictures/${flatID}`);

  // Sube el archivo a la referencia especificada.
  uploadBytes(storageRef, file)
    .then((snapshot) => {
      // Obtiene la URL de descarga del archivo subido.
      getDownloadURL(snapshot.ref).then((url) => {
        // Actualiza la base de datos de flats con la URL de la imagen del flat.
        updateFlat(flatID, { flatImageURL: url });
      });
    })
    .catch((error) => {
      // Maneja cualquier error que ocurra durante la carga o la obtención de la URL.
      return { succes: false, message: error.message };
    });
};

// Función para eliminar la imagen de un flat en Firebase Storage
export const deleteFlatImage = async (flatID) => {
  // Crea una referencia a la ubicación en el almacenamiento de Firebase donde se encuentra la imagen del flat.
  const storageRef = ref(storage, `flatsPictures/${flatID}`);

  // Elimina el archivo de la referencia especificada.
  await deleteObject(storageRef);
};
