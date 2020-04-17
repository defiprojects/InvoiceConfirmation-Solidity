const { getOutgoingInvoice, getlastestblocknumber, getblock, getblocknumber, viewInvoice } = require("./getterApi")

const { addInvoice } = require("./setterApi")

module.exports = {
    addInvoice,
    getblock,
    getlastestblocknumber,
    getblocknumber,
    getOutgoingInvoice,
    viewInvoice
}