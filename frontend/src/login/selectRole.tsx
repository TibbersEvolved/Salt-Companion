import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import axios from "axios";
import LoadingScreen from "../services/loadingScreen";


export default function SelectRole(prop: props) {
  const { user } = useUser();
  const navigate = useNavigate();


  const name = user?.firstName;
  const base_url = import.meta.env.VITE_BASE_URL;

  const { isPending, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(`${base_url}/students/user/${prop.clerkId}`);
      return response.data;
    },
  });

  // 1 = isStudent, 2= isTeacher
  const handleRole2 = async (role: number) => {
    try {
      if (role === 1) {
        const response = await axios.post(`${base_url}/students`, {
          name: name,
          id: prop.clerkId,
        });
        console.log("Student role selected and user posted:", response.data);
        navigate({ to: "/landing" });
      } else if (role === 2) {
        const response = await axios.post(`${base_url}/teachers`, {
          name: name,
          id: prop.clerkId,
          email: "TBD",
        });
        console.log("Teacher role selected and user posted:", response.data);
        navigate({ to: "/teacher" });
      }
    } catch (error) {
      console.error("Error submitting role:", error);
    }
  };

  if (isPending) return <LoadingScreen displayText="" />

  if (error) return <div>Error: {error.message}</div>;
  console.log("Data: " + data);

  if (data.userType == 1) {
    navigate({ to: "/landing" });
  } else if (data.userType == 2) {
    navigate({ to: "/teacher" });
  }

  const handleRoleSelection = async (role: number) => {
    console.log(`Role selected: ${role}`);
    const url = `${base_url}/students/user/${prop.clerkId}`;

    try {
      const response = await axios.get(url);
      console.log(response.data);

      const { userType } = response.data;

      if (userType === 0) {
        const createUser = { name: name, clerkId: prop.clerkId };
        await axios.post(`${base_url}/students`, createUser);
        console.log(`created user ${createUser}`);
      }

      if (role === 1) {
        console.log("Navigating to /landing");
        navigate({ to: "/landing" });
      } else if (role === 2) {
        console.log("Navigating to /teacher");
        navigate({ to: "/teacher" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error submitting role:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-4xl p-6 flex flex-col items-center">
        <p className="text-3xl font-light">Choose your role</p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleRoleSelection(1)}
            className="m-6 bg-[#fc7961] text-white h-10 w-24 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
          >
            Student
          </button>
          <button
            onClick={() => handleRoleSelection(2)}
            className="m-6 bg-[#fc7961] text-white h-10 w-24 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200"
          >
            Teacher
          </button>
        </div>
      </div>
    </div>
  );
}

type props = {
  clerkId: String;
}