import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, storage } from "../config/FireBaseConfig";
import { deleteObject, ref } from "firebase/storage";

//CRUD unicamente para usuarios.

//Referencia a la coleccion de usuarios.
const usersCollectionName = "users";
const usersCollectionRef = collection(db, usersCollectionName);

//Funcion para crear usuarios.
export const setUsers = async (usersData) => {
  const additionalData = {
    admin: false,
    saveFlats: 0,
  };

  const finalData = { ...usersData, ...additionalData };
  await addDoc(usersCollectionRef, finalData);
};

//Funcion para obtener usuarios.
export const getUsers = async () => {
  const usersData = await getDocs(usersCollectionRef);
  const users = usersData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
};

//Funcion para actualizar usuarios.
export const updateUsers = async (userID, dataUpdate) => {
  const userRef = doc(usersCollectionRef, userID);
  await updateDoc(userRef, dataUpdate);
};

// Función para eliminar todos los flats, el usuario y la imagen de perfil.
export const deleteUserAccount = async (userId) => {
  const batch = writeBatch(db);

  try {
    // Eliminar flats del usuario
    const flatsQuery = query(
      collection(db, "flats"),
      where("userId", "==", userId)
    );
    const flatsSnapshot = await getDocs(flatsQuery);
    flatsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Eliminar chats en los que el usuario es participante
    const chatsCollection = collection(db, "chats");
    const chatsQuery1 = query(
      chatsCollection,
      where("participant1.id", "==", userId)
    );
    const chatsQuery2 = query(
      chatsCollection,
      where("participant2.id", "==", userId)
    );

    // Obtener y eliminar chats donde el usuario es participante1
    const chatsSnapshot1 = await getDocs(chatsQuery1);
    chatsSnapshot1.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Obtener y eliminar chats donde el usuario es participante2
    const chatsSnapshot2 = await getDocs(chatsQuery2);
    chatsSnapshot2.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Eliminar el usuario
    const userDocRef = doc(db, "users", userId);
    batch.delete(userDocRef);

    // Eliminar la imagen de perfil del usuario
    const profilePicRef = ref(storage, `profilePictures/${userId}`);
    await deleteObject(profilePicRef);

    // Ejecutar todas las eliminaciones en una transacción
    await batch.commit();
    console.log(
      `Usuario con ID ${userId} y todos sus datos, incluyendo la imagen de perfil, han sido eliminados.`
    );
  } catch (error) {
    console.error("Error al eliminar la cuenta del usuario:", error);
  }
};

//CRUD unicamente para flats.
const flatsCollectionName = "flats";
const flatsCollectionRef = collection(db, flatsCollectionName);

export const getFlats = async () => {
  const flatsData = await getDocs(flatsCollectionRef); //obtiene los documentos de la coleccion
  const flats = flatsData.docs.map((doc) => ({ id: doc.id, ...doc.data() })); //obtiene las propiedades del documento
  return flats;
};

//Funcion para guardar la informacion desde el formulario de nuevo flat.
export const setFlats = async (flatsData) => {
  const flat = await addDoc(flatsCollectionRef, flatsData);
  return flat;
};

//Funcion para buscar los flats por ID
export const getFlatById = async (id) => {
  const flatRef = doc(db, flatsCollectionName, id);
  const flat = await getDoc(flatRef);
  return flat.data();
};

export const getUserById = async (id) => {
  const userRef = doc(db, usersCollectionName, id);
  const user = await getDoc(userRef);
  return user.data();
};

//Funcion para actualizar flats
export const updateFlat = async (id, updateFlatData) => {
  //Referencia al documento del flat
  const flatRef = doc(db, flatsCollectionName, id);
  //Actualización de los datos del flat
  await updateDoc(flatRef, updateFlatData);
};

//Funcion para consultar los flats por un arreglo de ID
export const getFlatsByIds = async (ids) => {
  //dos cosas, query y el segundo es un where
  console.log(ids);
  const flatsById = ids.map((id) => {
    const flatRef = doc(db, flatsCollectionName, id);
    return getDoc(flatRef);
  });

  const querySnapshot = await Promise.all(flatsById); //resolver promesas, en este caso es un array de promesas

  console.log(querySnapshot);

  const flats = querySnapshot.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return flats;
};
