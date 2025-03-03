import { GlittrSDK, Account, Network } from "@glittr-sdk/sdk";
import { GlittrEscrow } from "./lib/contracts/GlittrEscrowSimple";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const NETWORK: Network = (process.env.NETWORK as Network) || "regtest";
const API_KEY = process.env.API_KEY || "3f799dfe-fb41-4847-a334-c416a703ad31";
const ELECTRUM_API = process.env.ELECTRUM_API || "http://localhost:24224/";
const GLITTR_API = process.env.GLITTR_API || "http://localhost:3001";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is required in your .env file");
  process.exit(1);
}

const CLIENT_WIF = "cVbMJKcfEpwrKsGnMCEpfmtSfRe5wRJVQF4xz1XBBQcSP8cNPEGy";
const FREELANCER_WIF = "cW84FgWG9U1MpKvdzZMv4JZKLSU7iFAzMmXjkGvGUvh5WvhrEASj";
const ARBITRATOR_WIF = "cN5n9wsrnDEDJkvRKCwMkFcgQFmQG6Jx2vznSbhxL8stYvKsGQhV";

// Test data
const JOB_REQUIREMENTS = `
Create a simple React component that:
1. Displays a counter starting at 0
2. Has buttons to increment and decrement the counter
3. Prevents the counter from going below 0
4. Displays the counter value in red when it's above 10
`;

const GOOD_CODE = `
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev > 0 ? prev - 1 : 0);
  
  return (
    <div className="counter">
      <h2>Counter</h2>
      <p style={{ color: count > 10 ? 'red' : 'black' }}>{count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
`;

const BAD_CODE = `
import React from 'react';

const Counter = () => {
  let count = 0;
  
  const increment = () => { count++; };
  const decrement = () => { count--; };
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Counter;
`;

async function runTests() {
  console.log(
    "🧪 Starting GlittrEscrow contract tests with real GPT verification..."
  );
  console.log(`Network: ${NETWORK}`);
  console.log(`Electrum API: ${ELECTRUM_API}`);
  console.log(`Glittr API: ${GLITTR_API}`);
  console.log("OpenAI API: Using real GPT-4o API");

  const client = new GlittrSDK({
    network: NETWORK,
    electrumApi: ELECTRUM_API,
    glittrApi: GLITTR_API,
    apiKey: API_KEY,
  });

  const clientAccount = new Account({ wif: CLIENT_WIF, network: NETWORK });
  const freelancerAccount = new Account({
    wif: FREELANCER_WIF,
    network: NETWORK,
  });
  const arbitratorAccount = new Account({
    wif: ARBITRATOR_WIF,
    network: NETWORK,
  });

  console.log(`Client address: ${clientAccount.p2pkh().address}`);
  console.log(`Freelancer address: ${freelancerAccount.p2pkh().address}`);
  console.log(`Arbitrator address: ${arbitratorAccount.p2pkh().address}`);

  const escrow = new GlittrEscrow({
    client: client,
    clientAccount: clientAccount,
    freelancerAccount: freelancerAccount,
    arbitratorAccount: arbitratorAccount,
    openaiApiKey: OPENAI_API_KEY,
  });

  try {
    console.log("\n📋 Test 1: Creating escrow job...");
    const jobAmount = 1000000; // 0.01 BTC
    const escrowTxId = await escrow.createEscrowJob(
      JOB_REQUIREMENTS,
      jobAmount
    );
    console.log(`✅ Escrow job created with TXID: ${escrowTxId}`);
    console.log(`💰 Job funded with ${jobAmount} satoshis`);

    console.log("Waiting for transaction confirmation...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("\n💻 Test 2: Submitting good code for verification...");

    const goodCodePath = "./temp-good-code.js";
    fs.writeFileSync(goodCodePath, GOOD_CODE);

    try {
      console.log("Using real GPT-4o for code verification...");
      const verificationResult = await escrow.submitCodeForVerification(
        goodCodePath
      );
      console.log("✅ Code verification result:", verificationResult);

      if (verificationResult.success) {
        console.log("✅ Code verification passed!");
        console.log(`💸 Payment released to freelancer`);
      } else {
        console.log("❌ Code verification failed!");
      }
    } catch (error) {
      console.error("Error during good code verification:", error);
    }

    if (fs.existsSync(goodCodePath)) {
      fs.unlinkSync(goodCodePath);
    }

    console.log("\n📋 Creating another escrow job for bad code test...");
    const escrowTxId2 = await escrow.createEscrowJob(
      JOB_REQUIREMENTS,
      jobAmount
    );
    console.log(`✅ Second escrow job created with TXID: ${escrowTxId2}`);

    console.log("Waiting for transaction confirmation...");
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait longer for confirmation

    console.log("\n💻 Test 3: Submitting bad code for verification...");

    const badCodePath = "./temp-bad-code.js";
    fs.writeFileSync(badCodePath, BAD_CODE);

    try {
      console.log("Using real GPT-4o for code verification...");
      const verificationResult = await escrow.submitCodeForVerification(
        badCodePath
      );
      console.log("✅ Code verification result:", verificationResult);

      if (!verificationResult.success) {
        console.log("✅ As expected, bad code verification failed!");

        console.log("\n⚖️ Test 4: Testing dispute resolution...");

        const disputeReason =
          "The code doesn't meet the requirements. It doesn't prevent negative values and doesn't change color when count > 10.";
        console.log("Client initiating dispute with reason:", disputeReason);
        const disputeResult = await escrow.initiateDispute(disputeReason);
        console.log("✅ Dispute initiated:", disputeResult);

        console.log("Waiting for dispute transaction confirmation...");
        await new Promise((resolve) => setTimeout(resolve, 5000));

        console.log("Arbitrator resolving dispute with 50/50 split...");
        const resolution = await escrow.resolveDispute(0.5);
        console.log("✅ Dispute resolved:", resolution);
      } else {
        console.log("❓ Unexpected: Bad code verification passed!");
      }
    } catch (error) {
      console.error("Error during bad code verification:", error);
    }

    if (fs.existsSync(badCodePath)) {
      fs.unlinkSync(badCodePath);
    }
  } catch (error) {
    console.error("Test failed:", error);
  }

  console.log("\n🏁 All tests completed!");
}

runTests().catch(console.error);
