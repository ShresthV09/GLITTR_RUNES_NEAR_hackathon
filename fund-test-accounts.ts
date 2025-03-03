import { GlittrSDK, Account, Network } from "@glittr-sdk/sdk";
import * as dotenv from "dotenv";

dotenv.config();

const NETWORK = process.env.NETWORK || "regtest";
const API_KEY = process.env.API_KEY || "3f799dfe-fb41-4847-a334-c416a703ad31";
const ELECTRUM_API = process.env.ELECTRUM_API || "http://localhost:24224/";
const GLITTR_API = process.env.GLITTR_API || "http://localhost:3001";

const accounts = [
  "cVbMJKcfEpwrKsGnMCEpfmtSfRe5wRJVQF4xz1XBBQcSP8cNPEGy",
  "cW84FgWG9U1MpKvdzZMv4JZKLSU7iFAzMmXjkGvGUvh5WvhrEASj",
  "cN5n9wsrnDEDJkvRKCwMkFcgQFmQG6Jx2vznSbhxL8stYvKsGQhV",
];

async function fundAccounts() {
  console.log(`Loading configuration from environment:`);
  console.log(`Network: ${NETWORK}`);
  console.log(`Electrum API: ${ELECTRUM_API}`);
  console.log(`Glittr API: ${GLITTR_API}`);

  const client = new GlittrSDK({
    network: NETWORK as Network,
    electrumApi: ELECTRUM_API,
    glittrApi: GLITTR_API,
    apiKey: API_KEY,
  });

  console.log("Funding test accounts in regtest...");

  const minerAccount = new Account({
    wif: "cVQVgBr8iW2EBCP5U9iS6NyNhxKP3RRdpJeLaGGNxXLhsHGxvYb7",
    network: NETWORK as Network,
  });

  for (const wif of accounts) {
    try {
      const account = new Account({
        wif,
        network: NETWORK as Network,
      });

      const address = account.p2pkh().address;
      console.log(`Funding ${address}...`);

      const txid = await client.createAndBroadcastTx({
        account: minerAccount.p2pkh(),
        tx: {} as any,
        outputs: [{ address, value: 100000000 }],
      });

      console.log(`✅ Funded ${address} with 1 BTC`);
      console.log(`   Transaction ID: ${txid}`);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to fund account: ${error}`);
    }
  }

  console.log("Done funding test accounts.");
}

fundAccounts().catch(console.error);
