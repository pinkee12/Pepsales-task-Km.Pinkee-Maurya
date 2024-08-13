const BoardFields = {
  DESCRIPTION: "description",
  RCA: "rca",
};

const AllowedTransitions = {
  TODO: "TODO",
  DONE: "DONE",
  IN_PROGRESS: "IN_PROGRESS",
};

const BlockList = {
  TODO: [
    {
      id: "1",
      status: "TODO",
      label: "Add functionality to list",
      description: "add functionality to list",
      rca: "",
      code: "RT-1123",
      history: [],
    },
    {
      id: "2",
      status: "TODO",
      label: "Delete functionality to list",
      description: "Delete functionality",
      rca: "",
      code: "RT-1124",
      history: [],
    },
    {
      id: "3",
      status: "TODO",
      label: "Dynamically render fields",
      description: "dyanmiac render",
      rca: "",
      code: "RT-1125",
      history: [],
    },
    {
      id: "4",
      status: "TODO",
      label: "Make configuration more scalable",
      description: "config scalable",
      rca: "",
      code: "RT-1126",
      history: [],
    },
    {
      id: "5",
      status: "TODO",
      label: "Make UI/UX more friendly",
      description: "",
      rca: "",
      code: "RT-1127",
      history: [],
    },
  ],
  IN_PROGRESS: [
    {
      id: "6",
      status: "IN_PROGRESS",
      label: "Functionality to DND block",
      description: "Functionality of DND need to be added",
      rca: "",
      code: "RT-1125",
      history: [],
    },
    {
      id: "7",
      status: "IN_PROGRESS",
      label: "Add configuration to board",
      description: "",
      rca: "",
      code: "RT-1126",
      history: [],
    },
  ],
  DONE: [],
};

export const initialBoardConfiguration = [
  {
    id: "board_1",
    name: "TODO",
    label: "Todo",
    requiredFields: [],
    allowedTransition: [],
    isAllowedTransitionsConfigEnabled: false,
    isInitialState: true,
    blockList: [...BlockList.TODO],
  },
  {
    id: "board_2",
    name: "IN_PROGRESS",
    label: "In Progress",
    requiredFields: [BoardFields.DESCRIPTION],
    isAllowedTransitionsConfigEnabled: false,
    allowedTransition: [AllowedTransitions.DONE, AllowedTransitions.TODO],
    blockList: [...BlockList.IN_PROGRESS],
  },
  {
    id: "board_3",
    name: "DONE",
    label: "Done",
    requiredFields: [],
    isAllowedTransitionsConfigEnabled: false,
    allowedTransition: [AllowedTransitions.IN_PROGRESS],
    blockList: [...BlockList.DONE],
  },
];

export const allBoardFields = [
  { id: BoardFields.DESCRIPTION, label: "Description", type: "textarea" },
  { id: BoardFields.RCA, label: "RCA", type: "textarea" },
];

export const allowedTransitions = {
  TODO: [],
  IN_PROGRESS: [
    { label: "Todo", name: "TODO" },
    { label: "Done", name: "DONE" },
  ],
  DONE: [{ label: "In progress", name: "IN_PROGRESS" }],
};
