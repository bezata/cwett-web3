// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract CwettDapp {
    struct Cwett {
        uint256 timestamp;
        string cwettText;
        address userAddress;
        uint256 likes;
        uint256 commentsCount;
    }

    struct Comment {
        address commenter;
        string commentText;
        uint256 timestamp;
    }

    struct Like {
        address user;
        bool hasLiked;
    }

    // Mapping to store Cwetts by their unique IDs
    mapping(uint256 => Cwett) public cwetts;

    // Mapping to store user profiles by their Ethereum addresses
    mapping(address => UserProfile) public users;

    // Mapping to track likes for each Cwett by Cwett ID and user address
    mapping(uint256 => mapping(address => Like)) public cwettLikes;

    // Counter to keep track of the total number of Cwetts
    uint256 public CwettCount;

    // Mapping to store comments for each Cwett by Cwett ID
    mapping(uint256 => Comment[]) public commentsByCwettId;

    // Struct to represent user profiles
    struct UserProfile {
        address userAddress;
        address[] following;
        uint256[] cwetts;
    }

    // Events to log important contract actions
    event NewCwett(
        uint256 CwettId,
        address indexed userAddress,
        string cwettText
    );
    event LikedCwett(uint256 CwettId, address indexed userAddress);
    event UnlikedCwett(uint256 CwettId, address indexed userAddress);
    event CommentedCwett(
        uint256 CwettId,
        address indexed commenter,
        string commentText
    );

    // Constructor for the contract (empty in this case)
    constructor() {}

    // Function to create a new Cwett
    function createCwett(string memory _cwettText) public {
        // Require that the Cwett text is not empty
        require(bytes(_cwettText).length > 0, "Cwett text cannot be empty");

        // Create a new Cwett and add it to the mapping
        cwetts[CwettCount] = Cwett({
            timestamp: block.timestamp,
            cwettText: _cwettText,
            userAddress: msg.sender,
            likes: 0,
            commentsCount: 0
        });

        // Update the user's profile with the new Cwett
        UserProfile storage user = users[msg.sender];
        user.userAddress = msg.sender;
        user.cwetts.push(CwettCount);

        // Emit an event to log the creation of the new Cwett
        emit NewCwett(CwettCount, msg.sender, _cwettText);
        CwettCount++;
    }

    // Function to add a comment to a Cwett
    function addComment(uint256 _CwettId, string memory _commentText) public {
        // Require that the Cwett ID exists and the comment text is not empty
        require(_CwettId < CwettCount, "Cwett does not exist");
        require(bytes(_commentText).length > 0, "Comment text cannot be empty");

        // Create a new comment and add it to the Cwett's comments
        Comment memory comment = Comment({
            commenter: msg.sender,
            commentText: _commentText,
            timestamp: block.timestamp
        });

        commentsByCwettId[_CwettId].push(comment);
        cwetts[_CwettId].commentsCount++;

        // Emit an event to log the comment addition
        emit CommentedCwett(_CwettId, msg.sender, _commentText);
    }

    // Function to retrieve comments for a specific Cwett
    function getCommentsForCwett(uint256 _CwettId)
        public
        view
        returns (Comment[] memory)
    {
        require(_CwettId < CwettCount, "Cwett does not exist");
        return commentsByCwettId[_CwettId];
    }

    // Function to like a Cwett
    function likeCwett(uint256 _CwettId) public {
        require(_CwettId < CwettCount, "Cwett does not exist");
        require(
            !cwettLikes[_CwettId][msg.sender].hasLiked,
            "You already liked this Cwett"
        );

        // Increase the like count and mark the user as having liked the Cwett
        cwetts[_CwettId].likes++;
        cwettLikes[_CwettId][msg.sender].hasLiked = true;

        // Emit an event to log the Cwett like
        emit LikedCwett(_CwettId, msg.sender);
    }

    // Function to unlike a Cwett
    function unlikeCwett(uint256 _CwettId) public {
        require(_CwettId < CwettCount, "Cwett does not exist");
        require(
            cwettLikes[_CwettId][msg.sender].hasLiked,
            "You haven't liked this Cwett"
        );

        // Decrease the like count and mark the user as having unliked the Cwett
        cwetts[_CwettId].likes--;
        cwettLikes[_CwettId][msg.sender].hasLiked = false;

        // Emit an event to log the Cwett unlike
        emit UnlikedCwett(_CwettId, msg.sender);
    }

    // Function to get all Cwetts created by a specific user
    function getUserCwetts(address _user)
        public
        view
        returns (uint256[] memory)
    {
        return users[_user].cwetts;
    }

    // Function to get details of all Cwetts
    function getAllCwetts() public view returns (Cwett[] memory) {
        Cwett[] memory allCwetts = new Cwett[](CwettCount);
        for (uint256 i = 0; i < CwettCount; i++) {
            allCwetts[i] = cwetts[i];
        }
        return allCwetts;
    }

    // Function to get details of all Cwetts created by a specific user
    function getCwettsDetailsByUser(address _user)
        public
        view
        returns (Cwett[] memory)
    {
        UserProfile storage user = users[_user];
        uint256[] memory userCwetts = user.cwetts;
        uint256 numCwetts = userCwetts.length;

        Cwett[] memory details = new Cwett[](numCwetts);

        for (uint256 i = 0; i < numCwetts; i++) {
            uint256 cwettId = userCwetts[i];
            Cwett storage cwett = cwetts[cwettId];
            details[i] = Cwett({
                timestamp: cwett.timestamp,
                cwettText: cwett.cwettText,
                userAddress: cwett.userAddress,
                likes: cwett.likes,
                commentsCount: cwett.commentsCount
            });
        }

        return details;
    }
}
