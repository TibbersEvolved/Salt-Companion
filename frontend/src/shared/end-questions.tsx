import { Link } from "@tanstack/react-router";

export default function EndQuestionsPage() {
  return (
    <>
      {/* <Confetti width={width} height={height} initialVelocityY={25} /> */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl text-center font-light">
          You've reached the end :)
        </h1>
        <Link to="/landing">
          <button className="m-6 bg-[#fc7961] text-white h-10 w-56 rounded-full text-lg font-semibold hover:bg-[#f35b7e] transition duration-200">
            Back to main page
          </button>
        </Link>
      </div>
    </>
  );
}
