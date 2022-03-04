import { FC } from "react";
import { Check } from "./Icons";

interface Props {
  universities: string[];
  selected: string[];
  toggleSelection: (
    name: string,
    callbacks?: { onSelect?: () => any; onDeselect?: () => any }
  ) => void;
}
export const UniversityList: FC<Props> = ({
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
        const onClickHandle = () =>
          toggleSelection(u, {
            onSelect: () => console.log("Selected", u),
            onDeselect: () => console.log("Deselected", u),
          });

        return (
          <button
            onClick={onClickHandle}
            key={u}
            className={`w-full px-2 py-2 text-left flex justify-between gap-2 items-center bg-white hover:bg-zinc-50 transition-colors ${
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
