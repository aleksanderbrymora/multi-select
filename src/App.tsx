import { useClickOutside } from "./hooks/useClickOutside";
import { useUniversity } from "./hooks/useUniversity";
import { Down, Up } from "./Icons";
import UniversityList from "./UniversityList";

const App = () => {
  const {
    universities,
    toggleUniSelection,
    filterValue,
    onFilterChange,
    selectedUniversities,
    hideList,
    toggleList,
    isListVisible,
    resetSelectedUniversities,
  } = useUniversity();

  const ref = useClickOutside(hideList);

  return (
    <main className="grid max-w-sm grid-cols-2 mx-auto mt-20" ref={ref}>
      <button
        className={`border-4 border-black flex justify-between text-lg font-bold p-2 ${
          isListVisible ? "border-b-0" : ""
        }`}
        onClick={toggleList}
      >
        <h1 className="whitespace-nowrap">
          Universities{" "}
          <span className="p-1 text-white bg-black">
            {selectedUniversities.length}
          </span>
        </h1>
        <div className="h-full aspect-square">
          {isListVisible ? <Down /> : <Up />}
        </div>
      </button>
      {isListVisible && (
        <>
          <div className="border-b-4 border-black" />
          <div className="col-span-2 p-3 border-4 border-t-0 border-black">
            <input
              value={filterValue}
              type="text"
              onChange={onFilterChange}
              placeholder="Search for university to select"
              className="w-full p-2 border border-gray-200 rounded"
            />
            <UniversityList
              universities={universities}
              selected={selectedUniversities}
              toggleSelection={toggleUniSelection}
            />
          </div>
          <button
            onClick={resetSelectedUniversities}
            className="col-span-2 py-3 text-lg font-bold text-white bg-black"
          >
            Reset
          </button>
        </>
      )}
    </main>
  );
};

export default App;
