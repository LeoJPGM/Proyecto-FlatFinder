import { Icon } from "@iconify/react";
import heartIcon from "@iconify-icons/mdi/heart";
import pencilIcon from "@iconify-icons/mdi/pencil";

export const Flat = ({ image, city, country, address, description, price }) => {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <img className="w-full" src={image} alt={`${city}, ${country}`} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {city}, {country}
          </div>
          <p className="text-gray-700 text-base font-bold">{address}</p>
          <p className="text-gray-700 text-base mt-2">{description}</p>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Icon icon={heartIcon} className="text-red-500 cursor-pointer" />
            <Icon icon={pencilIcon} className="text-gray-500 cursor-pointer" />
          </div>
          <div className="text-xl font-bold">${price}</div>
        </div>
      </div>
    </div>
  );
};

export default Flat;
