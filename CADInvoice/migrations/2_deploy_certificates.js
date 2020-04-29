var SterlingCAD = artifacts.require("SterlingCAD");
var Issuers = artifacts.require("Issuers");
var SterlingToken = artifacts.require("SterlingToken");

// for testing only, implments a token with faucet, mints tokens to deployer and creates an allowance for the print contract
// then it creates an institution, and gives access to it and prints a certificate
// you can print certificates directly
const deployContractsDevelopment = async (deployer, accounts) => {

  const wallet = accounts[0]

  /* token */
  const token = await deployer.deploy(SterlingToken)

  /* issuers */
  const issuers = await deployer.deploy(Issuers)

  /* print */
  await deployer.deploy(SterlingCAD, "100000000000000000", token.address, issuers.address, wallet)

}

const deployContracts = async (deployer, accounts) => {
  try {

    const wallet = accounts[0]

    const token = await deployer.deploy(SterlingToken)
    /* issuers */
    const issuers = await deployer.deploy(Issuers)

    /* print */
    const print = await deployer.deploy(SterlingCAD, "100000000000000000", token.address, issuers.address, wallet)

    return true
  } catch (err) {
    console.log('### error deploying contracts', err)
  }
}


module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
      if (["dev","test","rinkeby"].includes(deployer.network))
        await deployContractsDevelopment(deployer, accounts)
      else
        await deployContracts(deployer, accounts)
      console.log('### finished deploying contracts')
    })
    .catch(err => console.log('### error deploying contracts', err))
}