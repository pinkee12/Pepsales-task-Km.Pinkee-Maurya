import React, { useCallback, useEffect, useState, useMemo } from "react";
import { initialBoardConfiguration } from "./constants";
import { BoardConfiguration } from "./components/BoardConfiguration";
import { Board } from "./components/Board";
import "./index.css";
import { Search } from "./components/Search";
import { Button } from "antd";
import { BoardProvider } from "./context/BoardContext";
import { useDebounce } from "./hooks/useDebounce";

/*
  <BoardProvider>
    |
    <Search /> [Top level search to filter blocks]
    <BoardConfiguration/>
    <Board />  
      |- <BoardLane />
            |- <Block /> [drag, drop functionality is implemented here]
                |- <PreviewCard /> [History of blocks are shown here]
  Check constants for config and mock data used to build the UI

  Functionality implemented:
  1. Search for blocks
  2. Configure Board
  3. Drag and drop blocks
  4. Preview block details (Here only History of blocks are shown on the UI)

  Note: CRUD of blocks are not implemented yet currently controlled by mock data from constants and field update functionality is provided in view section
*/

export const App = () => {
  const [boardConfiguration, setBoardConfiguration] = useState(
    initialBoardConfiguration
  );
  const [isConfigVisible, setConfigVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onSearchTextChange = useCallback(() => {
    setBoardConfiguration((prevBoardConfiguration) => {
      return prevBoardConfiguration.map((board) => {
        return {
          ...board,
          blockList: board.blockList.map((block) => {
            return {
              ...block,
              isVisible: setSearchText
                ? block.label.toLowerCase().includes(searchText.toLowerCase())
                : true,
            };
          }),
        };
      });
    });
  }, [searchText]);

  const debouncedFn = useDebounce(onSearchTextChange, 300);

  /*This search should be BE driven currently keeping a flag for visibility of blocks when searching  */
  useEffect(() => {
    if (debouncedFn) {
      debouncedFn();
    }
  }, [debouncedFn, onSearchTextChange, searchText]);

  return (
    <div className="app">
      <BoardProvider
        value={{
          boardConfiguration,
          setBoardConfiguration,
          searchText,
          setSearchText,
          isConfigVisible,
          setConfigVisible,
        }}
      >
        <div className="header-container">
          <Search />
          <Button onClick={() => setConfigVisible(true)} type="primary">
            Configure Board
          </Button>
        </div>
        <Board />
        <BoardConfiguration />
      </BoardProvider>
    </div>
  );
};
