let SterlingCad = artifacts.require("SterlingCAD");

let issuer;
let customer;
let amount;
let invoiceNum;

let Owner = "0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25";

contract("SterlingCad", accounts => {
    before(async () => {
        instance = await SterlingCad.deployed();

        
    });
    
})
