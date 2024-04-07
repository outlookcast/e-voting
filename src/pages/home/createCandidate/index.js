import React, { useState } from "react";
import { Box, TextField, CardContent, Typography, Button } from "@mui/material";
import { getContractInstance } from "../../../utils/web3";
import { toast } from "react-toastify";

const CreateCandidate = ({
  setOpen,
  setCloseDisabled,
  closeDisabled,
  fetchData,
}) => {
  const [candidateName, setCandidateName] = useState(null);
  const [candidatePhoto, setCandidatePhoto] = useState(null);

  async function createCandidate() {
    try {
      setCloseDisabled(true);
      const contractInstance = await getContractInstance();

      const func = await contractInstance.getFunction("addCandidate");

      console.log("func", func);

      const tx = await contractInstance
        .getFunction("addCandidate")
        .call("addCandidate", candidateName, candidatePhoto);

      await tx.wait();
      setCloseDisabled(false);
      setOpen(false);
      await fetchData();
    } catch (err) {
      console.log("err => ", err);
      if (err && err.code && err.code == "ACTION_REJECTED") {
        toast("Please, accept to register candidate", { type: "error" });
      } else {
        toast("An error occurred during candidate registration", {
          type: "error",
        });
      }
      setCloseDisabled(false);
    }
  }

  return (
    <CardContent>
      <Typography variant="h6" align="center">
        Please, provide details for candidate registration
      </Typography>
      <Box
        sx={{
          maxWidth: "100%",
          marginTop: "30px",
        }}
      >
        <TextField
          fullWidth
          label="Candidate name"
          id="candidateName"
          onChange={(e) => setCandidateName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Candidate photo"
          id="candidatePhoto"
          style={{ marginTop: "20px" }}
          onChange={(e) => setCandidatePhoto(e.target.value)}
        />
      </Box>

      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="success"
        fullWidth
        onClick={async () => await createCandidate()}
        disabled={closeDisabled}
      >
        Create
      </Button>
    </CardContent>
  );
};

export default CreateCandidate;
