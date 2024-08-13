import { useState } from "react";
import classNames from "classnames";
import "./block.css";

export const DropZone = ({ onDrop, blockIndex, boardId }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      onDrop={(event) => {
        onDrop(event, boardId, blockIndex);
        setIsVisible(false);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={() => setIsVisible(true)}
      onDragLeave={() => setIsVisible(false)}
      className={classNames(
        "drop-zone",
        isVisible && "drop-zone-active",
        !isVisible && "drop-zone-inactive"
      )}
    ></div>
  );
};
