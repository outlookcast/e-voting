import React, { useEffect, useMemo, useState } from "react";
import { getAccount } from "../../auth/Auth";
import { contractAddress } from "../../constants";
import { getContractInstance } from "../../utils/web3";
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  Toolbar,
  AppBar,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CreateCandidate from "./createCandidate";
import Transition from "./transition";
import CandidatesTable from "./candidatesTable";

const Home = () => {
  const account = getAccount();

  const [votingStatus, setVotingStatus] = useState(null);
  const [owner, setOwner] = useState(null);
  const [candidateList, setCandidateList] = useState([]);
  const [candidatesNumber, setCandidatesNumber] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [closeDisabled, setCloseDisabled] = useState(false);

  const isOwner = owner == account;

  useEffect(() => {
    fetchData();
  }, [account]);

  const handleClickOpen = (title) => {
    setOpen(true);
  };

  const handleClose = (_, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  async function fetchData() {
    await getContractOwner();
    await getStatusVoting();
    await getCandidateNumber();
    await getCandidateList();
  }

  async function getContractOwner() {
    const contractInstance = await getContractInstance();
    const owner = await contractInstance.getFunction("owner").call();
    setOwner(owner);
    console.log("OWNER: ", owner);
  }

  async function getCandidateNumber() {
    try {
      const contractInstance = await getContractInstance();
      const candidatesNumber = parseInt(
        await contractInstance.getFunction("candidatesNumber").call()
      );

      console.log("CANDIDATES NUMBER: ", candidatesNumber);
      setCandidatesNumber(candidatesNumber);
    } catch (err) {
      console.log("err => ", err);
    }
  }

  async function getCandidateList() {
    try {
      const contractInstance = await getContractInstance();
      const candidatesList = await contractInstance
        .getFunction("getCandidateList")
        .call();

      const candidateListAux = candidatesList.map((x, index) => {
        return {
          id: index,
          name: x[0],
          photo: x[1],
          voteCount: parseInt(x[2]),
        };
      });

      console.log("CANDIDATES LIST: ", candidateListAux);

      setCandidateList(candidateListAux);
    } catch (err) {
      console.log("err => ", err);
    }
  }

  async function getStatusVoting() {
    const contractInstance = await getContractInstance();
    const votingStatus = renderStatusVoting(
      parseInt(await contractInstance.getFunction("votingStatus").call())
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
            <Typography
              sx={{ fontSize: 14, marginTop: "5px" }}
              color="text.secondary"
              gutterBottom
            >
              Candidates number: <b>{candidatesNumber}</b>
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Election status:{" "}
              <Chip
                label={votingStatus}
                color={renderColorChip(votingStatus)}
              />
            </Typography>
          </div>

          <Typography></Typography>
          {isOwner ? (
            <div>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                Create candidate
              </Button>
            </div>
          ) : null}
        </CardContent>

        <CandidatesTable candidateList={candidateList} />
      </Card>

      <Dialog
        fullScreen
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              disabled={closeDisabled}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create candidate
            </Typography>
          </Toolbar>
        </AppBar>
        <CreateCandidate
          setOpen={setOpen}
          setCloseDisabled={setCloseDisabled}
          closeDisabled={closeDisabled}
          fetchData={fetchData}
        />
      </Dialog>
    </div>
  );
};

export default Home;
