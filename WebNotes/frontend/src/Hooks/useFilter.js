import { useMemo } from "react";

export const useSortedNotes = (notes, sort) => {
  const sortedNotes = useMemo(() => {
    if (!sort) {
      return notes;
    } else if (sort === "noteDate") {
      return [...notes]
        .sort((a, b) => a[sort].localeCompare(b[sort])).reverse();
    } else {
      return [...notes].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
  }, [sort, notes]);

  return sortedNotes;
};

export const useNotes = (notes, sort, query) => {
  const sortedNotes = useSortedNotes(notes, sort);

  const sortedAndSearchedNotes = useMemo(() => {
    return sortedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.description.toLowerCase().includes(query) ||
        note.noteDate.toLowerCase().includes(query)
    );
  }, [query, sortedNotes]);

  return sortedAndSearchedNotes;
};
