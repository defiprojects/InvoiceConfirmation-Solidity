var Web3 = require("web3")
require('dotenv').config()
 
 var provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/4c1b13ce2c89403d951d451c575a1f68");
 var web3 = new Web3(provider);
 //const address = "0xA280AEf01DDbb3f90C64c7F7A5aa5e8853110D3B"
 const address = "0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25";
 const abi = ""
 const contract = new web3.eth.Contract(abi, address);
 //accounts
 const account = process.env.OWNER

 module.exports = {web3, address, abi, contract, account}

