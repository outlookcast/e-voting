import React from "react";
import { ethers } from "ethers";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { authenticate } from "../../auth/Auth";

const provider = window.ethereum
  ? new ethers.providers.Web3Provider(window.ethereum)
  : null;

const Login = () => {
  const navigate = useNavigate();

  const connectwalletHandler = async () => {
    if (window.ethereum) {
      try {
        await provider.send("eth_requestAccounts", []);
        var signer = provider.getSigner();
        const address = await signer.getAddress();
        authenticate(address);
        navigate("/home");
      } catch (err) {
        if (err && err.code && err.code == 4001) {
          toast("Please, accept to connect to metamask");
        }
      }
    } else {
      toast("Please, install Metamask!");
    }
  };

  return (
    <div className="content-login">
      <h3 className="h4">Welcome to e-Voting system</h3>
      <Button style={{ background: "white" }} onClick={connectwalletHandler}>
        Connect with Metamask
      </Button>
      <ToastContainer />
    </div>
  );
};

export default Login;
