let taskManagement = artifacts.require("./TaskManagement.sol");

module.exports = function(deployer) {
  deployer.deploy(taskManagement);
};
