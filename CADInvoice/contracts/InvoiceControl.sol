pragma solidity >=0.4.0 <0.7.0;

/**
* @title Issuer Interface
* @dev Only functions used by InvoiceControl are included
*/
interface Issuer {
    function checkRole(address addr, bytes32 roleName) external view;
    function isVendorValid(bytes32 _vendorHash) external view returns (bool);
}

/**
* @title ERC20
* @dev Only functions used by SterlingCAD are included
*/
interface ERC20 {
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

/**
* @title InvoiceControl
* @dev Prints the invoice
*/
contract InvoiceControl {

    // @dev invoice data struct
    struct Invoice {
        string name;
        string email;
        bytes32 vendor;
        string item;
        string dates;
        uint16 itemHours;
        bool valid;
        string representativeName;
        address issuerAddress;
    }

    mapping (bytes32 => Invoice) public invoices;
    mapping (bytes32 => bytes32) public invoiceData;
    uint public price;
    ERC20 tokenContract;
    Issuer accessControl;
    address wallet;

    // @dev Event fired for every new invoice, to be checked to get all invoices
    event logPrintedInvoice(
        bytes32 _contractAddress,
        string _name,
        string _email,
        bytes32 _vendor,
        string _item,
        string _dates,
        uint16 _hours);

    /**
    * @dev Constructor, sets price, token, wallet and access control state vars
    * @param _price Price per invoice printed/invalidated
    * @param _token Token used to pay for invoices
    * @param _accessControl Contract that manages issuers and vendors
    * @param _wallet Address to which payments are transfered
    */
    constructor (uint _price, address _token, address _accessControl, address _wallet) public {
        tokenContract = ERC20(_token);
        accessControl = Issuer(_accessControl);
        price = _price;
        wallet = _wallet;
    }

    /**
    * @dev Prints an Invoice
    * @param _name Price per invoice printed/invalidated
    * @param _email Token used to pay for invoices
    * @param _vendor vendor issuing the invoice
    * @param _item item
    * @param _dates Dates
    * @param _hours Hours
    * @param _representativeName representative Name
    * @param _data Anything goes
    */
    function printInvoice (
        string memory _name,
        string memory _email,
        bytes32 _vendor,
        string memory _item,
        string memory _dates,
        uint16 _hours,
        string memory _representativeName,
        bytes32 _data
        )
        public
        charge
        onlyVendor(_vendor)
        returns (
            bytes32 invoiceAddress
            ) {
        // creates invoice address
        invoiceAddress = keccak256(abi.encodePacked(block.number, now, msg.data));

        // create invoice data
        invoices[invoiceAddress] = Invoice(_name, _email, _vendor, _item, _dates, _hours, true, _representativeName, msg.sender);
        invoiceData[invoiceAddress] = _data;

        // creates the event, to be used to query all the invoices
        emit logPrintedInvoice(invoiceAddress, _name, _email, _vendor, _item, _dates, _hours);
    }

    /**
    * @dev Invalidates a invoice
    * @param _invoiceAddress Address of the invoice to be invalidated
    */
    function invalidateInvoice(bytes32 _invoiceAddress) external onlyInvoiceIssuer(_invoiceAddress) charge {
        invoices[_invoiceAddress].valid = false;
    }

    /**
    * @dev Updates price
    * @param _newPrice new Price (same decimal places as the token)
    */
    function updatePrice(uint _newPrice) public onlyAdmin {
        price = _newPrice;
    }

    /**
    * @dev Updates token address
    * @param _newAddress new Token Address
    */
    function updateToken(address _newAddress) public onlyAdmin {
        tokenContract = ERC20(_newAddress);
    }

    /**
    * @dev View token address
    */
    function getTokenAddress() public view returns (address) {
        return(address(tokenContract));
    }

    /**
    * @dev Access Control Address
    */
    function accessControlAddress() public view returns (address) {
        return(address(accessControl));
    }

     // @dev Modifier: allows only if the user has access to vendor that issued the invoice
    modifier onlyInvoiceIssuer(bytes32 _invoiceAddress) {
        bytes32 vendor = invoices[_invoiceAddress].vendor;
        accessControl.checkRole(msg.sender, vendor);
        _;
    }

    // @dev Modifier: allows only if the user has access to vendor that issued the invoice
    modifier onlyAdmin() {
        accessControl.checkRole(msg.sender, bytes32("admin"));
        _;
    }

   // @dev Modifier: allows only if the user has access to institution that issued the certificate
    modifier onlyVendor(bytes32 _vendor) {
        accessControl.checkRole(msg.sender, _vendor);
        require(accessControl.isVendorValid(_vendor), "Invalid Vendor");
        _;
    }

    // @dev Modifier: allows only if the user has access to vendor that issued the invoice
    modifier charge() {
        require(tokenContract.transferFrom(msg.sender, wallet, price), "Token transfer failed. Check balance and approval.");
        _;
    }

}
