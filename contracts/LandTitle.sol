pragma solidity ^0.4.11;

contract LandTitle {
    // State variables
    address seller;
    string name;
    string description;
    uint256 price;

    // register land
    function registerLand(string _name, string _description, uint256 _price) public {
        seller = msg.sender;
        name = _name;
        description = _description;
        price = _price;
    }

    // get the land info
    function getLand() public constant returns (
        address _seller,
        string _name,
        string _description,
        uint256 _price) {
        return(seller, name, description, price);
    }
}
