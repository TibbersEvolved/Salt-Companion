import { useEffect, useState } from "react";
import { base_url } from "../services/api";
import { Student } from "./types";
import LoadingScreen from "../services/loadingScreen";
import toast, { useToaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { requirePropFactory } from "@mui/material";
import React from "react";

export const Students = (prop: props) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchStudents", prop.bootCampId],
    queryFn: () => fetchBootCampStudents(prop.bootCampId),
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>Server Error, please try again later</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Students</h1>
      {data.length > 0 && (
        <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-96 px-20">
          <h3 className="font-bold border-b pb-2 text-center">Name</h3>
          <h3 className="font-bold border-b pb-2 text-center">Bootcamp</h3>
          {data.map((student, index) => (
            <React.Fragment key={index}>
              <p className="pt-2">{student.name}</p>
              <p className="pt-2">{student.bootcamp}</p>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

const fetchBootCampStudents = async (id: number) => {
  if (id === 0) {
    console.log("ran thing");
    const response = await fetch(`${base_url}/students/all`);
    console.log("Got Respone");
    const data = await response.json();
    console.log("returning data");
    return data;
  }
  const response = await fetch(`${base_url}/bootcamps/student/${id}`);
  const data = await response.json();
  return data;
};

type props = {
  bootCampId: number;
};
