import { useEffect, useState } from "react";
import { base_url } from "../services/api";
import { Student } from "./types";
import LoadingScreen from "../services/loadingScreen";
import toast, { useToaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { requirePropFactory } from "@mui/material";

export const Students = (prop: props) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);


  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchStudents"],
    queryFn: () => fetchBootCampStudents(prop.bootCampId),
  });

  if (isLoading)
    return <div>loading</div>
  if (isError) return <div>Server Error, please try again later</div>;



  return (
    <div>
      <h1>Students</h1>
      {data.length > 0 && (
        <ul className="list-disc ">
          {data.map((student) => (
            <li key={student.clerkId}>
              <p>
                <strong>Name: </strong> {student.name}
              </p>
              <p>
                <strong>Bootcamp:</strong> {student.bootcamp} (ID:{" "}
                {student.bootCampId})
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


const fetchBootCampStudents = async (id: number) => {
  if (id === 0) {
    console.log("ran thing")
    const response = await fetch(`${base_url}/students/all`)
    console.log("Got Respone")
    const data = await response.json();
    console.log("returning data")
    return data;
  }
  const response = await fetch(`${base_url}/bootcamps/student/${id}`)
  const data = await response.json();
  return data;

}

type props = {
  bootCampId: number
}