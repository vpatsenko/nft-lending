# `Ownable`

Contract module which provides a basic access control mechanism, where

there is an account (an owner) that can be granted exclusive access to

specific functions.

By default, the owner account will be the one that deploys the contract. This

can later be changed with {transferOwnership}.

This module is used through inheritance. It will make available the modifier

`onlyOwner`, which can be applied to your functions to restrict their use to

the owner.

Modified version from openzeppelin/contracts/access/Ownable.sol that allows to

initialize the owner using a parameter in the constructor

## Modifiers:

- `onlyOwner()`

## Functions:

- `constructor(address _initialOwner) (internal)`

- `transferOwnership(address _newOwner) (public)`

- `owner() (public)`

## Events:

- `OwnershipTransferred(address previousOwner, address newOwner)`

### Modifier `onlyOwner()`

Throws if called by any account other than the owner.

### Function `constructor(address _initialOwner) internal`

Initializes the contract setting the deployer as the initial owner.

### Function `transferOwnership(address _newOwner) public`

Transfers ownership of the contract to a new account (`newOwner`).

Can only be called by the current owner.

### Function `owner() → address public`

Returns the address of the current owner.

### Event `OwnershipTransferred(address previousOwner, address newOwner)`
