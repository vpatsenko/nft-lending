# `PermittedPartners`

Registry for partners permitted for reciving a revenue share.

Each partner's address is associated with the percent of the admin fee shared.

## Functions:

- `constructor(address _admin) (public)`

- `setPartnerRevenueShare(address _partner, uint16 _revenueShareInBasisPoints) (external)`

- `getPartnerPermit(address _partner) (external)`

## Events:

- `PartnerRevenueShare(address partner, uint16 revenueShareInBasisPoints)`

### Function `constructor(address _admin) public`

Sets the admin of the contract.

#### Parameters:

- `_admin`: - Initial admin of this contract.

### Function `setPartnerRevenueShare(address _partner, uint16 _revenueShareInBasisPoints) external`

This function can be called by admins to change the revenue share status of a partner. This includes

adding an partner to the revenue share list, removing it and updating the revenue share percent.

#### Parameters:

- `_partner`: - The address of the partner.

- `_revenueShareInBasisPoints`: - The percent (measured in basis points) of the admin fee amount that will be

taken as a revenue share for a the partner.

### Function `getPartnerPermit(address _partner) → uint16 external`

This function can be called by anyone to get the revenue share parcent associated with the partner.

#### Parameters:

- `_partner`: - The address of the partner.

#### Return Values:

- Returns the partner's revenue share

### Event `PartnerRevenueShare(address partner, uint16 revenueShareInBasisPoints)`

This event is fired whenever the admin sets a partner's revenue share.

#### Parameters:

- `partner`: - The address of the partner.

- `revenueShareInBasisPoints`: - The percent (measured in basis points) of the admin fee amount that will be

taken as a revenue share for a the partner.
