import { Account, GlittrSDK, txBuilder } from "@glittr-sdk/sdk";

async function main() {
  const NETWORK = "regtest";

  const client = new GlittrSDK({
    network: NETWORK,
    electrumApi: "http://127.0.0.1:24224/",
    glittrApi: "http://127.0.0.1:3001",
    apiKey: "3f799dfe-fb41-4847-a334-c416a703ad31",
  });
  const account = new Account({
    wif: "cW84FgWG9U1MpKvdzZMv4JZKLSU7iFAzMmXjkGvGUvh5WvhrEASj",
    network: NETWORK,
  });

  const c = txBuilder.freeMint({
    amount_per_mint: "2",
    divisibility: 18,
    live_time: 0,
    supply_cap: "2000",
    ticker: "TEST",
  });

  const txid = await client.createAndBroadcastTx({
    account: account.p2pkh(),
    tx: c,
    outputs: [],
  });
  console.log("TXID : ", txid);
}

main();
