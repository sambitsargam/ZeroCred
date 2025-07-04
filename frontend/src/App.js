
import React, { useEffect, useState } from "react";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";
import "./index.css";

function Dashboard() {
  const { sdk, connected, account, connect } = useSDK();
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchScore = async () => {
    if (!account) return;
    setLoading(true);
    const res = await fetch(`http://localhost:4000/score/${account}`);
    const data = await res.json();
    setScore(data.score);
    setLoading(false);
  };

  const updateScore = async () => {
    if (!account) return;
    setLoading(true);
    await fetch("http://localhost:4000/score/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: account }),
    });
    await fetchScore();
  };

  useEffect(() => {
    if (connected && account) {
      fetchScore();
    }
  }, [connected, account]);

  const getBadge = (score) => {
    if (score >= 800) return "🏅 Diamond";
    if (score >= 700) return "🥇 Gold";
    if (score >= 600) return "🥈 Silver";
    return "🥉 Bronze";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">ZeroCred Dashboard</h1>
      {!connected ? (
        <button
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white"
          onClick={connect}
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-md text-center">
          <p className="mb-4 font-mono text-sm text-gray-400">
            {account}
          </p>
          <div className="text-3xl mb-2 font-bold">
            {loading ? "Loading..." : `Score: ${score}`}
          </div>
          <div className="text-lg mb-4">
            {score ? getBadge(score) : ""}
          </div>
          <button
            onClick={updateScore}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Recalculate Score
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <MetaMaskProvider>
      <Dashboard />
    </MetaMaskProvider>
  );
}
