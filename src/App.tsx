import { useClickOutside } from "./hooks/useClickOutside";
import { useUniversity } from "./hooks/useUniversity";
import { Down, Up } from "./Icons";
import { UniversityList } from "./UniversityList";

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

  const { ref } = useClickOutside(hideList);

  return (
    <main className="mx-auto max-w-sm grid grid-cols-2 mt-20" ref={ref}>
      <button
        className={`border-4 border-black flex justify-between text-lg font-bold p-2 ${
          isListVisible ? "border-b-0" : ""
        }`}
        onClick={toggleList}
      >
        <h1>
          Universities{" "}
          <span className="bg-black text-white p-1">
            {selectedUniversities.length}
          </span>
        </h1>
        <div className="aspect-square h-full">
          {isListVisible ? <Down /> : <Up />}
        </div>
      </button>
      {isListVisible && (
        <>
          <div className="border-b-4 border-black" />
          <div className="border-4 border-t-0 border-black col-span-2 p-3">
            <input
              value={filterValue}
              type="text"
              onChange={onFilterChange}
              placeholder="Search for university to select"
              className="p-2 w-full border-gray-200 border rounded"
            />
            <UniversityList
              universities={universities}
              selected={selectedUniversities}
              toggleSelection={toggleUniSelection}
            />
          </div>
          <button
            onClick={resetSelectedUniversities}
            className="bg-black text-white col-span-2 py-3 text-lg font-bold"
          >
            Reset
          </button>
        </>
      )}
    </main>
  );
};

export default App;
