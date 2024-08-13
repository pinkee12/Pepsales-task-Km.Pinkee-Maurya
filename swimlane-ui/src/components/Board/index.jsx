import React, { useContext } from "react";
import { BoardLane } from "./BoardLane";
import { message } from "antd";
import { BoardContext } from "../../context/BoardContext";

export const Board = () => {
  const { boardConfiguration, setBoardConfiguration } =
    useContext(BoardContext);

  const onCardDrag = (event, id, boardId) => {
    event.dataTransfer.setData("cardToBeMovedId", id);
    event.dataTransfer.setData("fromBoard", boardId);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  /* In real scenarios these strategies can be dynamic and complex queries which should be calculate dynamically and FE should not be aware of the logic */
  const validateStrategy = (blockDetails, boardToAddTo) => {
    const { status } = blockDetails;
    const { allowedTransition, requiredFields } = boardToAddTo;
    const isTransitionAllowed =
      !allowedTransition.length || allowedTransition.includes(status);
    const isRequiredFieldsPresent =
      !requiredFields.length ||
      requiredFields.every((field) => blockDetails[field] !== "");
    if (!isTransitionAllowed) {
      message.error(
        "This transition is not allowed, Please check the board configuration for more details"
      );
      return false;
    }
    if (!isRequiredFieldsPresent) {
      message.error(
        `Please fill the required fields (${requiredFields.toString()}) before moving the card`
      );
      return false;
    }
    return true;
  };

  /* This function is responsible of checking where to drop the card in which board and from which board */
  const onDrop = (event, DropboardId, blockIndex) => {
    const removeFromBoard = event.dataTransfer.getData("fromBoard");
    const cardToBeMovedId = event.dataTransfer.getData("cardToBeMovedId");
    const boardToRemoveFrom = boardConfiguration.find(
      (element) => element.id === removeFromBoard
    );
    const boardToAddTo = boardConfiguration.find(
      (element) => element.id === DropboardId
    );
    if (boardToRemoveFrom && boardToAddTo) {
      const cardToBeMoved = boardToRemoveFrom.blockList.find(
        (block) => block.id === cardToBeMovedId
      );
      if (cardToBeMoved) {
        const updatedBoardToRemoveFrom = {
          ...boardToRemoveFrom,
          blockList: boardToRemoveFrom.blockList.filter(
            (block) => block.id !== cardToBeMovedId
          ),
        };
        if (removeFromBoard === DropboardId) {
          const reorderedBlockList = [...updatedBoardToRemoveFrom.blockList];
          cardToBeMoved.status = boardToAddTo.name;
          reorderedBlockList.splice(blockIndex, 0, cardToBeMoved);
          const updatedBoardToAddTo = {
            ...boardToAddTo,
            blockList: reorderedBlockList,
          };
          setBoardConfiguration((prevBoards) =>
            prevBoards.map((board) =>
              board.id === DropboardId ? updatedBoardToAddTo : board
            )
          );
        } else {
          if (validateStrategy(cardToBeMoved, boardToAddTo)) {
            const reorderedBlockList = [...boardToAddTo.blockList];
            cardToBeMoved.status = boardToAddTo.name;
            reorderedBlockList.splice(blockIndex, 0, cardToBeMoved);
            cardToBeMoved.history.unshift({
              source: boardToRemoveFrom.label,
              destination: boardToAddTo.label,
              date: new Date().toLocaleString(),
            });
            const updatedBoardToAddTo = {
              ...boardToAddTo,
              blockList: reorderedBlockList,
            };
            setBoardConfiguration((prevBoards) =>
              prevBoards.map((board) => {
                if (board.id === DropboardId) {
                  return updatedBoardToAddTo;
                } else if (board.id === removeFromBoard) {
                  return updatedBoardToRemoveFrom;
                }
                return board;
              })
            );
          }
        }
      }
    }
  };

  return (
    <div className="board-container">
      {boardConfiguration.map((config) => (
        <BoardLane
          key={config.id}
          boardConfig={config}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onCardDrag={onCardDrag}
        />
      ))}
    </div>
  );
};
