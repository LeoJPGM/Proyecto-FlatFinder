import { useEffect, useRef, useState } from "react";
import { FormSubmit } from "../helpers/FormSubmit";
import { LoginScheme, RegisterScheme } from "../helpers/Schemes";
import { authenticateUser, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const LoginForm = () => {
  const formLogin = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userLogged = localStorage.getItem("userLogged");

    if (userLogged) {
      navigate("/all-flats");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = FormSubmit(formLogin, LoginScheme);
    const result = await authenticateUser(login);

    if (result.success) {
      setError(result.success);
      setMessage(result.message);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } else {
      setError(result.success);
      setMessage(result.message);
      setTimeout(() => {
        setMessage("");
        const userID = result.userId;
        localStorage.setItem("userLogged", JSON.stringify(userID));
        navigate("/profile-welcome");
      }, 1500);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} ref={formLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          {error ? (
            <p className="text-center text-sm pb-2 text-red-600">{message}</p>
          ) : (
            <p className="text-center text-sm pb-2 text-green-600">{message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const RegisterForm = () => {
  const formRegister = useRef(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const register = FormSubmit(formRegister, RegisterScheme);
    const result = await registerUser(register);

    if (result.success) {
      setError(result.success);
      setMessage(result.message);
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } else {
      setError(result.success);
      setMessage(result.message);
      setTimeout(() => {
        setMessage("");
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="h-96 overflow-y-auto overflow-hidden scrollbar-hide"
        ref={formRegister}
      >
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Apellido</label>
          <input
            type="text"
            name="lastName"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de nacimiento</label>
          <input
            type="date"
            name="birthday"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirmar Contraseña</label>
          <input
            type="password"
            name="confPassword"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          {error ? (
            <p className="text-center text-sm pb-2 text-red-600">{message}</p>
          ) : (
            <p className="text-center text-sm pb-2 text-green-600">{message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      className="flex justify-center items-center h-screen font-inter relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.admagazine.com/photos/6467b71e70d3fa4f8a2aa26c/16:9/w_1920,c_limit/FedeC-LowRes7463.jpg')",
      }}
    >
      <div className="relative w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-1/2 flex flex-col rounded-lg justify-center items-center bg-gradient-to-br from-pink-100 to-orange-100 text-black p-8">
          <div className="flex flex-col gap-5 items-center justify-center">
            <h2 className="text-4xl text-center font-bold">
              {isLogin ? "Bienvenido" : "Hola"}
            </h2>
            <div className="text-lg flex flex-col items-center gap-3">
              {isLogin ? (
                <>
                  <p>Por favor, inicia sesión</p>
                  <Icon
                    className="text-5xl"
                    icon="material-symbols:interactive-space-rounded"
                  />
                </>
              ) : (
                <>
                  <p>Regístrate con nosotros</p>
                  <Icon
                    className="text-5xl"
                    icon="material-symbols:person-pin-rounded"
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 p-8">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="text-center mt-4">
            {isLogin ? (
              <p>No tienes una cuenta?</p>
            ) : (
              <p>Ya tienes una cuenta?</p>
            )}
          </div>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {isLogin ? "Registrarse" : "Autenticarse"}
          </button>
        </div>
      </div>
    </div>
  );
};
