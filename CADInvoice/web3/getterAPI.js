const connect = require('./web3config.js')
  

    //CAD Invoice Contract
    exports.getInvoiceStat = async (_tnx)=>{ 
        try {
           
            let result = await connect.web3.eth.getTransactionReceipt(_tnx).call()
           
            return result
        
        } catch (error) {
            err = {
                name : "Web3-TnxStat",
                error : error
            }
            return err
        }

    },

    exports.getOutgoingInvoice = async () => {
        try {

            let result = await connect.web3.eth.getBlockNumber()
            console.log(result)
            return result

        } catch (error) {
            err = {
                name : "Web3-GetOutgoingInvoice",
                error : error,
            }
            return err
        }

    }

    // get latest block number
    exports.getlastestblocknumber = async () => {
        try {

            let result = await connect.web3.eth.getBlockNumber()
            console.log(result)
            return result

        } catch (error) {
            err = {
                name : "Web3-GetLastestBlockNumber",
                error : error,
            }
            return err
        }
    }

    // get latest block
    exports.getblock = async () => {
        try {

            let result = await connect.web3.eth.getBlock('latest')
            console.log('Get Latest Block >>>',result)
            return result

        } catch (error) {
            err = {
                name : "Web3-GetLastestBlock",
                error : error,
            }
            return err
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

