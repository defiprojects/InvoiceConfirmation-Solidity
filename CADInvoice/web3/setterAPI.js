const connect = require('./web3config.js')

    //Token smart connect.contract methods
    exports.generateToken = async (_scheduleId, _addr, _amount, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.generateToken(_scheduleId, _addr, _amount).send({from: _from })
          return result
      
      } catch (error) {
          err = {
            name : "Web3-GenerateToken",
            error : error,
        }
      return err
      }
    },

    exports.transfer = async (_address, _amount, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.transfer(_address, _amount).send({from: _from })
          return result
      
      } catch (error) {
        err  = {
          name : "Web3-Transfer",
          error : error
      }
      return err
      }
    },

    exports.allowance = async (_owner, _spender, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.allowance(_owner, _spender).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-Allowance",
          error : error
        }
        return err
      }
    },

    exports.approve = async (_spender, _amount, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.approve(_spender, _amount).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-Approve",
          error : error
        }
      return err
      }
    },

    exports.transferFrom = async (_sender, _recipient, _amount, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.transferFrom(_sender, _recipient, _amount).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-TransferFrom",
          error : error
        }
        return err
      }
    },

    exports.increaseAllowance = async (_spender, _addedValue, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.increaseAllowance(_spender, _addedValue).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-IncreaseAllowance",
          error : error
        }
      return err
      }
    },

    exports.decreaseAllowance = async (_spender, _subtractedValue, _from) => { 
      try {
          
          let result = await connect.contract.methods.decreaseAllowance(_spender, _subtractedValue).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-DecreaseAllowance",
          error : error
        }
        return err
      }
    },

    exports.verifySchedule = async (_scheduleid, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.verifySchedule(_scheduleid).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-VerifySchedule",
          error : error
        }
        return err
      }
    },

    //MultiSig wallet
    exports.addAuthorizer = async _authorizer =>{ 
      try {
          
          let result = await connect.contract.methods.addauthorizer(_authorizer).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-AddAuthorizer",
          error : error
        }
      return err
      }
    },

    exports.removeAuthorizer = async _authorizer => { 
      try {
          
          let result = await connect.contract.methods.removeauthorizer(_authorizer).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-RemoveAuthorizer",
          error : error
        }
      return err
      }
    },
    
    exports.replaceAuthorizer = async (_authorizer, _newauthorizer)=>{ 
      try {
          
          let result = await connect.contract.methods.replaceauthorizer(_authorizer, _newauthorizer).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-ReplaceAuthorizer",
          error : error
        }
      return err
      }
    },

    exports.addAdmin = async (_admin)=>{ 
      try {
          
          let result = await connect.contract.methods.addadmin(_admin).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-AddAdmin",
          error : error
        }
      return err
      }
    },

    exports.removeAdmin = async (_admin)=>{ 
      try {
          
          let result = await connect.contract.methods.removeadmin(_admin).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-RemoveAdmin",
          error : error
        }
      return err
      }
    },
    
    exports.replaceAdmin = async (_admin, _newadmin)=>{ 
      try {
          
          let result = await connect.contract.methods.replaceadmin(_admin, _newadmin).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-ReplaceAdmin",
          error : error
        }
      return err
      }
    },

    exports.changeRequirement = async (_requiredApprovals)=>{ 
      try {
          
          let result = await connect.contract.methods.changeRequirement(_requiredApprovals).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-ChangeRequirement",
          error : error
        }
        return err
      }
    },

    exports.approveMint = async (_scheduleId, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.approve(_scheduleId).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-ApprovalMint",
          error : error
        }
        return err
      }
    },

    exports.undoApprovalMint = async (_scheduleId, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.undoApproval(_scheduleId).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-UndoApprovalMint",
          error : error
        }
        return err
      }
    },

    exports.createSchedule = async (_amount, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.createSchedule(_amount).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-CreateSchedule",
          error : error
        }
       return err
      }
    },

    exports.updateSchedule = async (_scheduleId, _status, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.updateSchedule(_scheduleId, _status).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-UpdateSchedule",
          error : error
        }
      return err
      }
    },

    exports.validateSchedule = async (_scheduleId, _from)=>{ 
      try {
          
          let result = await connect.contract.methods.validateSchedule(_scheduleId).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-ValidateSchedule",
          error : error
      }
        return err
      }
    },
    
    exports.createAccount = async (_passwrd, _from) => {
      try {
        let addr = await connect.web3.eth.personal.newAccount(_passwrd)
         await connect.contract.methods.setWhiteList(addr).send({from: _from })
        return addr;
      } catch (error) {
        err = {
          name : "Web3-CreateAccount",
          error : error
        }
      return err
      }
    }

    exports.setWhiteList = async _addr => { 
      try {
          
          let result = await connect.contract.methods.setWhiteList(_addr).send({from : connect.account})
          return result
      
      } catch (error) {
        err = {
          name : "Web3-SetWhiteList",
          error : error
      }
        return err
      }
    },

    exports.removeWhiteList = async (_addr, _from) => { 
      try {
          
          let result = await connect.contract.methods.removeWhiteList(_addr).send({from: _from })
          return result
      
      } catch (error) {
        err = {
          name : "Web3-RemoveWhiteList",
          error : error
      }
        return err
      }
    }



