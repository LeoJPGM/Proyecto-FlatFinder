import { Navbar } from "../components/Navbar";
import { FlatsViewer } from "../components/FlatsViewer";
import { useFlats } from "../components/Flat";
import { useEffect, useState } from "react";
import { Filters } from "../components/Filters";

export const AllFlatsPage = () => {
  const flats = useFlats(); // Usar el hook para obtener los flats
  const [filteredFlats, setFilteredFlats] = useState([]);

  useEffect(() => {
    setFilteredFlats(flats);
  }, [flats]);

  const handleFilteredData = (filteredData) => {
    setFilteredFlats(filteredData);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Filters
          filterType="flats"
          data={flats}
          onFilteredData={handleFilteredData}
        />
        <FlatsViewer
          className="w-full md:w-3/4 p-4 overflow-y-auto"
          flats={filteredFlats}
        />
      </div>
    </div>
  );
};
