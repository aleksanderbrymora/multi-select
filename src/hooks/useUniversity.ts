import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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
  // im getting rid of other data, as it's not used in the app.
  // if it was necessary id use some state management library at that point because
  // it's already getting messy and probably unoptimised with simple react state
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
  const resetSelected = useCallback(() => {
    setSelected([]);
    setUniversities([]);
    setFilter("");
  }, []);

  const dedupedUniversities = useMemo(
    () => filterOutDuplicates(universities),
    [universities]
  );

  // this is obviously personal preference, could change the time to anything
  const debouncedGetUniversities = useCallback(
    debounce((f: string) => getUniversityList(f), 300),
    []
  );

  const getUniversityList = async (newFilter: string) => {
    if (newFilter === "") {
      setUniversities([]);
    } else {
      const unis = await fetchUniversities(newFilter);
      // because of the delay of the fetch there might be a race condition
      // that would set the universities to some previous search even though
      // the filter might be set to an empty string
      newFilter !== "" ? setUniversities(unis) : setUniversities([]);
    }
  };

  const toggleUniSelection = (
    name: string,
    callbacks?: { onSelect?: () => any; onDeselect?: () => any }
  ) => {
    const foundIndex = selected.findIndex((s) => s === name);

    if (foundIndex === -1) {
      setSelected((s) => [...s, name]);
      if (callbacks?.onSelect) callbacks.onSelect();
    } else {
      setSelected(selected.filter((n) => n !== name));
      if (callbacks?.onDeselect) callbacks.onDeselect();
    }
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
    debouncedGetUniversities(value);
  };

  const escapeHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      hideList();
      console.log("Escape pressed");
    }
  }, []);

  // Escape key listener
  useEffect(() => {
    if (isListVisible) document.addEventListener("keydown", escapeHandler);
    else document.removeEventListener("keydown", escapeHandler);
    return () => document.removeEventListener("keydown", escapeHandler);
  }, [isListVisible]);

  return {
    universities: dedupedUniversities,
    selectedUniversities: selected,
    filterValue: filter,
    resetSelectedUniversities: resetSelected,
    toggleUniSelection,
    hideList,
    showList,
    toggleList,
    isListVisible,
    onFilterChange,
  };
};
