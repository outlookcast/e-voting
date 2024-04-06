import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../../constants";

export const getContractInstance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return contractInstance;
};
