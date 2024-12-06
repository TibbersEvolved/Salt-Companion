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
          <h2 className="text-4xl font-bold my-4 text-center">
            Welcome, {user?.firstName}!
          </h2>
          <div className="gap-10 flex items-center flex-row justify-center ">
            <GetTeacherBootCamp
              clerkId={user?.id as string}
              setSelectedBootCampId={setSelectedBootcampId}
              setSelectedBootCampName={setSelectedBootcamp}
            />
            <button
              className="px-4 text-2xl text-center text-white bg-[#fc7961] rounded-full hover:bg-[#f35b7e] transition duration-200"
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
              <div className="relative bg-white p-12 rounded-md shadow-md w-3/6 h-fit">
                <button
                  className="absolute top-5 right-5 btn btn-circle bg-white hover:bg-[#f35b7e] hover:text-white"
                  onClick={closeAddBootcamp}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h1 className="text-2xl font-bold">Add Bootcamp</h1>
                <CreateBootCamp clerkId={user?.id as string} />
              </div>
            </div>
          )}

          <div />
        </div>
      </div>
    </>
  );
};
