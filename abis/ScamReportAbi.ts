export const ScamReportAbi = [
  {
    inputs: [
      { internalType: "bytes32", name: "targetId", type: "bytes32" },
      { internalType: "address", name: "reporter", type: "address" },
    ],
    name: "AlreadyVoted",
    type: "error",
  },
  { inputs: [], name: "EmptyReasonHash", type: "error" },
  { inputs: [], name: "EmptyTargetId", type: "error" },
  { inputs: [], name: "InvalidTargetType", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "reasonHash",
        type: "bytes32",
      },
      { indexed: false, internalType: "bool", name: "isScam", type: "bool" },
    ],
    name: "ScamReportSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "reporter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "targetId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "targetType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "reasonHash",
        type: "bytes32",
      },
      { indexed: false, internalType: "bool", name: "isScam", type: "bool" },
    ],
    name: "ScamVoteSubmitted",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "addressToTargetId",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "targetId", type: "bytes32" },
      { internalType: "address", name: "reporterAddr", type: "address" },
    ],
    name: "hasVoted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "reasonHash", type: "bytes32" },
      { internalType: "bool", name: "isScam", type: "bool" },
    ],
    name: "submitReport",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint8", name: "targetType", type: "uint8" },
      { internalType: "bytes32", name: "targetId", type: "bytes32" },
      { internalType: "bytes32", name: "reasonHash", type: "bytes32" },
      { internalType: "bool", name: "isScam", type: "bool" },
    ],
    name: "submitVote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
