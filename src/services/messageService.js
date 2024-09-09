// Importación de funciones necesarias desde Firebase Firestore para manejar operaciones con la base de datos
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../config/FireBaseConfig";

// Función para buscar un usuario por su ID
export const searchUser = async (userId) => {
  // Referencia al documento del usuario en la colección "users"
  const userRef = doc(db, "users", userId);
  // Obtener los datos del documento
  const userData = await getDoc(userRef);

  // Verificar si el documento existe y devolver los datos del usuario o un mensaje si no existe
  if (userData.exists()) {
    return userData.data();
  } else {
    return console.log("El usuario no existe");
  }
};

// Función para obtener el historial de mensajes del usuario actualmente logueado
export const fetchHistoryMessages = async () => {
  // Obtener el ID del usuario logueado desde localStorage
  const userId = JSON.parse(localStorage.getItem("userLogged"));
  // Referencia a la colección de chats
  const roomChatsRef = collection(db, "chats");

  // Crear consultas para buscar los chats donde el usuario es participante1 o participante2
  const q1 = query(roomChatsRef, where("participante1.id", "==", userId));
  const q2 = query(roomChatsRef, where("participante2.id", "==", userId));

  // Ejecutar ambas consultas en paralelo
  const [roomChatsData1, roomChatsData2] = await Promise.all([
    getDocs(q1),
    getDocs(q2),
  ]);

  // Combinar los resultados de ambas consultas
  const fetchRoomChats = [
    ...roomChatsData1.docs.map((doc) => ({
      id: doc.id,
      participante1: doc.data().participante1,
      participante2: doc.data().participante2,
    })),
    ...roomChatsData2.docs.map((doc) => ({
      id: doc.id,
      participante1: doc.data().participante1,
      participante2: doc.data().participante2,
    })),
  ];

  // Devolver la lista de salas de chat
  return fetchRoomChats;
};

// Función para enviar un mensaje a una sala de chat
export const submitMessage = async (userLogged, userId, message) => {
  // Referencia a la colección de chats
  const chatsRef = collection(db, "chats");

  // Crear consultas para buscar una sala de chat existente entre los dos usuarios
  const q1 = query(
    chatsRef,
    where("participante1.id", "==", userLogged),
    where("participante2.id", "==", userId)
  );
  const q2 = query(
    chatsRef,
    where("participante1.id", "==", userId),
    where("participante2.id", "==", userLogged)
  );

  // Ejecutar ambas consultas en paralelo
  const [querySnapshot1, querySnapshot2] = await Promise.all([
    getDocs(q1),
    getDocs(q2),
  ]);

  let chatRoomId;

  // Si se encuentra una sala de chat existente, usar su ID; si no, crear una nueva sala de chat
  if (!querySnapshot1.empty) {
    chatRoomId = querySnapshot1.docs[0].id;
  } else if (!querySnapshot2.empty) {
    chatRoomId = querySnapshot2.docs[0].id;
  } else {
    // Buscar datos de los usuarios involucrados
    const userLoggedData = await searchUser(userLogged);
    const userIdData = await searchUser(userId);

    // Crear una nueva sala de chat y obtener su ID
    const newChatRoom = await addDoc(chatsRef, {
      participante1: {
        id: userLogged,
        name: userLoggedData.name,
        lastName: userLoggedData.lastName,
        profileImageURL: userLoggedData.profileImageURL,
      },
      participante2: {
        id: userId,
        name: userIdData.name,
        lastName: userIdData.lastName,
        profileImageURL: userIdData.profileImageURL,
      },
    });
    chatRoomId = newChatRoom.id;
  }

  // Referencia a la colección de mensajes dentro de la sala de chat específica
  const messagesRef = collection(doc(db, "chats", chatRoomId), "mensajes");

  // Agregar el nuevo mensaje a la colección de mensajes
  await addDoc(messagesRef, {
    Mensaje: message,
    Hora: Timestamp.now(), // Usar Timestamp.now() para registrar la hora actual
    userId: userLogged,
  });

  // Imprimir un mensaje en consola indicando que el mensaje ha sido agregado
  console.log(`Mensaje agregado a la sala de chat: ${chatRoomId}`);
};

// Función para escuchar los mensajes en tiempo real de una sala de chat específica
export const listenToMessages = (chatRoomID, callback) => {
  // Referencia a la colección de mensajes dentro de la sala de chat específica
  const messagesRef = collection(doc(db, "chats", chatRoomID), "mensajes");

  // Configuración del listener en tiempo real para actualizar los mensajes cuando cambien
  const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
    const messagesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // Llamar al callback proporcionado con los datos de los mensajes actualizados
    callback(messagesData);
  });

  // Retornar la función de desuscripción para detener la escucha cuando sea necesario
  return unsubscribe;
};
