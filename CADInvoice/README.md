# SterlingCAD
> Created By Olusegun Komolafe

Sterling Invoice Confirmation platform main smart contract.
## sterlingCAD

## Functions :wrench:

### Sterling CAD Invoice:
* `addInvoice( address fromAddress, uint amount, uint invoiceNum)`
* `viewInvoice(uint id)`
* `getInvoice(address fromAddress, uint InvoiceNum)`
* `getIncomingInvoices(address customerAddress, uint invoiceNum)`
* `numberOfIncomingInvoices(address buyerAddress)`
* `getOutgoingInvoice(address issuerAddress, uint invoiceNum)`
* `numberOfOutgoingInvoices(address issuerAddress)`
* `pay(uint id)`
* `withdraw()`

### Ownable SC:

* `transferOwnership(address newOwner)`
* `setBackEndUser(address backEndUser)`
* `renounceOwnership()`

## BackEndUserAdded - post
|name |type |description
|-----|-----|-----------
|backEndAddress|address|
 
	"address":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"
 
## OwnershipRenounced - post
|name |type |description
|-----|-----|-----------
|previousOwner|address|

	"address":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"
 

## OwnershipTransferred - post
|name |type |description
|-----|-----|-----------
|previousOwner|address|
|newOwner|address|

	"address":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"
 
## addInvoice - post
|name |type |description
|-----|-----|-----------
|fromAddress|address|
|amount|uint256|
|invoiceNum|uint256|

	"fromAddress":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25",
	"amount":"5000", 
	"invoiceNum":"12", 


## balances - get
|name |type |description
|-----|-----|-----------
||address|


	"address":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"
 
  

## getIncomingInvoices - get
|name |type |description
|-----|-----|-----------
|customerAddress|address|
|invoiceNum|uint256|

	"customerAddress":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25",
	"invoiceNum":"uint256", 
 
  
## getOutgoingInvoice - get
|name |type |description
|-----|-----|-----------
|issuerAddress|address|
|invoiceNum|uint256|

	"issuerAddress":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25",
	"invoiceNum":"uint256", 


## numberOfIncomingInvoices - read
|name |type |description
|-----|-----|-----------
|customerAddress|address|

	"customerAddress":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"

## numberOfOutgoingInvoices - read
|name |type |description
|-----|-----|-----------
|issuerAddress|address|

	"issuerAddress":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"
 
  
## pay - post
|name |type |description
|-----|-----|-----------
|invoiceNum|uint256|

	"invoiceNum":""
 
## setBackEndUser - post
|name |type |description
|-----|-----|-----------
|backEndUser|address|

	"address":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"
 
## transferOwnership - read
|name |type |description
|-----|-----|-----------
|newOwner|address|The address to transfer ownership to.
Allows the current owner to transfer control of the contract to a newOwner.

## viewInvoice - read
|name |type |description
|-----|-----|-----------
|invoiceNum|uint256|

	"fromAddress":"0x08B0E1dE1DB9bBD1eDAca9F6551769F338602B25"
	"invoiceNum":"12", 
	

