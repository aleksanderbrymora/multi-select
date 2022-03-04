import debounce from "lodash.debounce";
import { useCallback, useMemo, useState } from "react";

const filterOutDuplicates = (unis: string[]) => {
  return unis.reduce(
    (acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
    [] as string[]
  );
};

const fetchUniversities = async (filter: string) => {
  const res = await fetch(
    `http://universities.hipolabs.com/search?name=${filter}`
  );
  const data = (await res.json()) as IUniversity[];
  return data.map((u) => u.name);
};

export const useUniversity = () => {
  const [universities, setUniversities] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isListVisible, setListVisibility] = useState(false);

  const hideList = useCallback(() => setListVisibility(false), []);
  const showList = useCallback(() => setListVisibility(true), []);
  const toggleList = useCallback(() => setListVisibility((v) => !v), []);
  const resetSelected = useCallback(() => setSelected([]), []);

  const dedupedUniversities = useMemo(
    () => filterOutDuplicates(universities),
    [universities]
  );

  const debouncedGetUniversities = useCallback(
    debounce((f: string) => getUniversityList(f), 300),
    []
  );

  const getUniversityList = async (newFilter: string) => {
    if (newFilter === "") {
      setUniversities([]);
    } else {
      const unis = await fetchUniversities(newFilter);
      setUniversities(unis);
    }
  };

  const toggleUniSelection = (name: string) => {
    console.log({ name });
    const foundIndex = selected.findIndex((s) => s === name);
    if (foundIndex === -1) setSelected((s) => [...s, name]);
    else setSelected(selected.filter((n) => n !== name));
  };

  return {
    universities: dedupedUniversities,
    updateList: debouncedGetUniversities,
    filter,
    setFilter,
    toggleUniSelection,
    selected,
    showList,
    hideList,
    toggleList,
    isListVisible,
    resetSelected,
  };
};
