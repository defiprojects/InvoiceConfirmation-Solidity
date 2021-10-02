const truffleAssert = require('truffle-assertions')

const Issuers = artifacts.require("Issuers")
const InvoiceControl = artifacts.require("SterlingCAD")
const Token = artifacts.require("SterlingToken")

contract("Invoices", async accounts => {

    let admin = accounts[0]
    let issuer = accounts[1]
    let vendor = "0x0300000000000000000000000034000000000000000000000000000000000000"
    let vendor2 = "0x0300000000000000000000000034000000000000000000000000000000000001"
    let wallet = accounts[3]
    let price = "100000000000000000"

    let name = "Olusegun Komolafe"
    let email = "joshusegun@gmail.com"
    let item = "GBC - Solidity"
    let dates = "18th April 2020"
    let hours = 16
    let representativeName = "Joshua Komolafe"

    it("Issuer can print vendors invoice", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await InvoiceControl.new(price, token.address, issuers.address, wallet)

        let inst = await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )
        let vendorHash = inst.receipt.logs[0].args[0]

        await issuers.addIssuer(
            issuer,
            vendorHash
        )

        await token.faucet({
            from: issuer
        })
        await token.approve(instance.address, price, {
            from: issuer
        })
        let result = await instance.printInvoice(
            name,
            email,
            vendorHash,
            item,
            dates,
            hours,
            representativeName,
            "0x0", {
                from: issuer
            }
        )
        await truffleAssert.eventEmitted(result, 'logPrintedInvoice', (ev) => {
            return ev._name == name && ev._email == email && ev._vendor == vendorHash && ev._item == item && ev._dates == dates
        })
    })

    it("Issuer cannot print non-existent invoice", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await InvoiceControl.new(price, token.address, issuers.address, wallet)

        await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )

        await issuers.addIssuer(
            issuer,
            vendor
        )

        await token.faucet({
            from: issuer
        })
        await token.approve(instance.address, price, {
            from: issuer
        })
        await truffleAssert.reverts(
            instance.printInvoice(
                name,
                email,
                vendor2,
                item,
                dates,
                hours,
                representativeName,
                "0x0", {
                    from: issuer
                }
            )
        )
    })

    it("Issuer cannot print invalid invoice", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await InvoiceControl.new(price, token.address, issuers.address, wallet)

        let result = await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )
        let vendorHash = result.receipt.logs[0].args[0]

        await issuers.addIssuer(
            issuer,
            vendorHash
        )

        await issuers.invalidateVendor(vendorHash)

        await token.faucet({
            from: issuer
        })
        await token.approve(instance.address, price, {
            from: issuer
        })
        await truffleAssert.reverts(
            instance.printInvoice(
                name,
                email,
                vendorHash,
                item,
                dates,
                hours,
                representativeName,
                "0x0", {
                    from: issuer
                }
            )
        )
    })

    it("Issuer cannot print invoice without payment", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await InvoiceControl.new(price, token.address, issuers.address, wallet)

        let result = await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )
        let vendorHash = result.receipt.logs[0].args[0]

        await issuers.addIssuer(
            issuer,
            vendorHash
        )

        await truffleAssert.reverts(
            instance.printInvoice(
                name,
                email,
                vendorHash,
                item,
                dates,
                hours,
                representativeName,
                "0x0", {
                    from: issuer
                }
            )
        )
    })

    it("Issuer can revoke invoice", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await InvoiceControl.new(price, token.address, issuers.address, wallet)

        let inst = await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )
        let vendorHash = inst.receipt.logs[0].args[0]

        await issuers.addIssuer(
            issuer,
            vendorHash
        )

        await token.faucet({
            from: issuer
        })
        await token.approve(instance.address, (Number(price) * 2).toString(), {
            from: issuer
        })
        let result = await instance.printInvoice(
            name,
            email,
            vendorHash,
            item,
            dates,
            hours,
            representativeName,
            "0x0", {
                from: issuer
            }
        )
        let invoiceAddress = result.receipt.logs[0].args[0]
        await instance.invalidateInvoice(
            invoiceAddress, {
                from: issuer
            }
        )

        const isValid = await instance.invoices(invoiceAddress)
        assert.equal(isValid.valid, false)
    })

    it("Others cannot revoke invoice", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await InvoiceControl.new(price, token.address, issuers.address, wallet)

        let inst = await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )
        let vendorHash = inst.receipt.logs[0].args[0]

        await issuers.addIssuer(
            issuer,
            vendorHash
        )

        await token.faucet({
            from: issuer
        })
        await token.approve(instance.address, (Number(price) * 2).toString(), {
            from: issuer
        })
        let result = await instance.printInvoice(
            name,
            email,
            vendorHash,
            item,
            dates,
            hours,
            representativeName,
            "0x0", {
                from: issuer
            }
        )
        let invoiceAddress = result.receipt.logs[0].args[0]
        await truffleAssert.reverts(
            instance.invalidateInvoice(
                invoiceAddress, {
                    from: admin
                }
            )
        )
        await truffleAssert.reverts(
            instance.invalidateInvoice(
                invoiceAddress, {
                    from: wallet
                }
            )
        )
        await truffleAssert.reverts(
            instance.invalidateInvoice(
                invoiceAddress, {
                    from: accounts[8]
                }
            )
        )

        const isValid = await instance.invoices(invoiceAddress)
        assert.equal(isValid.valid, true)
    })

    it("Issuer cannot revoke without paying", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await SterlingCAD.new(price, token.address, issuers.address, wallet)

        let inst = await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )
        let vendorHash = inst.receipt.logs[0].args[0]

        await issuers.addIssuer(
            issuer,
            vendorHash
        )

        await token.faucet({
            from: issuer
        })
        await token.approve(instance.address, (Number(price) * 2).toString(), {
            from: issuer
        })
        let result = await instance.printInvoice(
            name,
            email,
            vendorHash,
            item,
            dates,
            hours,
            representativeName,
            "0x0", {
                from: issuer
            }
        )
        let invoiceAddress = result.receipt.logs[0].args[0]
        await token.approve(instance.address, "0", {
            from: issuer
        })
        await truffleAssert.reverts(
            instance.invalidateInvoice(
                invoiceAddress, {
                    from: issuer
                }
            )
        )

        const isValid = await instance.invoices(invoiceAddress)
        assert.equal(isValid.valid, true)
    })
    it("Charging the right price", async () => {
        let issuers = await Issuers.new()
        let token = await Token.new()
        let instance = await InvoiceControl.new(price, token.address, issuers.address, wallet)

        let inst = await issuers.addVendor(
            "Vendor Bank",
            vendor,
        )
        let vendorHash = inst.receipt.logs[0].args[0]

        await issuers.addIssuer(
            issuer,
            vendorHash
        )

        await token.faucet({
            from: issuer
        })
        await token.approve(instance.address, (Number(price) * 2).toString(), {
            from: issuer
        })
        await instance.printInvoice(
            name,
            email,
            vendorHash,
            item,
            dates,
            hours,
            representativeName,
            "0x0", {
                from: issuer
            }
        )
        const balance = await token.balanceOf(wallet)
        assert.equal(balance.toString(), price)
    })
})
