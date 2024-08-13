import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Drawer, Select } from "antd";
import { allBoardFields, allowedTransitions } from "../../constants";
import { BoardContext } from "../../context/BoardContext";
import "./boardConfiguration.css";

export const BoardConfiguration = () => {
  const { Option } = Select;
  const {
    isConfigVisible: isVisible,
    setConfigVisible,
    boardConfiguration: initialBoardConfiguration,
    setBoardConfiguration,
  } = useContext(BoardContext);

  const [drawerConfig, setDrawerConfig] = useState(initialBoardConfiguration);

  useEffect(() => {
    setDrawerConfig(initialBoardConfiguration);
  }, [initialBoardConfiguration]);

  const onConfigChange = (configId, key, value) => {
    const updatedConfig = drawerConfig.map((config) => {
      if (config.id === configId) {
        return {
          ...config,
          [key]: value,
        };
      }
      return config;
    });
    setDrawerConfig(updatedConfig);
  };

  const onSaveConfiguration = () => {
    setBoardConfiguration(drawerConfig);
    setConfigVisible(false);
  };

  return (
    <Drawer
      open={isVisible}
      onClose={() => setConfigVisible(false)}
      width={"40%"}
      title={"Configure Board View"}
      destroyOnClose={true}
    >
      <div className="configuration-container">
        {drawerConfig.map((config) => (
          <Card title={<div>{config.label}</div>} key={config.id}>
            <div className="config-container">
              <label className="config-label">Required Fields</label>
              <Select
                mode="multiple"
                disabled={config.isInitialState}
                placeholder="Select the fields which are required to move in this state"
                onChange={(value) =>
                  onConfigChange(config.id, "requiredFields", value)
                }
                value={config.requiredFields}
              >
                {allBoardFields.map((field) => (
                  <Option key={field.id} value={field.id}>
                    {field.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="config-container">
              <label className="config-label">Allowed Transition</label>
              <Select
                mode="multiple"
                disabled={config.isInitialState}
                placeholder="Choose from which state transition is possible"
                value={config.allowedTransition}
                onChange={(value) =>
                  onConfigChange(config.id, "allowedTransition", value)
                }
              >
                {allowedTransitions[config.name].map((transition) => (
                  <Option key={transition.id} value={transition.name}>
                    {transition.label}
                  </Option>
                ))}
              </Select>
            </div>
          </Card>
        ))}
        <Button
          type="primary"
          className="config-action"
          onClick={onSaveConfiguration}
        >
          Save Configuration
        </Button>
      </div>
    </Drawer>
  );
};
