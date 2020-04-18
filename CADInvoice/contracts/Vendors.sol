pragma solidity >=0.4.0 <0.7.0;


import "./RBAC.sol";

/**
* @title Vendors
* @dev Manages Vendors allowed to issue certificates
*/
contract Vendors is RBAC {

    // @dev Vendor data struct
    struct Vendor {
        string code;
        string name;
        uint256 validFrom;
        uint256 validTo;
        bool valid;
    }

    // @dev vendor data mapping for storage
    mapping (bytes32 => Vendor) public vendors;

    // @dev Event fired for every new vendor, to be checked to get all Vendors
    event logNewVendor(bytes32 _hash, string _code, string _name, uint256 _timestamp);

    /**
    * @dev Add vendor
    * @param _name Name of the vendor
    * @param _code Short name (Code)
    */
    function addVendor (
        string memory _name,
        string memory _code
        ) public onlyAdmin() returns (bytes32 vendorHash) {

        // creates vendor hash
        vendorHash = keccak256(abi.encodePacked(block.number, now, msg.data));

        // create vendor data
        vendors[vendorHash] = Vendor(_code, _name, now, now + 31536000, true);

        // fires the event, to be used to query all the Vendors
        emit logNewVendor(vendorHash, _code, _name, now);
    }

    /**
    * @dev Invalidates a Vendor
    * @param _vendorHash vendor hash
    */
    function invalidateVendor(bytes32 _vendorHash) public onlyAdmin() {
        vendors[_vendorHash].valid = false;
        vendors[_vendorHash].validTo = now;
    }

    /**
    * @dev Returnst true if vendor is valid
    * @param _vendorHash vendor hash
    */
    function isVendorValid(bytes32 _vendorHash) public view returns (bool) {
        return vendors[_vendorHash].valid == true && vendors[_vendorHash].validTo >= now;
    }

    // @dev Modifier to allow only users from a given vendor to access functions
    modifier onlyVendor(bytes32 _vendorHash) {
        checkRole(msg.sender, _vendorHash);
        require(isVendorValid(_vendorHash), "Invalid vendor");
        _;
    }

}