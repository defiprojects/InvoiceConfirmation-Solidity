pragma solidity >=0.4.0 <0.7.0;

/**
* @title Ownable
* @dev The Ownable contract has an owner address, and provides basic authorization control
* functions, this simplifies the implementation of "user permissions".
*/
contract Ownable {
  address public owner;
  address public backEnd;

  event OwnershipRenounced(address indexed previousOwner);
  event BackEndUserAdded(address indexed backEndAddress);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner, "Owner Account");
    _;
  }

   /**
   * @dev Throws if called by any account other than the backend User.
   */
  modifier onlyBackEnd() {
    require(msg.sender == backEnd, "Backend User");
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0), "New Owner");
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  function setBackEndUser(address backEndUser) public onlyOwner {
    require(backEndUser != address(0), "New Backend User");
    emit BackEndUserAdded(backEndUser);
    backEnd = backEndUser;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }
}

/**
* @title CaleroMain
* @dev Calero platform main smart contract.
*/
contract SterlingCad is Ownable {
    struct Invoice {
        address seller;
        address buyer;
        uint amount;
        uint256 invoiceNum;
        bool paid;
    }

    Invoice[] internal invoices;

    mapping (address => uint[]) internal sellers;
    mapping (address => uint[]) internal buyers;
    mapping (address => uint) public balances;

    function addInvoice(address fromAddress, uint amount, uint256 invoiceNum) public {
        Invoice memory inv = Invoice({
            buyer: fromAddress,
            seller: msg.sender,
            amount: amount,
            invoiceNum: invoiceNum,
            paid: false
        });


        invoices.push(inv);
        sellers[inv.seller].push(invoices.length - 1);
        buyers[inv.buyer].push(invoices.length - 1);
    }

    function viewInvoice(uint id) public onlyBackEnd view returns(address, address, uint, uint, bool) {
        Invoice memory inv = invoices[id];
        return (inv.seller, inv.buyer, inv.amount, inv.invoiceNum, inv.paid);
    }


    function getIncomingInvoices(address buyerAddress, uint uid) public onlyBackEnd view returns (uint, address, uint, uint, bool) {
        Invoice memory inv = invoices[buyers[buyerAddress][uid]];
        return (buyers[buyerAddress][uid], inv.buyer, inv.amount, inv.invoiceNum, inv.paid);
    }

    function numberOfIncomingInvoices(address buyerAddress) public onlyBackEnd view returns (uint) {
        return buyers[buyerAddress].length;
    }


    function getOutgoingInvoice(address sellerAddress, uint uid) public onlyBackEnd view returns (uint, address, uint, uint, bool) {
        Invoice memory inv = invoices[sellers[sellerAddress][uid]];
        return (sellers[sellerAddress][uid], inv.buyer, inv.amount, inv.invoiceNum, inv.paid);
    }

    function numberOfOutgoingInvoices(address sellerAddress) public onlyBackEnd view returns (uint) {
        return sellers[sellerAddress].length;
    }


    function pay(uint id) public payable {
        Invoice storage inv = invoices[id];

        require(inv.paid == false, "");
        require(inv.buyer == msg.sender, "");
        require(msg.value == inv.amount, "");

        inv.paid = true;
        balances[inv.seller] += msg.value;
    }

    function withdraw() public {
        require(balances[msg.sender] != 0, "");

        uint toWithdraw = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(toWithdraw);
    }

}