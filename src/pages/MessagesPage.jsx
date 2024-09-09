import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchHistoryMessages,
  listenToMessages,
  searchUser,
  submitMessage,
} from "../services/messageService";

export const MessagesPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const [message, setMessage] = useState("");
  const [viewMessage, setViewMessage] = useState([]);
  const [historyChats, setHistoryChats] = useState([]);
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    profileImageURL: "",
  });
  const [users, setUsers] = useState({});
  const [unsubscribe, setUnsubscribe] = useState(null); // Para almacenar la función de desuscripción
  const [isSending, setIsSending] = useState(false); // Nuevo estado para manejar el botón

  const fetchUserData = async (user) => {
    const userData = await searchUser(user);
    setUser(userData);
  };

  const fetchHistoryData = async () => {
    const historyData = await fetchHistoryMessages();
    setHistoryChats(historyData);
  };

  useEffect(() => {
    if (userId === userLogged) {
      alert("No puedes chatear contigo mismo");
      navigate("/all-flats");
    }

    if (!userId) {
      console.log("Sin usuarios");
    } else {
      fetchUserData(userId);
    }
  }, [userId, userLogged, navigate]);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  useEffect(() => {
    // Limpiar el listener cuando el componente se desmonte
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [unsubscribe]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleHistory = async (chatRoom, userSelect) => {
    // Configurar el listener en tiempo real
    const unsubscribeFunc = listenToMessages(chatRoom, (mensajes) => {
      setViewMessage(mensajes);
    });

    setUsers(userSelect);

    if (userSelect.user1 === userLogged) {
      fetchUserData(userSelect.user2);
    } else {
      fetchUserData(userSelect.user1);
    }

    setUnsubscribe(() => unsubscribeFunc); // Guardar la función de desuscripción
  };

  const handleSubmit = async () => {
    if (message.trim() === "") {
      console.log("Este campo no puede estar vacío");
      return;
    }

    if (isSending) return; // No hacer nada si ya se está enviando un mensaje

    setIsSending(true); // Deshabilitar el botón

    try {
      // Enviar el mensaje
      if (userId) {
        await submitMessage(userLogged, userId, message);
      } else {
        const recipientId =
          userLogged === users.user1 ? users.user2 : users.user1;
        await submitMessage(userLogged, recipientId, message);
      }

      // Crear un objeto para el nuevo mensaje
      const newMessage = {
        id: new Date().toISOString(), // Crear un ID único para el nuevo mensaje
        Mensaje: message,
        Hora: new Date(),
        userId: userLogged,
      };

      // Limpiar el campo del mensaje
      setMessage("");

      // Actualizar el estado para incluir el nuevo mensaje
      setViewMessage((prevMessages) => [newMessage, ...prevMessages]);
    } finally {
      // Volver a habilitar el botón después de 1 segundo
      setTimeout(() => setIsSending(false), 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen font-inter">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 h-full border-r overflow-y-auto pt-4">
          <h1 className="text-2xl font-bold pl-4 pt-2 pb-2 border-b">Chats</h1>
          <div>
            {historyChats
              ? historyChats.map((chat) => (
                  <ul key={chat.id}>
                    <li>
                      <button
                        onClick={() =>
                          handleHistory(chat.id, {
                            user1: chat.participante1.id,
                            user2: chat.participante2.id,
                          })
                        }
                        className="w-full p-5 text-left border-b"
                      >
                        {chat.participante1.id === userLogged ? (
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10">
                              <img
                                src={chat.participante2.profileImageURL}
                                alt="userImage"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <p>
                              {`${chat.participante2.name} ${chat.participante2.lastName}`}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10">
                              <img
                                src={chat.participante1.profileImageURL}
                                alt="userImage"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <p>
                              {`${chat.participante1.name} ${chat.participante1.lastName}`}
                            </p>
                          </div>
                        )}
                      </button>
                    </li>
                  </ul>
                ))
              : "No hay chats disponibles"}
          </div>
        </div>
        {user.name && user.lastName ? (
          <div className="flex-1 flex flex-col">
            <div className="p-3 border-b flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <div className="w-10 h-10">
                  <img
                    src={user.profileImageURL}
                    alt="userImage"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h2>
                  {user.name} {user.lastName}
                </h2>
              </div>
              <p className="text-sm font-semibold">{user.email}</p>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide p-3">
              {/* Contenedor de mensajes con scroll vertical */}
              <div className="flex flex-col-reverse gap-5">
                {viewMessage
                  .sort((a, b) => {
                    // Asegúrate de que 'Hora' sea un Timestamp y conviértelo a Date
                    const aHora = a.Hora.toDate
                      ? a.Hora.toDate()
                      : new Date(a.Hora);
                    const bHora = b.Hora.toDate
                      ? b.Hora.toDate()
                      : new Date(b.Hora);
                    return bHora - aHora; // Ordenar más reciente primero
                  })
                  .map((message) =>
                    message.userId === userLogged ? (
                      <p
                        key={message.id}
                        className="w-1/5 bg-sky-400 rounded-md p-1 self-end flex justify-between"
                      >
                        {message.Mensaje}
                        <span className="text-xs flex flex-col-reverse">
                          {message.Hora.toDate
                            ? message.Hora.toDate().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            : new Date(message.Hora).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                        </span>
                      </p>
                    ) : (
                      <p
                        key={message.id}
                        className="w-1/5 bg-gray-300 rounded-md p-1 flex justify-between"
                      >
                        {message.Mensaje}
                        <span className="text-xs flex flex-col-reverse">
                          {message.Hora.toDate
                            ? message.Hora.toDate().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            : new Date(message.Hora).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                        </span>
                      </p>
                    )
                  )}
              </div>
            </div>
            <div className="p-3 border-t flex items-center bg-white">
              <input
                className="w-full border pl-1 outline-none"
                value={message}
                onChange={handleChange}
                type="text"
                placeholder="Escribe un mensaje"
              />
              <Icon
                className={`text-3xl ml-3 cursor-pointer ${
                  isSending ? "text-gray-500" : ""
                }`} // Cambiar estilo si el botón está deshabilitado
                onClick={handleSubmit}
                icon="material-symbols:send-outline"
                style={{ pointerEvents: isSending ? "none" : "auto" }} // Deshabilitar el clic
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <p className="text-xm">Empieza a comunicarte con alguien</p>
              <Icon className="text-xl" icon="tabler:message-x" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
