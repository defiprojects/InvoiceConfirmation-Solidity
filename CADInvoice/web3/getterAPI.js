const connect = require('./web3config.js')
  

    //Token Contract
    exports.getOwner = async ()=>{
        try {
            let result = await connect.contract.methods.owner().call()
            console.log(result)
            return result
        
        } catch (error) {
            err = {
                name : "Web3-Owner",
                error : error,
            }
            console.log(err)
            return err
        }
        
    },

    exports.getTnxCount = async ()=>{
        try {
           
            let result = await connect.web3.eth.getTransactionCount(connect.account).call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-TnxCount",
                error : error
            }
            return err
        }

    },

    exports.getTnxStat = async (_tnx)=>{ 
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

    exports.getTotalSupply = async ()=>{
        try {
           
            let result = await connect.contract.methods.totalSupply().call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-TotalSupply",
                error : error,
            }
            return err
        }
        
    },

    exports.balanceOf = async (_address)=>{
        try {
           
            let result = await connect.contract.methods.balanceOf(_address).call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-BalanceOf",
                error : error,
            }
            return err
        }

    },

    exports.getBlackList = async () => {
        try {
            let balances = await connect.contract.methods.getBlackList().call()
            result = {
                Lien : balances[0],
                Tradeable : balances[1]
            }
            return result
        } catch (error) {
            err = {
                name : "Web3-GetBlackList",
                error : error
            }
            return err
        }
    }

    //Mint Contract
    exports.getadmins = async () => {
        try {

            let result = await connect.contract.methods.getadmins().call()
            
            return result

        } catch (error) {
            err = {
                name : "Web3-GetAdmins",
                error : error,
            }
            return err
        }
    },

    exports.isApproved = async _scheduleid =>{
        try {
            let result = await connect.contract.methods.isApproved(_scheduleid).call()
            return result
        } catch (error) {
            err = {
                name : "Web3-isApproved",
                error : error,
            }
            return err
        }
        
    },

    exports.getApprovalCount = async _scheduleId =>{
        try {           
            let result = await connect.contract.methods.getApprovalCount(_scheduleId).call()
            return result
        
        } catch (error) {
            err = {
                name : "Web3-ApprovalCount",
                error : error
            }
            return err
        }

    },

    exports.getscheduleCount = async (_pending, _iscompleted) =>{
        try {
           
            let result = await connect.contract.methods.getscheduleCount(_pending, _iscompleted).call()
            
            return result
        
        } catch (error) {
            err = {
                name : "Web3-ScheduleCount",
                error : error
            }
            return err
        }

    },

    exports.getapprovals = async _getapprovals =>{
        try {
            let result = await connect.contract.methods.getapprovals(_getapprovals).call()
            return result
        } catch (error) {
            err = {
                name : "Web3-GetApprovals",
                error : error
            }
            return err
        }

    },

    exports.getscheduleIds = async (_from, _to, _pending, _isCompleted) =>{
        try {
            let result = await connect.contract.methods.getscheduleIds(_from, _to, _pending, _isCompleted).call()
            return result
        } catch (error) {
            err = {
                name : "Web3-GetSchedules",
                error : error
            }
            return err
        }

    }

    exports.getTokenBals = async _addr => {
        try {
            let balances = await connect.contract.methods.getTokenBals(_addr).call()
            result = {
                Lien : balances[0],
                Tradeable : balances[1]
            }
            return result
        } catch (error) {
            err = {
                name : "Web3-TokenBalances",
                error : error
            }
            return err
        }
    }

    exports.getauthorizers = async () => {
        try {

            let result = await connect.contract.methods.getauthorizers().call()
            
            return result

        } catch (error) {
            err = {
                name : "Web3-Getauthorizers",
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

