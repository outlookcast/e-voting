import React, { useEffect, useMemo, useState } from "react";
import { getAccount } from "../../auth/Auth";
import { contractAbi, contractAddress } from "../../constants";
import { ethers } from "ethers";
import { Typography, Card, CardContent, Chip } from "@mui/material";

const Home = () => {
  const account = getAccount();

  const [votingStatus, setVotingStatus] = useState(null);
  const [owner, setOwner] = useState(null);
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [account]);

  async function getContractInstance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    return contractInstance;
  }

  async function fetchData() {
    await getContractOwner();
    await getCandidateList();
    await getStatusVoting();
  }

  async function getContractOwner() {
    const contractInstance = await getContractInstance();
    const owner = await contractInstance.owner();

    setOwner(owner);
    console.log("OWNER: ", owner);
  }

  async function getCandidateList() {
    const contractInstance = await getContractInstance();
    const candidateList = await contractInstance.getCandidateList();

    setCandidateList(candidateList);
    console.log("CANDIDATE LIST: ", candidateList);
  }

  async function getStatusVoting() {
    const contractInstance = await getContractInstance();
    const votingStatus = renderStatusVoting(
      parseInt(await contractInstance.votingStatus())
    );

    setVotingStatus(votingStatus);
    console.log("VOTING STATUS: ", votingStatus);
  }

  function renderStatusVoting(status) {
    switch (status) {
      case 0:
        return "NOT_STARTED";
      case 1:
        return "STARTED";
      case 2:
        return "FINISHED";
      default:
        return "INVALID";
    }
  }

  function renderColorChip(votingStatus) {
    switch (votingStatus) {
      case "NOT_STARTED":
        return "warning";
      case "STARTED":
        return "success";
      case "FINISHED":
        return "info";
      default:
        return "error";
    }
  }

  return (
    <div>
      <Typography variant="h2" align="center">
        Welcome to e-Voting system
      </Typography>

      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: 14, marginTop: "5px" }}
              color="text.secondary"
              gutterBottom
            >
              Election from contract: <b>{contractAddress}</b>
            </Typography>
            <Typography>
              Election status:{" "}
              <Chip
                label={votingStatus}
                color={renderColorChip(votingStatus)}
              />
            </Typography>
          </div>

          <Typography>
            Candidates number: {candidateList && candidateList.length}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
