import {
  Account,
  GlittrSDK,
  Network,
  addFeeToTx,
  electrumFetchNonGlittrUtxos,
  txBuilder,
} from "@glittr-sdk/sdk";
import axios from "axios";
import * as fs from "fs";

interface GlittrEscrowParams {
  client: GlittrSDK;
  clientAccount: Account;
  freelancerAccount: Account;
  arbitratorAccount: Account;
  openaiApiKey?: string;
}

interface VerificationResult {
  success: boolean;
  reason?: string;
  score?: number;
}

export class GlittrEscrow {
  private sdk: GlittrSDK;
  private clientAccount: Account;
  private freelancerAccount: Account;
  private arbitratorAccount: Account;
  private openaiApiKey: string | undefined;
  private currentEscrowTxId: string | null = null;

  constructor(params: GlittrEscrowParams) {
    this.sdk = params.client;
    this.clientAccount = params.clientAccount;
    this.freelancerAccount = params.freelancerAccount;
    this.arbitratorAccount = params.arbitratorAccount;
    this.openaiApiKey = params.openaiApiKey;
  }

  async createEscrowJob(requirements: string, amount: number): Promise<string> {
    console.log(`Creating escrow job with amount: ${amount} satoshis`);

    try {
      const requirementsData = Buffer.from(requirements).toString("hex");

      const txid = await (this.sdk as any).createAndBroadcastRawTx({
        account: this.clientAccount.p2pkh(),
        inputs: [],
        outputs: [
          {
            // Use 2-of-3 multisig address with client, freelancer, and arbitrator
            script: (txBuilder as any).scripts.p2ms(2, [
              this.clientAccount.p2pkh().keypair.publicKey,
              this.freelancerAccount.p2pkh().keypair.publicKey,
              this.arbitratorAccount.p2pkh().keypair.publicKey,
            ]),
            value: amount,
          },

          {
            script: (txBuilder as any).scripts.nullData(requirementsData),
            value: 0,
          },
        ],
      });

      this.currentEscrowTxId = txid;
      return txid;
    } catch (error) {
      console.error("Error creating escrow job:", error);
      throw error;
    }
  }

  async submitCodeForVerification(
    codeFilePath: string
  ): Promise<VerificationResult> {
    if (!this.openaiApiKey) {
      throw new Error("OpenAI API key is required for code verification");
    }

    try {
      const code = fs.readFileSync(codeFilePath, "utf8");

      let requirements = "";

      try {
        const txInfo = await (this.sdk as any).api(
          "blockchain.transaction.get",
          [this.currentEscrowTxId, true]
        );
        if (txInfo && txInfo.vout) {
          // Look for OP_RETURN output
          for (const vout of txInfo.vout) {
            if (vout.scriptPubKey.type === "nulldata") {
              const hexData = vout.scriptPubKey.hex.substring(4); // Skip OP_RETURN prefix
              requirements = Buffer.from(hexData, "hex").toString("utf8");
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching transaction:", error);

        requirements = "Create a simple React counter component";
      }

      const verificationResult = await this.verifyCodeWithGPT(
        code,
        requirements
      );

      if (verificationResult.success) {
        await this.releaseFundsToFreelancer();
      }

      return verificationResult;
    } catch (error) {
      console.error("Error submitting code for verification:", error);
      throw error;
    }
  }

  async initiateDispute(reason: string): Promise<any> {
    console.log(`Client initiating dispute with reason: ${reason}`);

    try {
      const disputeData = Buffer.from(`DISPUTE:${reason}`).toString("hex");

      const txid = await (this.sdk as any).createAndBroadcastRawTx({
        account: this.clientAccount.p2pkh(),
        inputs: [],
        outputs: [
          {
            script: (txBuilder as any).scripts.nullData(disputeData),
            value: 0,
          },
        ],
      });

      return { txid, status: "disputed" };
    } catch (error) {
      console.error("Error initiating dispute:", error);
      throw error;
    }
  }

  async resolveDispute(clientShareRatio: number): Promise<any> {
    console.log(
      `Arbitrator resolving dispute with client ratio: ${clientShareRatio}`
    );

    if (clientShareRatio < 0 || clientShareRatio > 1) {
      throw new Error("Client share ratio must be between 0 and 1");
    }

    try {
      const utxos = await electrumFetchNonGlittrUtxos(
        this.sdk,
        this.arbitratorAccount.p2pkh().address
      );

      if (!utxos || utxos.length === 0) {
        throw new Error("No UTXOs available for the arbitrator");
      }

      const totalAmount = 1000000; // 0.01 BTC
      const clientAmount = Math.floor(totalAmount * clientShareRatio);
      const freelancerAmount = totalAmount - clientAmount;

      const txData = await (addFeeToTx as any)(
        this.sdk.network as Network,
        this.arbitratorAccount.p2pkh().address,
        utxos,
        [
          {
            address: this.clientAccount.p2pkh().address,
            value: clientAmount,
          },

          {
            address: this.freelancerAccount.p2pkh().address,
            value: freelancerAmount,
          },
        ]
      );

      const txid = await (this.sdk as any).createAndBroadcastRawTx({
        account: this.arbitratorAccount.p2pkh(),
        inputs: txData.inputs,
        outputs: txData.outputs,
      });

      return { txid, status: "resolved", clientAmount, freelancerAmount };
    } catch (error) {
      console.error("Error resolving dispute:", error);
      throw error;
    }
  }

  private async verifyCodeWithGPT(
    code: string,
    requirements: string
  ): Promise<VerificationResult> {
    if (!this.openaiApiKey) {
      throw new Error("OpenAI API key is required for code verification");
    }

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "You are an expert code reviewer tasked with verifying if submitted code meets the specified requirements. Analyze the code carefully and provide a detailed assessment.",
            },
            {
              role: "user",
              content: `Requirements:\n${requirements}\n\nCode to review:\n${code}\n\nDoes the code meet all the requirements? Respond with only YES or NO, followed by a brief explanation.`,
            },
          ],
          temperature: 0.2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.openaiApiKey}`,
          },
        }
      );

      const content = response.data.choices[0].message.content;
      const startsWithYes = content.trim().toUpperCase().startsWith("YES");

      return {
        success: startsWithYes,
        reason: content,
        score: startsWithYes ? 1 : 0,
      };
    } catch (error) {
      console.error("Error verifying code with GPT:", error);
      throw error;
    }
  }

  private async releaseFundsToFreelancer(): Promise<string> {
    console.log(`Releasing funds to freelancer`);

    try {
      const utxos = await electrumFetchNonGlittrUtxos(
        this.sdk,
        this.clientAccount.p2pkh().address
      );

      if (!utxos || utxos.length === 0) {
        throw new Error("No UTXOs available for the client");
      }

      const outputs = [
        {
          address: this.freelancerAccount.p2pkh().address,
          value: 1000000, // 0.01 BTC
        },
      ];

      const txData = await (addFeeToTx as any)(
        this.sdk.network as Network,
        this.clientAccount.p2pkh().address,
        utxos,
        outputs
      );

      const txid = await (this.sdk as any).createAndBroadcastRawTx({
        account: this.clientAccount.p2pkh(),
        inputs: txData.inputs,
        outputs: txData.outputs,
      });

      return txid;
    } catch (error) {
      console.error("Error releasing funds to freelancer:", error);
      throw error;
    }
  }
}
