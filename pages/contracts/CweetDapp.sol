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

    mapping(uint256 => Cwett) public cwetts;
    mapping(address => UserProfile) public users;
    mapping(uint256 => mapping(address => Like)) public cwettLikes;

    uint256 public CwettCount;

    mapping(uint256 => Comment[]) public commentsByCwettId;

    struct UserProfile {
        address userAddress;
        address[] following;
        uint256[] cwetts;
    }

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

    constructor() {}

    function createCwett(string memory _cwettText) public {
        require(bytes(_cwettText).length > 0, "Cwett text cannot be empty");

        cwetts[CwettCount] = Cwett({
            timestamp: block.timestamp,
            cwettText: _cwettText,
            userAddress: msg.sender,
            likes: 0,
            commentsCount: 0
        });

        UserProfile storage user = users[msg.sender];
        user.userAddress = msg.sender;
        user.cwetts.push(CwettCount);

        emit NewCwett(CwettCount, msg.sender, _cwettText);
        CwettCount++;
    }

    function addComment(uint256 _CwettId, string memory _commentText) public {
        require(_CwettId < CwettCount, "Cwett does not exist");
        require(bytes(_commentText).length > 0, "Comment text cannot be empty");

        Comment memory comment = Comment({
            commenter: msg.sender,
            commentText: _commentText,
            timestamp: block.timestamp
        });

        commentsByCwettId[_CwettId].push(comment);
        cwetts[_CwettId].commentsCount++;

        emit CommentedCwett(_CwettId, msg.sender, _commentText);
    }

    function getCommentsForCwett(uint256 _CwettId)
        public
        view
        returns (Comment[] memory)
    {
        require(_CwettId < CwettCount, "Cwett does not exist");
        return commentsByCwettId[_CwettId];
    }

    function likeCwett(uint256 _CwettId) public {
        require(_CwettId < CwettCount, "Cwett does not exist");
        require(
            !cwettLikes[_CwettId][msg.sender].hasLiked,
            "You already liked this Cwett"
        );

        cwetts[_CwettId].likes++;
        cwettLikes[_CwettId][msg.sender].hasLiked = true;

        emit LikedCwett(_CwettId, msg.sender);
    }

    function unlikeCwett(uint256 _CwettId) public {
        require(_CwettId < CwettCount, "Cwett does not exist");
        require(
            cwettLikes[_CwettId][msg.sender].hasLiked,
            "You haven't liked this Cwett"
        );

        cwetts[_CwettId].likes--;
        cwettLikes[_CwettId][msg.sender].hasLiked = false;

        emit UnlikedCwett(_CwettId, msg.sender);
    }

    function getUserCwetts(address _user)
        public
        view
        returns (uint256[] memory)
    {
        return users[_user].cwetts;
    }

    function getAllCwetts() public view returns (Cwett[] memory) {
        Cwett[] memory allCwetts = new Cwett[](CwettCount);
        for (uint256 i = 0; i < CwettCount; i++) {
            allCwetts[i] = cwetts[i];
        }
        return allCwetts;
    }

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
