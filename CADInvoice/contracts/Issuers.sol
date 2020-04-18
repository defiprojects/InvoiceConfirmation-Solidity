pragma solidity >=0.4.0 <0.7.0;

import "./Vendors.sol";

/**
* @title Issuers
* @dev Manages users allowed to issue certificates from a determined vendor
*/
contract Issuers is Vendors {

    // @dev Event fired for every new issuer, to be checked to get all issuers
    event logNewIssuer(address _address, bytes32 _vendor, uint256 _timestamp);

    /**
    * @dev adds new Issuer to valid Vendor
    * @param _issuerAddress Address to be used for issuing certificates
    * @param _vendor vendor allowed (multiple vendors possible)
    */
    function addIssuer(address _issuerAddress, bytes32 _vendor) public onlyAdmin() {
        require(vendors[_vendor].valid = true, "Vendor inactive or invalid.");
        addRole(_issuerAddress, _vendor);
        emit logNewIssuer(_issuerAddress, _vendor, now);
    }

    /**
    * @dev Revokes access from Issuer
    * @param _issuerAddress Address to be revoked
    * @param _vendor vendor to be revoked (only the access to this vendor is revoked, revoke others in case of compromised keys)
    */
    function revokeIssuer(address _issuerAddress, bytes32 _vendor) public onlyAdmin() {
        removeRole(_issuerAddress, _vendor);
    }
}
