import React from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

const CandidatesTable = ({ candidateList }) => {
  return (
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
  );
};

export default CandidatesTable;
