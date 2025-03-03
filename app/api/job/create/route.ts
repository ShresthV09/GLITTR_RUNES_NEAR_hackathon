// app/api/job/create/route.ts
import { NextResponse } from "next/server";
import { createJobContract } from "@/lib/glittr/contracts";
import { Account } from "@glittr-sdk/sdk/dist/account";
import { GlittrSDK } from "@glittr-sdk/sdk/dist/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const glittrClient = new GlittrSDK({
  network: "regtest",
  electrumApi: "http://127.0.0.1:3000",
  glittrApi: "http://127.0.0.1:3001",
  apiKey: "",
});

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      requirements,
      stakeBTC,
      deadline,
      userAddress,
      privateKey,
    } = await request.json();

    // Create account from private key
    const account = new Account({
      privateKey: privateKey,
      network: "regtest",
    });

    // Create job contract transaction
    const jobContract = createJobContract(
      requirements,
      stakeBTC,
      Math.floor(new Date(deadline).getTime() / 1000)
    ) as any;

    // Broadcast transaction
    const txid = await glittrClient.createAndBroadcastTx({
      account: account.p2pkh(),
      tx: jobContract,
      outputs: [{ address: account.p2pkh().address, value: 546 }],
    });

    // Get block information after transaction is mined
    // Note: In production you'd need to wait for confirmation
    // For demo, assume it gets mined in the next block
    await new Promise((resolve) => setTimeout(resolve, 15000));

    const txInfo = await glittrClient.getGlittrMessageByTxId(txid);
    const contractId = `${txInfo.block_height},${txInfo.tx_index}`;

    // Store in database
    const user = await prisma.user.findUnique({
      where: { address: userAddress },
    });

    const job = await prisma.job.create({
      data: {
        title,
        description,
        requirements,
        contractId,
        clientStake: stakeBTC,
        clientId: user.id,
        deadline: new Date(deadline),
        status: "OPEN",
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
