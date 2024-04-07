const contractAddress = "0xa3c7501BF8f1C3D354A75722ECe57955b4C9c54E";
const contractAbi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "profilePhoto", type: "string" },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "candidates",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "profilePhoto", type: "string" },
      { internalType: "uint256", name: "voteCount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "candidatesNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "getCandidateById",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "string", name: "", type: "string" },
      { internalType: "string", name: "", type: "string" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidateList",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "profilePhoto", type: "string" },
          { internalType: "uint256", name: "voteCount", type: "uint256" },
        ],
        internalType: "struct EVoting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotingStatus",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_vote", type: "uint256" }],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "voters",
    outputs: [
      { internalType: "bool", name: "voted", type: "bool" },
      { internalType: "uint256", name: "vote", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "votingStatus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export { contractAddress, contractAbi };
