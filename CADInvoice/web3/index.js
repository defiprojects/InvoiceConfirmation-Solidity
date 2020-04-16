const { getInvoiceStat, getlastestblocknumber, getblock, getblocknumber  } = require("./getterApi")

const { addInvoice } = require("./setterApi")

module.exports = {
    addInvoice,
    getblock,
    getlastestblocknumber,
    getblocknumber,
    getInvoiceStat
}