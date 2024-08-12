import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import PropTypes from "prop-types";

export const Message = ({ className }) => {
  const [desplegado, setDesplegado] = useState(false);

  const toggleDesplegado = () => {
    setDesplegado(!desplegado);
  };

  return (
    <div className={`w-60 border rounded font-inter shadow-md ${className}`}>
      <div onClick={toggleDesplegado} className="border-b p-2 cursor-pointer">
        <h2 className="font-medium">Mensajes</h2>
      </div>
      {desplegado && (
        <div className="p-2 h-96 flex justify-center items-center transition-all duration-300 ease-in-out">
          <div className="font-light flex flex-col items-center">
            <p>No tienes ningun mensaje</p>
            <InlineIcon className="text-2xl" icon="tabler:message-2-x" />
          </div>
        </div>
      )}
    </div>
  );
};

Message.propTypes = {
  className: PropTypes.string,
};
