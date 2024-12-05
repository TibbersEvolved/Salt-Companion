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
  const [showManageStudent, setShowMAnageStudent] = useState(false);
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

  const handleShowManageStudent = () => {
    setShowMAnageStudent(true);
  };

  const closeManageBootcamp = () => {
    setShowManageBootcamp(false);
  };

  const closeAddBootcamp = () => {
    setShowAddBootcamp(false);
  };

  const closeShowManageStudent = () => {
    setShowMAnageStudent(false);
  };

  return (
    <>
      <div className="w-screen h-200 flex items-start flex-row justify-center bg-[#ebebeb]">
        <GetTeacherBootCamp
          clerkId={user?.id as string}
          setSelectedBootCampId={setSelectedBootcampId}
          setSelectedBootCampName={setSelectedBootcamp}
        />
        <button
          className="mt-10 ml-8 pr-4 pl-4 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
          onClick={handleAddBootcamp}
        >
          Add a Bootcamp
        </button>
        <div>
          <button
            className="mt-10 ml-8 pr-4 pl-4 text-center text-black bg-[#ebebeb] border border-3 border-black rounded-md"
            onClick={handleShowManageStudent}
          >
            Handle students
          </button>
        </div>
        teacher-container ////////////
      </div>
      <ManageBootcamp
        selectedBootcamp={selectedBootcamp}
        onClose={closeManageBootcamp}
        bootCampId={selectedBootcampId}
      />
      {showManageBootcamp && (
        <ManageBootcamp
          selectedBootcamp={selectedBootcamp}
          onClose={closeManageBootcamp}
          bootCampId={selectedBootcampId}
        />
      )}

      {showAddBootcamp && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6">
            <h1>Add Bootcamp</h1>
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

      {showManageStudent && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6">

            <Students bootCampId={selectedBootcampId} />
            <br />
            <button
              className="px-4 py-2 bg-black text-white rounded-md mt-auto mb-auto"
              onClick={closeShowManageStudent}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
