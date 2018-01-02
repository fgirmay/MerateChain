var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var ChainList = artifacts.require("./ChainList.sol");
var LandTitle = artifacts.require("./LandTitle.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(ChainList);
  deployer.deploy(LandTitle);
};
