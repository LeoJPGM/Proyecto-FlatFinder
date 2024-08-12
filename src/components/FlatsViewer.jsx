import PropTypes from "prop-types";
import { Icon } from "@iconify/react";

export const FlatsViewer = ({ className }) => {
  return (
    <div className={`container h-screen w-3/4 border-l ${className}`}>
      <div className="font-inter h-screen flex flex-col items-center justify-center">
        <p>NO HAY FLATS REGISTRADOS</p>
        <Icon className="text-3xl" icon="tabler:exclamation-circle" />
      </div>
    </div>
  );
};

FlatsViewer.propTypes = {
  className: PropTypes.string,
};
