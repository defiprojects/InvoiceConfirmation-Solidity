const connect = require('./web3config.js')
  

    //CAD Invoice Contract
    exports.getOutgoingInvoice = async (req, res) => {
        var _customerAddress = req.body._customerAddress
        var _uid = req.body._uid
        try {

            let result = await connect.web3.eth.getOutgoingInvoice(_customerAddress, _uid)
            console.log(result)
            // return result
            res.status(200).json(result)

        } catch (error) {
            err = {
                name : "Web3-GetOutgoingInvoice",
                error : error,
            }
            // return err
            res.status(400).json(err)
        }

    }

    exports.viewInvoice = async (req, res) => {
        var _id = req.body._id
        try {
            let result = await connect.web3.eth.viewInvoice(_id)
            console.log(result)
            // return result
            res.status(200).json(result)

        } catch (error) {
            err = {
                name : "Web3-ViewInvoice",
                error : error,
            }
            // return err
            res.status(400).json(err)
        }

    }

    exports.numberOfIncomingInvoice = async (req, res) => {
        var customerAddress = req.body._customerAddress
        try {

            let result = await connect.web3.eth.numberOfIncomingInvoice(customerAddress)
            console.log(result)
            // return result
            res.status(200).json(result)

        } catch (error) {
            err = {
                name : "Web3-NumberOfIncomingInvoice",
                error : error,
            }
            res.status(400).json(err)
        }
        
    }

    exports.getInvoice = async (req, res) => {
        const {_fromAddress, _invoiceNum} = req.body
        try {
            
            let result = await connect.web3.eth.getInvoice(_invoiceNum).send({from: _fromAddress})
            console.log(result)
            // return result
            res.status(200).json(result)

        } catch (error) {
            err = {
                name : "Web3-GetInvoice",
                error : error,
            }
            res.status(400).json(err)
        }
        
    }

    // get latest block number
    exports.getlastestblocknumber = async (req, res) => {
        try {

            let result = await connect.web3.eth.getBlockNumber()
            console.log(result)
            res.status(200).json(result)
            // return result

        } catch (error) {
            err = {
                name : "Web3-GetLastestBlockNumber",
                error : error,
            }
            // return err
            res.status(400).json(err)
        }
    }

    // get latest block
    exports.getblock = async (req, res) => {
        try {
            let result = await connect.web3.eth.getBlock('latest')
            console.log('Get Latest Block >>>',result)
            // return result
            res.status(200).json(result)
            // return result

        } catch (error) {
            err = {
                name : "Web3-GetLastestBlock",
                error : error,
            }
            // return err
            res.status(400).json(err)
        }
    }

    exports.getBalance = async (req, res) => {
        try {
            let result = await connect.web3.eth.getBalance("0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25")
            console.log(result)
            res.status(200).json(result)
            // return result

        } catch (error) {
            err = {
                name : "Web3-GetBalance",
                error : error,
            }
            // return err
            res.status(400).json(err)
        }
    }

    // get latest 10 blocks
    exports.getblocknumber = async () => {
        try {

            let blocknumber = await connect.web3.eth.getBlockNumber()
            result = []
            for (let i = 0; i < 10; i++) {
                block = await connect.web3.eth.getBlock(blocknumber - i).then(results=>{
                result[i] = results
            })
              }
            //console.log('Get latest 10 blocks >>>', result)
            return result
        } catch (error) {
            err = {
                name : "Web3-GetLastest10Block",
                error : error,
            }
            console.log(error)
            return err
        }
    }

    // Inspect transaction within a block
    exports.gettransactionfromblock = async hash => {
        try {

            let result = await connect.web3.eth.getTransactionFromBlock(hash, 2)
            console.log(result)
            return result

        } catch (error) {
            err = {
                name : "Web3-InspectBlock",
                error : error,
            }
            return err
        }
    }

