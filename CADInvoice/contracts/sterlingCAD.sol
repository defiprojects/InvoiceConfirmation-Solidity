pragma solidity ^0.6.1;

import "./Ownable.sol";

/**
* @title sterlingCAD
* @dev Sterling Invoice Confirmation platform main smart contract.
* @author Olusegun Komolafe
*/
contract SterlingCAD is Ownable {
    struct Invoice {
        address issuer;
        address customer;
        uint256 amount;
        uint256 invoiceNum;
        bool paid;
    }

    Invoice[] internal invoices;

    mapping(address => uint256[]) internal issuers;
    mapping(address => uint256[]) internal customers;
    mapping(address => uint256) public balances;

    function addInvoice(address fromAddress, uint256 amount, uint256 invoiceNum)
        public
    {
        Invoice memory inv = Invoice({
            customer: fromAddress,
            issuer: msg.sender,
            amount: amount,
            invoiceNum: invoiceNum,
            paid: false
        });

        invoices.push(inv);
        issuers[inv.issuer].push(invoices.length - 1);
        customers[inv.customer].push(invoices.length - 1);
    }

    function viewInvoice(uint256 id)
        public
        view
        onlyBackEnd
        returns (address, address, uint256, uint256, bool)
    {
        Invoice memory inv = invoices[id];
        return (inv.issuer, inv.customer, inv.amount, inv.invoiceNum, inv.paid);
    }

    function getIncomingInvoices(address customerAddress, uint256 uid)
        public
        view
        onlyBackEnd
        returns (uint256, address, uint256, uint256, bool)
    {
        Invoice memory inv = invoices[customers[customerAddress][uid]];
        return (
            customers[customerAddress][uid],
            inv.customer,
            inv.amount,
            inv.invoiceNum,
            inv.paid
        );
    }

    function numberOfIncomingInvoices(address customerAddress)
        public
        view
        onlyBackEnd
        returns (uint256)
    {
        return customers[customerAddress].length;
    }

    function getOutgoingInvoice(address issuerAddress, uint256 uid)
        public
        view
        onlyBackEnd
        returns (uint256, address, uint256, uint256, bool)
    {
        Invoice memory inv = invoices[issuers[issuerAddress][uid]];
        return (
            issuers[issuerAddress][uid],
            inv.customer,
            inv.amount,
            inv.invoiceNum,
            inv.paid
        );
    }

    function numberOfOutgoingInvoices(address issuerAddress)
        public
        view
        onlyBackEnd
        returns (uint256)
    {
        return issuers[issuerAddress].length;
    }

    function pay(uint256 id) public payable {
        Invoice storage inv = invoices[id];
        require(inv.paid == false, "Customer not Paid.");
        require(inv.customer == msg.sender, "Customer to Pay sender.");
        require(msg.value == inv.amount, "Customer Has Paid");
        inv.paid = true;
        balances[inv.issuer] += msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] != 0, "Customer Balance");
        uint256 toWithdraw = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(toWithdraw);
    }

}
