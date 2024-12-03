import { useState } from "react";
import { CreateBootCamp } from "./add-bootcamp";
import { ManageBootcamp } from "./ManageBootcamp";
import { useUser } from "@clerk/clerk-react";
import { GetTeacherBootCamp } from "./get-teacher-bootcamps";
import { TopicSelect } from "./topic-select";

export const Teacher = () => {
  const [selectedBootcamp, setSelectedBootcamp] = useState("");
  const [showManageBootcamp, setShowManageBootcamp] = useState(false);
  const [showAddBootcamp, setShowAddBootcamp] = useState(false);
  const [showManageStudent, setShowMAnageStudent] = useState(false);

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
      <div className="w-screen h-screen flex items-start flex-row justify-center bg-[#ebebeb]">
        {/* <select
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
          onClick={handleManageBootcamp}
        >
          Handle bootcamp
        </button> */}
        <TopicSelect bootCampId={1} />

        <GetTeacherBootCamp clerkId={user?.id as string} />

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
      </div>
      <ManageBootcamp
        selectedBootcamp={selectedBootcamp}
        onClose={closeManageBootcamp}
      />
      {showManageBootcamp && (
        <ManageBootcamp
          selectedBootcamp={selectedBootcamp}
          onClose={closeManageBootcamp}
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
            <h1>Manage Student</h1>
            <ul>
              <li>Lisa</li>
              <li>Clara</li>
              <li>Benny</li>
              <li>Ptheven</li>
            </ul>

            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
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
