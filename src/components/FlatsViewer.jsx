import PropTypes from "prop-types";
import { Flat } from "./Flat";

export const FlatsViewer = ({ className, flats, onDeleteFlat }) => {
  return (
    <div className={`container ${className}`}>
      {flats && flats.length > 0 ? (
        <div className="flex flex-wrap gap-8 justify-center">
          {flats.map((flat) => (
            <div key={flat.id} className="cursor-pointer">
              <Flat
                {...flat}
                key={flat.id} // Agrega esta línea
                flat={flat} // Agrega esta línea
                onDeleteFlat={onDeleteFlat} // Agrega esta línea
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="font-inter h-full flex flex-col items-center justify-center">
          <p>NO HAY FLATS REGISTRADOS</p>
        </div>
      )}
    </div>
  );
};

FlatsViewer.propTypes = {
  className: PropTypes.string,
  flats: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      streetName: PropTypes.string.isRequired,
      streetNumber: PropTypes.number.isRequired,
      areaSize: PropTypes.number.isRequired,
      hasAc: PropTypes.bool.isRequired,
      yearBuilt: PropTypes.number.isRequired,
      rentPrice: PropTypes.number.isRequired,
      dateAvailable: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};
