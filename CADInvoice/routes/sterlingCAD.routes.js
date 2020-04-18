const { auth } = require("../middlewares");
const controller = require("../controllers/sterlingCAD");
const getter = require("../web3/getterAPI");
const setter = require("../web3/setterAPI");


module.exports = function(app) {
    //Getter Routes
    app.get("/api/web3/block", getter.getblock); 
    app.get("/api/web3/blocknum", getter.getlastestblocknumber);
    app.get("/api/web3/invoice", getter.getInvoice);
    app.get("/api/web3/invoice1", getter.getOutgoingInvoice);
    app.get("/api/web3/balance", getter.getBalance);
    app.get("/api/web3/incoming", getter.numberOfIncomingInvoice);
    
    

    //Setter Routes
    app.post("/api/web3/addinvoice", setter.addInvoice); 
    app.post("/api/web3/setadmin", setter.setBackEndUser); 
};