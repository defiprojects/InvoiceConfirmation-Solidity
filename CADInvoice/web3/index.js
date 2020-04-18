const { getOutgoingInvoice, getlastestblocknumber, getblock, getblocknumber, viewInvoice, getInvoice } = require("./getterApi")

const { addInvoice } = require("./setterApi")

module.exports = {
    addInvoice,
    getblock,
    getInvoice,
    getlastestblocknumber,
    getblocknumber,
    getOutgoingInvoice,
    viewInvoice

}