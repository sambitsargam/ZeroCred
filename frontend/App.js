
import React, { useEffect, useState } from "react";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";
import "./App.css";

function App() {
  const { sdk, connected, account, connect } = useSDK();
  const [score, setScore] = useState(null);

  const fetchScore = async () => {
    const res = await fetch(`http://localhost:4000/score/${account}`);
    const data = await res.json();
    setScore(data.score);
  };

  useEffect(() => {
    if (connected && account) {
      fetchScore();
    }
  }, [connected, account]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">ZeroCred MVP</h1>
      {!connected ? (
        <button
          className="bg-blue-500 px-4 py-2 rounded"
          onClick={connect}
        >
          Connect MetaMask
        </button>
      ) : (
        <div>
          <p className="mb-2">Wallet: {account}</p>
          <p className="text-xl">
            Credit Score: {score !== null ? score : "Loading..."}
          </p>
        </div>
      )}
    </div>
  );
}

export default function WrappedApp() {
  return (
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  );
}
