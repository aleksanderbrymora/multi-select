import { FC, useEffect, useRef } from "react";
import { Check, Down, Up } from "./Icons";
import { useUniversity } from "./useUniversity";

const useClickOutside = (callback: () => any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) callback();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return { ref };
};

const App = () => {
  const {
    universities,
    toggleUniSelection,
    filter,
    setFilter,
    updateList,
    selected,
    showList,
    hideList,
    toggleList,
    isListVisible,
    resetSelected,
  } = useUniversity();

  const { ref } = useClickOutside(hideList);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
    updateList(value);
  };

  return (
    <main className="mx-auto max-w-sm grid grid-cols-2 mt-20" ref={ref}>
      <button
        className={`border-4 border-black flex justify-between text-lg font-bold p-2 ${
          isListVisible ? "border-b-0" : ""
        }`}
        onClick={toggleList}
      >
        <h1>
          Universities <span>{selected.length}</span>
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
              value={filter}
              type="text"
              onChange={onChange}
              placeholder="Search for university to select"
              onFocus={showList}
              className="p-2 w-full border-gray-200 border rounded"
            />
            <UniversityList
              universities={universities}
              selected={selected}
              toggleSelection={toggleUniSelection}
            />
          </div>
          <button
            onClick={resetSelected}
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

interface Props {
  universities: string[];
  selected: string[];
  toggleSelection: (name: string) => void;
}

const UniversityList: FC<Props> = ({
  toggleSelection,
  universities,
  selected,
}) => {
  /* 
  based on the length of universities and/or selected universities i'm grabbing a source of truth 
  The flow is:
  if there are any universities then use them as list
  if they are empty use only selected ones in the list
  if these are empty then use an empty array, because there is nothing to display
  */
  const unis =
    universities.length > 0
      ? universities
      : selected.length > 0
      ? selected
      : [];

  return (
    <div className="divide-y mt-2 max-h-96 overflow-auto">
      {unis.map((u) => {
        const isSelected = selected.includes(u);
        return (
          <button
            onClick={() => toggleSelection(u)}
            key={u}
            className={`w-full px-2 py-2 text-left flex justify-between items-center ${
              isSelected ? "font-medium" : "font-normal"
            }`}
          >
            {/* could add truncate to make it nice */}
            <span className="w-full">{u}</span>
            {isSelected && (
              <span className="h-5  aspect-square">
                <Check />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
