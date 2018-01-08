pragma solidity ^0.4.11;

contract LandTitle {

    // Custom Types
    struct Land {
      uint id;
      address owner;
      string name;
      string city;
      string rights;
      string restrictions;
      string responsibilities;
    }

    // State variables
    mapping(uint => Land) public landList;
    uint landListCounter;

    // Events
    event registerLandEvent (
      uint indexed _id,
      address indexed _landOwner,
      string _ownerName,
      string _city
    );

    // register land
    function registerLand(string _name, string _city, string _rights, string _restrictions, string _responsibilities) public {

        // store the Land title
        landList[landListCounter] = Land(landListCounter, msg.sender, _name, _city, _rights, _restrictions, _responsibilities);
        landListCounter++;

        // trigger the event
        registerLandEvent(landListCounter, msg.sender, _name, _city);
    }

    //fetch the number of Land registered in the contract
    function getNumberOfLandRegistered() public constant returns (uint) {
      return landListCounter;
    }

    // fetch and returns all land IDs getNumberOfLandRegistered
    function getRegisteredLandList() public constant returns (uint[]) {
      // we check whether there is at least one registered Land
      require(landListCounter > 0);

      if (landListCounter  == 0) {
        return new uint[](0);
      }

      //prepare output arrays
      uint[] memory registeredLandList = new uint[] (landListCounter);
      for (uint i = 0; i < landListCounter; i++) {
        registeredLandList[i] = landList[i].id;
      }

      return (registeredLandList);
    }
}
