import { BrowserProvider, Contract } from "ethers";
import { contractAbi, contractAddress } from "../../constants";

export const getContractInstance = async () => {
  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contractInstance = new Contract(contractAddress, contractAbi, signer);

  return contractInstance;
};
