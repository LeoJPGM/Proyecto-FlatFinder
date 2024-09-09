// Importa funciones de Firebase Firestore para obtener documentos y referencias.
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/FireBaseConfig"; // Importa la configuración de Firestore.
import { getUsers, setUsers } from "./FireBase"; // Importa funciones para obtener y establecer usuarios en la base de datos.

// Función para registrar un nuevo usuario
export const registerUser = async (registerData) => {
  // Verifica si el registro tiene éxito, si no, devuelve un mensaje de error.
  if (!registerData.success) {
    return { success: true, message: registerData.errorMessage };
  }

  try {
    // Obtiene la lista de usuarios existentes.
    const data = await getUsers();
    // Verifica si el email proporcionado ya está registrado.
    const emailExists = data.some(
      (user) => user.email === registerData.data.email
    );

    // Si el email ya está registrado, devuelve un mensaje correspondiente.
    if (emailExists) {
      return { success: true, message: "Email ya registrado" };
    }

    // Si el email no está registrado, añade el nuevo usuario a la base de datos.
    await setUsers(registerData.data);

    // Devuelve un mensaje de éxito indicando que el usuario fue registrado correctamente.
    return { success: false, message: "Usuario registrado correctamente" };
  } catch (error) {
    // Maneja cualquier error durante el proceso de registro y devuelve un mensaje de error.
    return { success: true, message: "Error en el registro" };
  }
};

// Función para autenticar un usuario
export const authenticateUser = async (loginData) => {
  // Verifica si el inicio de sesión tiene éxito, si no, devuelve un mensaje de error.
  if (!loginData.success) {
    return { success: true, message: loginData.errorMessage };
  }

  try {
    // Obtiene la lista de usuarios existentes.
    const data = await getUsers();
    // Busca el usuario con el email proporcionado.
    const userValidate = data.find(
      (user) => user.email === loginData.data.email
    );

    // Si el usuario no está registrado, devuelve un mensaje de error.
    if (!userValidate) {
      return { success: true, message: "Usuario no registrado" };
    }

    // Verifica si la contraseña proporcionada coincide con la almacenada.
    const passwordValidate = userValidate.password === loginData.data.password;
    if (!passwordValidate) {
      return { success: true, message: "Contraseña incorrecta" };
    }

    // Devuelve un mensaje de éxito e información del usuario autenticado.
    return {
      success: false,
      message: "Autenticado Correctamente",
      userId: userValidate.id,
    };
  } catch (error) {
    // Maneja cualquier error durante el proceso de autenticación y devuelve un mensaje de error.
    return { success: true, message: "Error en la autenticación" };
  }
};

// Función para verificar la imagen de perfil de un usuario
export const checkProfileImage = async () => {
  // Obtiene el ID del usuario desde el almacenamiento local.
  const userID = JSON.parse(localStorage.getItem("userLogged"));
  // Crea una referencia al documento del usuario en la base de datos.
  const userDoc = doc(db, "users", userID);
  // Obtiene el documento del usuario.
  const userSnapshot = await getDoc(userDoc);

  // Verifica si el documento existe y si tiene una URL de imagen de perfil.
  return userSnapshot.exists() && userSnapshot.data().profileImageURL;
};
