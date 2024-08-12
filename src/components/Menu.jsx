import { InlineIcon } from "@iconify/react/dist/iconify.js";

export const menuLogged = () => {
  return (
    <aside className="container w-60 h-96 rounded-lg border font-inter">
      <div className="border-b p-3">
        <h1 className="font-normal">HOLA, JULIAN ALVARADO</h1>
      </div>

      <h2 className="p-3 font-thin">MENU</h2>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between rounded-lg p-2 hover:bg-blue-100 cursor-pointer">
          <div className="bg-blue-intensity w-7 h-7 rounded-full flex items-center justify-center">
            <InlineIcon
              className="w-5 h-5 text-white"
              icon="mingcute:profile-line"
            />
          </div>
          <h3 className="pt-1 pr-20 font-light text-blue-intensity-100">
            Mi perfil
          </h3>
          <InlineIcon
            className="w-3 h-6 mt-1 text-neutral-600"
            icon="weui:arrow-filled"
          />
        </div>

        <div className="flex justify-between rounded-lg p-2 hover:bg-green-100 cursor-pointer">
          <div className="bg-green-intensity w-7 h-7 rounded-full flex items-center justify-center">
            <InlineIcon className="w-5 h-5 text-white" icon="ph:users-bold" />
          </div>
          <h3 className="pt-1 pr-1 font-light text-green-intensity-100">
            Todos los usuarios
          </h3>
          <InlineIcon
            className="w-3 h-6 mt-1 text-neutral-600"
            icon="weui:arrow-filled"
          />
        </div>

        <div className="flex justify-between rounded-lg p-2 hover:bg-red-100 cursor-pointer">
          <div className="bg-red-intensity w-7 h-7 rounded-full flex items-center justify-center">
            <InlineIcon
              className="w-5 h-5 text-white"
              icon="tdesign:user-clear"
            />
          </div>
          <h3 className="pt-1 pr-6 font-light text-red-intensity-100">
            Eliminar cuenta
          </h3>
          <InlineIcon
            className="w-3 h-6 mt-1 text-neutral-600"
            icon="weui:arrow-filled"
          />
        </div>

        <div className="flex justify-between rounded-lg p-2 hover:bg-orange-100 cursor-pointer">
          <div className="bg-brown-intensity w-7 h-7 rounded-full flex items-center justify-center">
            <InlineIcon
              className="w-5 h-5 text-white"
              icon="pepicons-pop:leave"
            />
          </div>
          <h3 className="pt-1 pr-105 font-light text-brown-intensity-100">
            Salir
          </h3>
          <InlineIcon
            className="w-3 h-6 mt-1 text-neutral-600"
            icon="weui:arrow-filled"
          />
        </div>
      </div>
    </aside>
  );
};

export const menuRegister = () => {
  return (
    <aside className="container w-60 h-96 rounded-lg border font-inter">
      <div className="border-b p-3">
        <h1 className="font-normal">BIENVENIDO</h1>
      </div>

      <h2 className="p-3 font-thin">MENU</h2>

      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between rounded-lg p-2 hover:bg-orange-100 cursor-pointer">
          <div className="bg-orange-500 w-7 h-7 rounded-full flex items-center justify-center">
            <InlineIcon
              className="w-5 h-5 text-white rotate-180"
              icon="pepicons-pop:leave"
            />
          </div>
          <h3 className="pt-1 pr-20 font-light text-orange-600">Ingresar</h3>
          <InlineIcon
            className="w-3 h-6 mt-1 text-neutral-600"
            icon="weui:arrow-filled"
          />
        </div>

        <div className="flex justify-between rounded-lg p-2 hover:bg-lime-100 cursor-pointer">
          <div className="bg-lime-500 w-7 h-7 rounded-full flex items-center justify-center">
            <InlineIcon className="w-5 h-5 text-white" icon="mdi:register" />
          </div>
          <h3 className="pt-1 pr-14 font-light text-lime-600">Registrarse</h3>
          <InlineIcon
            className="w-3 h-6 mt-1 text-neutral-600"
            icon="weui:arrow-filled"
          />
        </div>
      </div>
    </aside>
  );
};
