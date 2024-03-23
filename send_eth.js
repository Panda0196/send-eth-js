require('dotenv').config();
const ethers = require('ethers');

const gas_price = 10;
const gas_limit = 21000;

(async () => {
  const provider = new ethers.WebSocketProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const balance = await provider.getBalance(wallet.address);
  const amount = ethers.parseEther('.001', 'ether');
  if (balance < amount) {
    console.log('Not enough ETH:', ethers.formatEther(balance));
    return;
  }
  console.log('Gas fee:', ethers.formatEther(ethers.parseUnits('' + (gas_price * gas_limit), 'gwei')));

  const tx = await wallet.sendTransaction({
    to: process.env.TO_WALLET,
    value: amount,
    gasLimit: gas_limit,
    gasPrice: ethers.parseUnits('' + gas_price, 'gwei')
  });
  console.log(tx)
})();