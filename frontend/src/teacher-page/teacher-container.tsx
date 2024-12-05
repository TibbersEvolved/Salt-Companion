import { useState } from "react";
import { CreateBootCamp } from "./add-bootcamp";
import { ManageBootcamp } from "./ManageBootcamp";
import { useUser } from "@clerk/clerk-react";
import { GetTeacherBootCamp } from "./get-teacher-bootcamps";
import { TopicSelect } from "./topic-select";
import { Students } from "./studentManagement";
import { GetAllStudents } from "./fetchGetAllStudents";
import toast, { Toaster } from "react-hot-toast";

export const Teacher = () => {
  const [selectedBootcamp, setSelectedBootcamp] = useState(
    "No Bootcamp Selected"
  );
  const [showManageBootcamp, setShowManageBootcamp] = useState(false);
  const [showAddBootcamp, setShowAddBootcamp] = useState(false);

  const [selectedBootcampId, setSelectedBootcampId] = useState<number>(0);

  const { user } = useUser();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBootcamp(e.target.value);
  };

  const handleAddBootcamp = () => {
    setShowAddBootcamp(true);
  };

  const handleManageBootcamp = () => {
    if (selectedBootcamp) {
      setShowManageBootcamp(true);
    } else {
      alert("Please select a bootcamp first.");
    }
  };

  const closeManageBootcamp = () => {
    setShowManageBootcamp(false);
  };

  const closeAddBootcamp = () => {
    setShowAddBootcamp(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white shadow-md rounded-2xl w-full max-w-6xl p-6 grid grid-cols-1 gap-8">
          <div className=" flex items-center flex-row justify-center ">
            <GetTeacherBootCamp
              clerkId={user?.id as string}
              setSelectedBootCampId={setSelectedBootcampId}
              setSelectedBootCampName={setSelectedBootcamp}
            />
            <button
              className=" pr-4 pl-4 text-center text-white bg-[#fc7961] border border-3 border-black rounded-md hover:bg-[#f35b7e] transition duration-200"
              onClick={handleAddBootcamp}
            >
              +
            </button>
          </div>
          <ManageBootcamp
            selectedBootcamp={selectedBootcamp}
            onClose={closeManageBootcamp}
            bootCampId={selectedBootcampId}
          />

          {showAddBootcamp && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-md w-3/6 h-fit">
                <h1 className="text-lg font-bold">Add Bootcamp</h1>
                <CreateBootCamp clerkId={user?.id as string} />

                <button
                  className="mt-4 px-4 py-2 bg-black text-white rounded-md"
                  onClick={closeAddBootcamp}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div />
        </div>
      </div>
    </>
  );
};
