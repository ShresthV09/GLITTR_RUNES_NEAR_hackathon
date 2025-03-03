# Testing the TrustLock Glittr Escrow Contract

This guide explains how to test the TrustLock Glittr Escrow Contract using the regtest environment with real GPT-4o verification.

## Prerequisites

1. Docker installed on your system
2. Node.js and npm installed
3. An OpenAI API key for GPT-4o access

## Setup Environment

1. **Create a .env file** in the project root with the following variables:

   ```
   OPENAI_API_KEY=your_openai_api_key
   NETWORK=regtest
   API_KEY=yout_api_key
   ELECTRUM_API=http://localhost:24224/
   GLITTR_API=http://localhost:3001
   ```

2. **Start the Glittr local regtest node** using Docker:
   ```bash
   docker run -p 24224:24224 -p 3001:3001 glittr/glittr-regtest
   ```

## Running the Tests

### Step 1: Fund the Test Accounts

First, fund the test accounts in the regtest environment:

```bash
npm run build
npx ts-node fund-test-accounts.js
```

This script will fund the client, freelancer, and arbitrator accounts with 1 BTC each in the regtest environment.

### Step 2: Run the Escrow Contract Tests

Once the accounts are funded, run the escrow contract tests:

```bash
npx ts-node test-escrow.js
```

The test script will:

1. Create an escrow job with requirements
2. Submit good code for verification using the real GPT-4o API
3. Create another escrow job
4. Submit bad code for verification
5. Test the dispute resolution process

## Test Cases Explained

The test script performs the following tests:

1. **Creating an Escrow Job**

   - Verifies that a client can create an escrow job with requirements
   - Funds the escrow with the specified amount

2. **Code Verification - Good Code**

   - Submits code that meets the requirements
   - Verifies that GPT-4o correctly identifies it as good code
   - Checks that payment is released to the freelancer

3. **Code Verification - Bad Code**

   - Submits code that doesn't meet the requirements
   - Verifies that GPT-4o correctly identifies it as bad code

4. **Dispute Resolution**
   - Tests the dispute initiation process
   - Tests the arbitrator's ability to resolve the dispute

## Troubleshooting

- **Transaction Confirmation Issues**: If you encounter issues with transaction confirmations, try increasing the wait time between transactions in the test script.
- **API Connection Failures**: Ensure the Docker container is running and accessible on the specified ports.
- **GPT-4o API Errors**: Check your OpenAI API key and ensure you have sufficient quota for the API calls.

## Extending the Tests

To add more test cases, modify the `test-escrow.ts` file with additional scenarios and edge cases to verify the contract's functionality under different conditions.
