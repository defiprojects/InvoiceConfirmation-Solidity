pragma solidity >=0.4.0 <0.7.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mockup token contract built for testing the Invoice issuer.
// Standard ERC20 implementation from OpenZeppelin

// Added faucet functionality to enable testing

contract SterlingToken is ERC20 {

    string public constant name = "Sterling Bank Token";
    uint8 public constant decimals = 18;

    // self service minting, to allow for easy testing.
    function faucet() public returns (bool) {
        _mint(msg.sender, 1000 * uint(10)**decimals);
        return true;
    }

}