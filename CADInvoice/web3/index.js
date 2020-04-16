const { getInvoiceStat, getlastestblocknumber, getblock, getblocknumber } = require("./getterApi")

const { addInvoice, pay } = require("./setterApi")

module.exports = {
    addInvoice,
    getblock,
    getlastestblocknumber,
    getblocknumber,
    getInvoiceStat,
    pay
}