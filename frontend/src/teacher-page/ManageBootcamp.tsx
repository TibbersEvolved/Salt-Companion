import React from "react";

interface ManageBootcampProps {
  selectedBootcamp: string;
  onClose: () => void;
}

export const ManageBootcamp: React.FC<ManageBootcampProps> = ({
  selectedBootcamp,
  onClose,
}) => {
  const getBootcampDetails = () => {
    switch (selectedBootcamp) {
      case "jfs":
        return "Manage JFS Java Bootcamp";
      case "jsfs":
        return "Manage JFSF JavaScript Bootcamp";
      case "dnfs":
        return "Manage DNFS .Net/C# Bootcamp";
      default:
        return "No bootcamp selected";
    }
  };

  return (
    <div className=" top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md w-5/6 h-5/6">
        <h1 className="text-xl font-bold">{getBootcampDetails()}</h1>
        <p className="mt-4">
          Here you can manage details for the{" "}
          {selectedBootcamp === "jfs"
            ? "JFS Java Bootcamp"
            : selectedBootcamp === "jsfs"
              ? "JFSF JavaScript Bootcamp"
              : "DNFS .Net/C# Bootcamp"}
          .
        </p>
        <select name="" id="">
          <option value="topic1">Topic 1</option>
          <option value="topic2">Topic 2</option>
          <option value="topic3">Topic 3</option>
          <option value="topic4">Topic 4</option>
          <option value="topic5">Topic 5</option>
          <option value="topic6">Topic 6</option>
        </select>
        <form action="submit">
          <input type="text" placeholder="Add topic" />
          <button type="submit">Submit</button>
        </form>

        <div>
          <button>Select flashcard</button>
          <form action="">
            <input type="text" name="" id="" placeholder="Question" />
            <input type="text" placeholder="Answer" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <br />
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
