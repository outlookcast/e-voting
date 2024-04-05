// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract EVoting {

    address public owner;
    uint public candidatesNumber;
    Candidate[] public candidates;
    mapping(address => Voter) public voters;
    uint public votingStatus;

    struct Candidate {
        string name;
        string profilePhoto;
        uint voteCount;
    }

    struct Voter {
        bool voted;
        uint vote;
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Sender not authorized."
        );

        _;
    }

    modifier votingNotStarted {
        require(
            votingStatus == 0,
            "Voting status needs to be 'NOT_STARTED'"
        );

        _;
    }

    modifier votingStarted {
        require(
            votingStatus == 1,
            "Voting status needs to be 'STARTED'"
        );

        _;
    }

    modifier notVotedYet {
        require (
            voters[msg.sender].voted == false,
            "Pessoa ja realizou voto"
        );

        _;
    }

    constructor() {
        owner = msg.sender;
        votingStatus = 0;
    }

    function addCandidate(
        string memory name,
        string memory profilePhoto
    ) onlyOwner votingNotStarted public {
        candidates.push(
            Candidate({
                name: name,
                profilePhoto: profilePhoto,
                voteCount: 0
            })
        );

        candidatesNumber = candidatesNumber + 1;
    }

    function getCandidateList() public view returns(Candidate[] memory) {
        return candidates;
    }

    function startVoting() onlyOwner votingNotStarted public {
        votingStatus = 1;
    }

    function getVotingStatus() public view returns(string memory) {
        if(votingStatus == 0) {
            return "NOT_STARTED";
        }
        else if(votingStatus == 1) {
            return "STARTED";
        }
        else {
            return "FINISHED";
        }
    }

    function vote(uint _vote) notVotedYet votingStarted public {
        require(
            _vote >= 0 && _vote < candidatesNumber,
            "Candidato invalido"
        );

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _vote;
        candidates[_vote].voteCount = candidates[_vote].voteCount + 1;
    }
}