import { useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";

import BankArtifact from "./artifacts/contracts/Bank.sol/Bank.json";
import AvaxArtifact from "./artifacts/contracts/Avax.sol/Avax.json";
import DogeArtifact from "./artifacts/contracts/Dogecoin.sol/Dogecoin.json";
import ShibArtifact from "./artifacts/contracts/ShibaInu.sol/ShibaInu.json";

import Modal from "./Modal";
import Dashboard from "./Dashboard";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled.div``;

const DashboardContainer = styled.div``;

const App = () => {
  const [account, setAccount] = useState(undefined);
  const [hasAccount, setHasAccount] = useState(false);
  const [tokenContracts, setTokenContracts] = useState({});
  const [tokenBalances, setTokenBalances] = useState({});
  const [tokenSymbols, setTokenSymbols] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState("");

  const fromBytes32ToString = (bytes32) =>
    ethers.utils.parseBytes32String(bytes32);
  const fromStringToBytes32 = (text) => ethers.utils.formatBytes32String(text);
  const fromWeiToEth = (wei) => ethers.utils.formatEther(wei).toString();
  const fromEthToWei = (ether) => ethers.utils.parseEther(ether);
  const toRound = (num) => Number(num).toFixed(2);

  useEffect(() => {
    const init = async () => {
      connect();
      getTokenBalances();
    };
    init();
  }, []);

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      setHasAccount(true);
    } else {
      alert("Please install metamask!");
    }
  };

  const getTokenBalance = async (symbol) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bankContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      BankArtifact.abi
    );
    const balance = await bankContract
      .connect(signer)
      .getTokenBalance(fromStringToBytes32(symbol));

    return fromWeiToEth(balance);
  };

  const getTokenBalances = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenSymbols = await getTokenSymbolsAndContracts();
    tokenSymbols.map(async (symbol) => {
      const balance = await getTokenBalance(symbol, signer);
      setTokenBalances((prev) => ({ ...prev, [symbol]: balance.toString() }));
    });
  };

  const getTokenContract = async (symbol) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const bankContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      BankArtifact.abi
    );
    const address = await bankContract
      .connect(provider)
      .getWhitelistedTokenAddress(fromStringToBytes32(symbol));
    const abi =
      symbol === "Avax"
        ? AvaxArtifact.abi
        : symbol === "Dogecoin"
        ? DogeArtifact.abi
        : ShibArtifact.abi;
    const tokenContract = new ethers.Contract(address, abi);
    return tokenContract;
  };

  const getTokenSymbolsAndContracts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bankContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      BankArtifact.abi,
      signer
    );
    const result = await bankContract.connect(provider).getWhitelistedSymbols();
    const symbols = result.map((symbol) => fromBytes32ToString(symbol));
    setTokenSymbols(symbols);
    symbols.map(async (symbol) => {
      const contract = await getTokenContract(symbol);
      setTokenContracts((prev) => ({ ...prev, [symbol]: contract }));
    });
    return symbols;
  };

  const depositTokens = async (wei, symbol) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bankContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      BankArtifact.abi,
      signer
    );
    if (symbol === "Eth") {
      const tx1 = await signer.sendTransaction({
        to: bankContract.address,
        value: wei,
      });
      signer.sendTransaction(tx1);
      // await tx1.wait();
      // const tx2 = await bankContract
      //   .connect(signer)
      //   .depositTokens(wei, fromStringToBytes32(symbol));
      // await tx2.wait();
    } else {
      const tokenContract = tokenContracts[symbol];
      const tx1 = await tokenContract
        .connect(signer)
        .approve(bankContract.address, wei);
      await tx1.wait();
      const tx2 = await bankContract
        .connect(signer)
        .depositTokens(wei, fromStringToBytes32(symbol));
      await tx2.wait();
    }
  };

  const withdrawTokens = async (wei, symbol) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const bankContract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      BankArtifact.abi,
      signer
    );
    if (symbol === "Eth") {
      const tx = await bankContract.connect(signer).withdrawEther(wei);
      await tx.wait();
    } else {
      const tx = await bankContract
        .connect(signer)
        .withdrawTokens(wei, fromStringToBytes32(symbol));
      await tx.wait();
    }
  };

  const toggleShowModal = () => setShowModal(!showModal);

  return (
    <div>
      {hasAccount ? (
        <Container>
          <ModalContainer style={{ display: showModal ? "block" : "none" }}>
            <Modal
              toggleShowModal={toggleShowModal}
              selectedSymbol={selectedSymbol}
              depositTokens={depositTokens}
              withdrawTokens={withdrawTokens}
              fromEthToWei={fromEthToWei}
            />
          </ModalContainer>
          <DashboardContainer style={{ display: showModal ? "none" : "block" }}>
            <Dashboard
              tokenBalances={tokenBalances}
              toggleShowModal={toggleShowModal}
              setSelectedSymbol={setSelectedSymbol}
            />
          </DashboardContainer>
        </Container>
      ) : (
        <div>
          <p>Not connected</p>
          <button onClick={() => connect()}>Connect</button>
        </div>
      )}
    </div>
  );
};

export default App;
