// Contract to be tested
var LandTitle = artifacts.require("../contracts/LandTitle.sol");

// Test suite
contract('LandTitle', function(accounts) {
  var LandTitleInstance;
  var landOwner = accounts[1];
  var ownerName1 = "land owner 1";
  var landDescription1 = "Description for land title 1";
  var landPrice1 = 10;
  var ownerName2 = "land owner 2";
  var landDescription2 = "Description for land title 2";
  var landPrice2 = 20;

  // Test case: check initial values
  it("should be initialized with empty values", function() {
    return LandTitle.deployed().then(function(instance) {
      return instance.getNumberOfLandRegistered();
    }).then(function(data) {
      assert.equal(data, 0x0, "number of registered land must be zero");
    });
  });

  // Test case: register a first land title
  it("should let us register first land title", function() {
    return LandTitle.deployed().then(function(instance) {
      landTitleInstance = instance;
      return landTitleInstance.registerLand(ownerName1, landDescription1, landPrice1, {
        from: landOwner});
    }).then(function(receipt) {
      //check event
      assert.equal(receipt.logs.length, 1, "should have received one event");
      assert.equal(accounts.length, 3, "number of accounts must be three")
      assert.equal(receipt.logs[0].event, "registerLandEvent", "event name should be registerLandEvent");
      assert.equal(receipt.logs[0].args._id.toNumber(), 1, "id must be 1");
      assert.equal(receipt.logs[0].args._landOwner, landOwner, "landOwner must be " + landOwner);
      assert.equal(receipt.logs[0].args._ownerName, ownerName1, "land owner name must be " + ownerName1);
      assert.equal(receipt.logs[0].args._price, landPrice1, "land price must be " + landPrice1);

      return landTitleInstance.getNumberOfLandRegistered();
    }).then(function(data) {
      assert.equal(data, 1, "number of register land must be one");

      return landTitleInstance.getRegisteredLandList();
    })
    .then(function(data) {
      assert.equal(data.length, 1, "there must now be 1 land registered");
      registeredLandId1 = data[0].toNumber();
      assert.equal(registeredLandId1, 0, "registered land id must be 0");

      return landTitleInstance.landList(registeredLandId1);
    })
    .then(function(data) {
      assert.equal(data[0].toNumber(), 0, "registered land id must be 0");
      assert.equal(data[1], landOwner, "land owner must be " + landOwner);
      //assert.equal(data[2], ownerName1, "owner name must be " + ownerName1);
      //assert.equal(data[3], landDescription1, "land description must be " + landDescription1);
      //assert.equal(data[4], landPrice1, "land price must be " + landPrice1);
    });
  });

  // // Test case: register a second land title
  // it("should let us register second land title", function() {
  //   return LandTitle.deployed().then(function(instance) {
  //     landTitleInstance = instance;
  //     return landTitleInstance.registerLand(ownerName2, landDescription2, landPrice2, {
  //       from: landOwner
  //     });
  //   }).then(function(receipt) {
  //     assert.equal(receipt.logs.length, 1, "one event should have been triggered");
  //     assert.equal(receipt.logs[0].event, "registerLandEvent", "event should be registerLandEvent");
  //     assert.equal(receipt.logs[0].args._id.toNumber(), 2, "id must be 2");
  //     assert.equal(receipt.logs[0].args._landOwner, landOwner, "event seller must be " + landOwner);
  //     assert.equal(receipt.logs[0].args._ownerName, ownerName2, "event owner name must be " + ownerName2);
  //     assert.equal(receipt.logs[0].args._price, landPrice2, "event land price must be " + landPrice2);
  //
  //     return landTitleInstance.getNumberOfLandRegistered();
  //   }).then(function(data) {
  //     assert.equal(data, 2, "number of register land must be two");
  //
  //     return landTitleInstance.getRegisteredLandList();
  //   }).then(function(data) {
  //     assert.equal(data.length, 2, "there must now be 2 land registered");
  //     registeredLandId2 = data[0].toNumber();
  //     assert.equal(registeredLandId2, 2, "registered land id must be 2");
  //
  //     return landTitleInstance.landList(registeredLandId2);
  //   }).then(function(data) {
  //     assert.equal(data[0].toNumber(), 2, "registered land id must be 2");
  //     assert.equal(data[1], landOwner, "land owner must be " + landOwner);
  //     assert.equal(data[2], ownerName2, "ownerName2 name must be " + ownerName2);
  //     assert.equal(data[3], landDescription2, "land description must be " + landDescription2);
  //     assert.equal(data[4], landPrice2, "land price must be " + landPrice2);
  //   });
  // });
});
