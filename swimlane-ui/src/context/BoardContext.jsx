import { createContext } from "react";
export const BoardContext = createContext({
  boardConfiguration: [],
  setBoardConfiguration: () => {},
  searchText: "",
  setSearchText: () => {},
  isConfigVisible: false,
  setConfigVisible: () => {},
});

export const BoardProvider = ({ children, value }) => {
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
