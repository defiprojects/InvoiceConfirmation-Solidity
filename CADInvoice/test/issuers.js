const truffleAssert = require('truffle-assertions')

const Issuers = artifacts.require("Issuers")

contract("Emitters", async accounts => {

    let issuer = accounts[1]
    let vendor = "0x0300000000000000000000000034000000000000000000000000000000000000"

    it("Admin can give access to an issuer", async () => {
        let instance = await Issuers.new()
        let result = await instance.addIssuer(
            issuer,
            vendor,
        )
        await truffleAssert.eventEmitted(result, 'logNewIssuer', (ev) => {
            return ev._address == issuer && ev._vendor == vendor
        })
    })

    it("Others cannot grant issuer access", async () => {
        let instance = await Issuers.new()
        truffleAssert.fails(
            instance.addIssuer(
                issuer,
                vendor, {
                    from: issuer
                }
            )
        )
        truffleAssert.fails(
            instance.addIssuer(
                issuer,
                vendor, {
                    from: accounts[5]
                }
            )
        )
    })

    it("Others cannot revoke access from an issuer (issuer)", async () => {
        let instance = await Issuers.new()
        await truffleAssert.passes(
            instance.addIssuer(
                issuer,
                vendor,
            )
        )
        await truffleAssert.reverts(
            instance.revokeIssuer(
                issuer,
                vendor, {
                    from: issuer
                }
            )
        )
        await truffleAssert.reverts(
            instance.revokeIssuer(
                issuer,
                vendor, {
                    from: accounts[5]
                }
            )
        )
    })

    it("Admin can revoke access from a issuer (issuer)", async () => {
        let instance = await Issuers.new()
        await truffleAssert.passes(
            await instance.addIssuer(
                issuer,
                vendor,
            )
        )
        await truffleAssert.passes(
            await instance.revokeIssuer(
                issuer,
                vendor,
            )
        )
        let hasRole = await instance.hasRole(
            issuer,
            vendor,
        )
        assert.equal(hasRole, false)
    })
})