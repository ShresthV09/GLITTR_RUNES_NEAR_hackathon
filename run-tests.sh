#!/bin/bash




echo "🚀 Starting TrustLock Glittr Escrow Contract Test Runner"


if [ ! -f .env ]; then
  echo "❌ Error: .env file not found!"
  echo "Please create a .env file with the required environment variables:"
  echo "OPENAI_API_KEY=your_openai_api_key"
  echo "NETWORK=regtest"
  echo "API_KEY=3f799dfe-fb41-4847-a334-c416a703ad31"
  echo "ELECTRUM_API=http://localhost:24224/"
  echo "GLITTR_API=http://localhost:3001"
  exit 1
fi


export $(grep -v '^#' .env | xargs)


if [ -z "$OPENAI_API_KEY" ]; then
  echo "❌ Error: OPENAI_API_KEY is not set in the .env file!"
  exit 1
fi


echo "✅ Using locally running Electrum and Glittr services"


echo "🔨 Building Next.js project..."
npm run build


if [ $? -ne 0 ]; then
  echo "❌ Next.js build failed. Please fix the errors and try again."
  exit 1
fi


echo "💰 Funding test accounts..."

npm run fund-accounts


if [ $? -ne 0 ]; then
  echo "❌ Funding test accounts failed. Please check the logs for errors."
  exit 1
fi


echo "⏳ Waiting for funding transactions to be confirmed..."
sleep 5


echo "🧪 Running escrow contract tests with real GPT-4o verification..."

npm run test-escrow


if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Please check the logs for errors."
  exit 1
else
  echo "✅ All tests completed successfully!"
fi

echo "🏁 Testing process complete!" 