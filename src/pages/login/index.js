import React from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { authenticate } from "../../auth/Auth";
import { BrowserProvider } from "ethers";

const provider = window.ethereum ? new BrowserProvider(window.ethereum) : null;

console.log(provider);

const Login = () => {
  const navigate = useNavigate();

  const connectwalletHandler = async () => {
    if (window.ethereum) {
      try {
        await provider.send("eth_requestAccounts", []);
        var signer = await provider.getSigner();
        const address = await signer.getAddress();

        authenticate(address);
        navigate("/home");
      } catch (err) {
        if (err && err.code && err.code == 4001) {
          toast("Please, accept to connect to metamask", { type: "error" });
        }
      }
    } else {
      toast("Please, install Metamask!", { type: "error" });
    }
  };

  return (
    <div className="content-login">
      <h3 className="h4">Welcome to e-Voting system</h3>
      <Button style={{ background: "white" }} onClick={connectwalletHandler}>
        Connect with Metamask
      </Button>
    </div>
  );
};

export default Login;
