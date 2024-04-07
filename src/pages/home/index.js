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
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CreateCandidate from "./createCandidate";
import Transition from "./transition";

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

        <div>
          {candidateList.length == 0 ? (
            <p style={{ textAlign: "center" }}>No candidates found</p>
          ) : (
            <div style={{ textAlign: "center", display: "ruby-text" }}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 800 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell width="60px">Candidate Id</TableCell>
                      <TableCell width="200px">Candidate Name</TableCell>
                      <TableCell width="50px">Candidate Photo</TableCell>
                      <TableCell width="100px">Candidate Vote Count</TableCell>
                      <TableCell width="50px">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {candidateList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="center">
                          <img height="30px" src={row.photo} />
                        </TableCell>
                        <TableCell align="right">{row.voteCount}</TableCell>
                        <TableCell align="right">
                          <Button variant="contained" color="success">
                            Vote
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
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
