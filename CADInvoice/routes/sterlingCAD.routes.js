const { auth } = require("../middlewares");
const controller = require("../controllers/sterlingCAD");
const getter = require("../web3/getterAPI");
const setter = require("../web3/setterAPI");


module.exports = function(app) {
    //Getter Routes
    app.get("/api/web3/block", getter.getblock); 
    app.get("/api/web3/invoice", getter.viewInvoice);
    app.get("/api/web3/invoice1", getter.getOutgoingInvoice);
    

    //Setter Routes
    app.post("/api/web3/testpost",setter.addInvoice); 
};