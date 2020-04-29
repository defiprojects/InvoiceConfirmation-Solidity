 // Web3 stuff
 contractAddress = "0xA8033F3eC6567F298792F1C94acc706727257e80"

 // Init web3
 var Web3 = require('web3');

 var injectedWeb3 = false;
 if (typeof web3 !== 'undefined') {
     web3js = new Web3(web3.currentProvider);
     console.log("injected web3")
     var injectedWeb3 = true;
 } else {
     //set the provider to Rinkeby/Infura, will only work for view functions
     web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/4c1b13ce2c89403d951d451c575a1f68"));
     console.log("infura")
 }

 invoiceContract = web3js.eth.contract(contractAbi).at(contractAddress);
