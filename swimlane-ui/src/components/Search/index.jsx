import React, { useContext } from "react";
import { BoardContext } from "../../context/BoardContext";
import { Input } from "antd";

export const Search = () => {
  const { searchText: search, setSearchText } = useContext(BoardContext);
  const onSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  return (
    <Input
      value={search}
      onChange={onSearch}
      placeholder="Search For specific tickets"
    />
  );
};
