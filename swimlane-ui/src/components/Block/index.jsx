import React, { useState } from "react";
import { Button, Card } from "antd";
import { PreviewCard } from "./PreviewCard";
import "./block.css";

export const Block = ({ blockDetails, onCardDrag, boardId }) => {
  const { id: cardId, code } = blockDetails;
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  return (
    <>
      <div
        className="card-container"
        onDragStart={(e) => onCardDrag(e, cardId, boardId)}
        draggable
      >
        <Card title={<div>{blockDetails.label}</div>}>
          <div className="block-details">
            <div>{code}</div>
            <Button type="primary" onClick={() => setIsPreviewVisible(true)}>
              View
            </Button>
          </div>
        </Card>

        <PreviewCard
          blockDetails={blockDetails}
          isVisible={isPreviewVisible}
          boardId={boardId}
          setIsPreviewVisible={setIsPreviewVisible}
        />
      </div>
    </>
  );
};
