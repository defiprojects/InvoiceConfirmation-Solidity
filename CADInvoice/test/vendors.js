const truffleAssert = require('truffle-assertions')

const Issuers = artifacts.require("Issuers")


contract("Vendors", async accounts => {

    let admin = accounts[0]
    let issuer = accounts[1]
    let vendor = "0x0300000000000000000000000034000000000000000000000000000000000000"

    it("Admin add/create Vendor", async () => {
        let instance = await Issuers.new()
        let result = await instance.addVendor(
            "Sterling Bank",
            vendor,
        )
        await truffleAssert.eventEmitted(result, 'logNewVendor', (ev) => {
            return ev._name == "Sterling Bank" && ev._code == vendor
        })
    })

    it("Others cannot add/create vendor", async () => {
        let instance = await Issuers.new()
        await truffleAssert.fails(
            instance.addVendor("Sterling Bank", vendor, {
                from: issuer
            })
        )
    })

    it("Others cannot revoke/delete Vendor", async () => {
        let instance = await Issuers.new()
        let result = await instance.addVendor(
            "Sterling Bank",
            vendor,
        )
        let vendorHash = result.receipt.logs[0].args[0]
        await truffleAssert.fails(
            instance.invalidateVendor(vendorHash, {
                from: accounts[2]
            })
        )
    })

    it("Admin can revoke Vendor", async () => {
        let instance = await Issuers.new()
        let result = await instance.addVendor(
            "Sterling Bank",
            vendor,
        )
        let vendorHash = result.receipt.logs[0].args[0]
        await truffleAssert.passes(
            instance.invalidateVendor(vendorHash)
        )
    })
})