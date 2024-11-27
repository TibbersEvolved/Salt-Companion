export const Flashcard = () => {
  return (
    <>
      <h1 className="text-3xl text-center mt-10">flashcard.title</h1>
      <div className="flex justify-center mt-10">
        <div className="w-[600px] h-96 bg-stone-800/5 flex items-center justify-center relative rounded-lg">
          <p>flashcard.front</p>
          <div className="absolute bottom-6 space-x-3 text-white">
            <button className="bg-red-800 w-24 p-2 rounded-md">
              Difficult
            </button>
            <button className="bg-yellow-500 w-24 p-2 rounded-md">
              Moderate
            </button>
            <button className="bg-sky-600 w-24 p-2 rounded-md">Easy</button>
            <button className="bg-green-700 w-24 p-2 rounded-md">
              Very easy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
