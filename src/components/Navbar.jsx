import { Icon } from "@iconify/react";
import homeIcon from "@iconify-icons/mdi/home";
import heartIcon from "@iconify-icons/mdi/heart";
import messageIcon from "@iconify-icons/mdi/message";
import menuIcon from "@iconify-icons/mdi/menu";
import accountIcon from "@iconify-icons/mdi/account";

export const Navbar = () => {
  return (
    <>
      <div className="flex">
        <div className="text-2xl w-full font-bold flex justify-start p-4 bg-gray-100">
          FLATFINDER
        </div>
        <div className="text-base w-48 flex items-center justify-start p-4 bg-gray-100">
          <Icon icon={homeIcon} className="mr-2" />
          MIS FLATS
        </div>
        <div className="text-base W-40 flex items-center justify-start p-4 bg-gray-100">
          <Icon icon={heartIcon} className="mr-2" />
          FAVORITOS
        </div>
        <div className="text-base W-40 flex items-center justify-start p-4 bg-gray-100">
          <Icon icon={messageIcon} className="mr-2" />
          MENSAJES
        </div>
        <div className="flex items-center justify-start p-4 bg-gray-100">
          <Icon
            icon={menuIcon}
            className="text-2xl transition-colors duration-300 hover:text-red-500"
          />
          <Icon
            icon={accountIcon}
            className="text-2xl transition-colors duration-300 hover:text-red-500"
          />
        </div>
      </div>
    </>
  );
};
