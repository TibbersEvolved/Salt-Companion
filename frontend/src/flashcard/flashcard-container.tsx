export const Flashcard = () => {
  return (
    <>
      <h1 className="text-3xl text-center mt-10">flashcard.title</h1>
      <div className="flex justify-center mt-10">
        <div className="w-[600px] h-96 bg-gray-200 flex items-center justify-center">
          <p>flashcard.front</p>
          <div>
            <button>Very hard</button>
            <button>Hard</button>
            <button>Easy</button>
            <button>Too easy</button>
          </div>
        </div>
      </div>
    </>
  );
};
