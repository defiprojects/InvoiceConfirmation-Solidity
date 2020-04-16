const connect = require('./web3config.js')

    //smart connect.contract methods
    exports.addInvoice = async (_fromAddress, _amount, _invoiceNum)=>{ 
      try {
          
          let result = await connect.contract.methods.addInvoice(_amount, _invoiceNum).send({from: _fromAddress })
          return result
      
      } catch (error) {
          err = {
            name : "Web3-AddInvoice",
            error : error,
        }
      return err
      }
    }



