const connect = require('./web3config.js')

    //smart connect.contract methods
    exports.addVendor = async () => {
      try {
          
        let result = await connect.contract.methods.addInvoice(name, code).send({from: fromAddress })
        return result
    
    } catch (error) {
        err = {
          name : "Web3-AddVendor",
          error : error,
      }
    return err
    }
  }

  exports.addInvoice = async () => {
    try {
        
      let result = await connect.contract.methods.addInvoice(_invoiceAddress).send({from: fromAddress })
      return result
  
  } catch (error) {
      err = {
        name : "Web3-AddInvoice",
        error : error,
    }
  return err
  }
}



