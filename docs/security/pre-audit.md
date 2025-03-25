# Pre-Audit

This repository has been pre-audited to increase the quality of the code going into the audit. This allows auditors to more easily approach the repository, as the contracts have been run through automated testing tools, as well has having up-to-date documentation.

## Process

This pre-audit consists of the following elements:

1. **Docs:** Ensuring the smart contracts are document to the NatSpec, in the format specified within the format section of this document.
2. **Manual code review:** A manual pre-audit review of the code for common security issues and vulnerabilities.
3. **Automated testing tools:** Static and dynamic testing tools will be run over the repository. The various outputs will be inside the Automated Testing document within this security folder. This will include dismissals for false positives as well as a log of changes made for any discovered issues.
4. **Final repository QA:** Ensuring the general readability and quality of the code. For example all the contracts are correctly marked (i.e mock contracts are clearly mocks etc), there are no remaining `TODO`s within the repository etc.

Check the results from [automated testing tools.](./testing-tools.md)

---

# Format

All of the functions need to be formatted according to the NatSpec. Below is an example function with the correct documentation:

```
/**
 * @param   _test A test address. All parameters must have an underscore.
 * @param   _num A test number. All parameters must have an underscore.
 * @return  bool The success status of the function. Should the return variable
 *          be named, there should not be an underscore prefix.
 * @notice  This function is an example function. Here is where we explain what
 *          the function does, and why we have it.
 * @dev     If there is anything notable that a developer would need to know,
 *          for example complex logic, or modifiers.
 */
function example(address _test, uint256 _num) public returns(bool) {
    // Function scoped variables do not have an underscore
    address aFunctionVariable = 0x...;
}
```

Solidity files should be indented with 4 spaces. Note that inline documentation uses `//` and NOT `///`. Note that all the NatSpec docs have been tabbed so that they all start in the same position. This makes it easier to read, as well as making generated docs look cleaner.

The order of information within a file is as follows:

1. State variables
2. Events
3. Constructor & single call initialising functions
4. View & pure functions
5. State modifying functions (public & external)
6. Internal functions (internal & private)

This order increases readability, and must be applied consistently to all `.sol` files, including interfaces and abstract contracts.

# Contracts

Tags to look for:

```
// DOCS     These tags are where you need to add documentation
// BUG      Potential vulnerability
// FIX      Change that needs to be made, best practice not being followed, etc.
// TODO     General catch all for things that need to get done
// QS       Checking that something is correct. Not necessarily a bug, more a question
```

These tags should not be visible in the repository after the conclusion of the pre-audit.
