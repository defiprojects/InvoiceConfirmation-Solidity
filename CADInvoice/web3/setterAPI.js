const connect = require('./web3config.js')

    //smart connect.contract methods
    exports.addInvoice = async (req, res)=>{ 
      const {_address, _amount, _invoiceNum, _fromAddress} = req.body
      console.log(_fromAddress, _amount, _invoiceNum)
      try {
          
          let result = await connect.contract.methods.addInvoice(_fromAddress, _amount, _invoiceNum).send({from: _address})
          console.log(result)
          res.status(200).json(result)
      
      } catch (error) {
          err = {
            name : "Web3-AddInvoice",
            error : error,
        }
      res.status(400).json(err)
      }
    }

    
    exports.setBackEndUser = async (req, res)=>{ 
      const {_address, _from} = req.body
      try {
          
          let result = await connect.contract.methods.setBackEndUser(_address).send({from: _from })
          // return result
          res.status(200).json(result)
      
      } catch (error) {
        err  = {
          name : "Web3-setBackEndUser",
          error : error
      }
      // return err
      res.status(400).json(err)
      }
    }



