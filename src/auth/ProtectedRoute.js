import { Navigate } from "react-router-dom";
import { isAuthenticated, getAccount } from "../auth/Auth";
import Box from "@mui/material/Box";
import { CardContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const account = getAccount();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              e-Voting
            </Typography>
            <Typography variant="h7" noWrap>
              User logged: {account}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <CardContent>{children}</CardContent>
    </>
  );
};

export default ProtectedRoute;
