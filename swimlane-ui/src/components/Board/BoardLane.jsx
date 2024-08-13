import React, { useContext } from "react";
import { Block } from "../Block";
import { BoardContext } from "../../context/BoardContext";
import { DropZone } from "../Block/DropZone";
import "./board.css";

export const BoardLane = ({
  boardConfig,
  onDrop,
  onCardDrag,
  handleDragEnter,
}) => {
  const { setBoardConfiguration } = useContext(BoardContext);
  const { blockList, id: boardId } = boardConfig;

  return (
    <div className="board-lane-container">
      <h2 className="board-lane-heading">{boardConfig.label}</h2>
      <div className="board-lane">
        <DropZone blockIndex={0} onDrop={onDrop} boardId={boardId} />
        {blockList.map((block, index) => {
          const { isVisible } = block;
          if (!isVisible) return null;
          return (
            <>
              <Block
                blockDetails={block}
                key={block.id}
                onCardDrag={onCardDrag}
                boardId={boardId}
                setBoardConfiguration={setBoardConfiguration}
                blockIndex={index}
                handleDragEnter={handleDragEnter}
              />
              <DropZone
                blockIndex={index + 1}
                onDrop={onDrop}
                boardId={boardId}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
