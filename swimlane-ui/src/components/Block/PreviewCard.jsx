import React, { useContext } from "react";
import { Modal, Tabs, Card } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./block.css";
import { BoardContext } from "../../context/BoardContext";

export const PreviewCard = ({
  blockDetails,
  isVisible,
  boardId,
  setIsPreviewVisible,
}) => {
  /* These fields can be dynamically loaded via the configuration that way will be sacalable for future use cases */
  const { label } = blockDetails;
  const { setBoardConfiguration } = useContext(BoardContext);

  const onFieldChange = (key, value) => {
    const updatedBlockDetails = {
      ...blockDetails,
      [key]: value,
    };
    setBoardConfiguration((prev) => {
      const updatedBoardConfiguration = prev.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            blockList: board.blockList.map((block) => {
              if (block.id === blockDetails.id) {
                return updatedBlockDetails;
              }
              return block;
            }),
          };
        }
        return board;
      });
      return updatedBoardConfiguration;
    });
  };

  return (
    <Modal
      title={<div>Task: {label}</div>}
      open={isVisible}
      width={"40%"}
      height={"900px"}
      footer={null}
      onCancel={() => setIsPreviewVisible(false)}
    >
      <div className="block-content">
        <div className="block-field">
          <label>Description</label>
          <TextArea
            value={blockDetails.description}
            placeholder="Add description to the taks"
            onChange={(e) => {
              const { value } = e.target;
              onFieldChange("description", value);
            }}
          />
        </div>
        <div className="block-field">
          <label>RCA</label>
          <TextArea
            value={blockDetails.rca}
            placeholder="Add RCA"
            onChange={(e) => {
              const { value } = e.target;
              onFieldChange("rca", value);
            }}
          />
        </div>
      </div>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Activity" key="1">
          <div className="history-container">
            {blockDetails.history.length === 0
              ? "No activity found"
              : blockDetails.history.slice(0, 4).map((entry, index) => (
                  <Card key={index}>
                    <div className="history-row">
                      <span className="history-transition">{`${entry.source} -> ${entry.destination}`}</span>
                      <span>{entry.date}</span>
                    </div>
                  </Card>
                ))}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};
