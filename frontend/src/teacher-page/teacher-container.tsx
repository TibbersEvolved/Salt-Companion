import { useState } from "react";
import { CreateBootCamp } from "./add-bootcamp";

export const Teacher = () => {
  const [selectedBootcamp, setSelectedBootcamp] = useState("");
  const [showSelectedBootcamp, setShowSelectedBootcamp] = useState(false);
  const [showAddBootcamp, setShowAddBootcamp] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBootcamp(e.target.value);
  };

  const handleAddBootcamp = () => {
    setShowAddBootcamp(true);
  };

  const handleSelectBootcamp = () => {
    if (selectedBootcamp) {
      setShowSelectedBootcamp(true);
    } else {
      alert("Please select a bootcamp first.");
    }
  };

  const closeSelectedBootcamp = () => {
    setShowSelectedBootcamp(false);
  };

  const closeAddBootcamp = () => {
    setShowAddBootcamp(false);
  };

  return (
    <>
      <div className="w-screen h-screen flex items-start flex-row justify-center bg-[#ebebeb]">
        <select
          className="mt-10 w-1/6 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
          value={selectedBootcamp}
          onChange={handleSelectChange}
        >
          <option value="">Select bootcamp</option>
          <option value="jfs">JFS Java</option>
          <option value="jsfs">JFSF JavaScript</option>
          <option value="dnfs">DNFS .Net/C#</option>
        </select>
        <button
          className="mt-10 ml-8 pr-4 pl-4 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
          onClick={handleSelectBootcamp}
        >
          Handle bootcamp
        </button>

        <button
          className="mt-10 ml-8 pr-4 pl-4 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
          onClick={handleAddBootcamp}
        >
          Add a Bootcamp
        </button>
      </div>

      {showSelectedBootcamp && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6">
            <p className="text-black text-lg">
              {selectedBootcamp === "jfs"
                ? "JFS Java"
                : selectedBootcamp === "jsfs"
                  ? "JFSF JavaScript"
                  : "DNFS .Net/C#"}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
              onClick={closeSelectedBootcamp}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showAddBootcamp && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6">
            <h1>Add Bootcamp</h1>
            <CreateBootCamp />
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
              onClick={closeAddBootcamp}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
