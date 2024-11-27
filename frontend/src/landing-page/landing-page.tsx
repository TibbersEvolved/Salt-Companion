import { SignedIn, UserProfile, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { mockedCourseData } from "../mocked/mocked-data";
import Select from "react-select";
import { useState } from "react";

export const LandingPage = () => {
  const { user } = useUser();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
    console.log(selected);
  };

  return (
    <div className="m-0 p-0 overflow-hidden place-content-center">
      <SignedIn>
        <div className="m-0 p-0 bg-slate-600 w-screen h-screen items-center grid grid-cols-1">
          <h2 className="text-center text-5xl">
            Welcome {user?.firstName} ID:{user?.id}
          </h2>

          <div className="grid grid-cols-1 ">
            <Select
              isMulti
              name="colors"
              options={mockedCourseData}
              className="text-black w-1/2"
              classNamePrefix="select"
              onChange={handleChange}
            />
          </div>
          <button className="text-5xl border-solid rounded-lg border-2 border-black w-fit">
            Next
          </button>
        </div>
        <div className="w-screen h-screen overflow-hidden bg-white grid  ">
          <h2 className="text-center text-5xl">Stats</h2>
          <div className="border border-black h-10/12 w-3/4">
            <h2>buncha scool stats</h2>
          </div>
        </div>
      </SignedIn>
    </div>
  );
};
