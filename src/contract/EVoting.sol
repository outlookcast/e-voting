// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EVoting {
    struct Candidate {
        string name;
        string profilePhoto;
        uint voteCount;
    }

    struct Voter {
        bool voted;
        uint vote;
    }

    event VoteAdded(address indexed voter, uint candidateIdentifier);
    event CandidateAdded(string name, string profilePhoto);
    event VotingStatusChanged(string status);

    address public owner;
    uint public candidatesNumber;
    Candidate[] public candidates;
    mapping(address => Voter) public voters;
    uint public votingStatus;

    modifier onlyOwner() {
        require(msg.sender == owner, "Sender not authorized.");
        _;
    }

    modifier votingNotStarted() {
        require(votingStatus == 0, "Voting status needs to be 'NOT_STARTED'");
        _;
    }

    modifier votingStarted() {
        require(votingStatus == 1, "Voting status needs to be 'STARTED'");
        _;
    }

    modifier notVotedYet() {
        require(voters[msg.sender].voted == false, "Pessoa ja realizou voto");
        _;
    }

    constructor() {
        owner = msg.sender;
        votingStatus = 0;

        emit VotingStatusChanged("NOT_STARTED");
    }

    function addCandidate(
        string memory _name,
        string memory _profilePhoto
    ) public onlyOwner votingNotStarted {
        require(
            bytes(_name).length > 0 && bytes(_profilePhoto).length > 0,
            "Name or profile photo cannot be empty."
        );

        candidates.push(
            Candidate({name: _name, profilePhoto: _profilePhoto, voteCount: 0})
        );

        candidatesNumber++;

        emit CandidateAdded(_name, _profilePhoto);
    }

    function getCandidateList() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidateById(
        uint index
    ) public view returns (uint, string memory, string memory, uint) {
        require(index < candidatesNumber, "Candidate does not exist");
        return (
            index,
            candidates[index].name,
            candidates[index].profilePhoto,
            candidates[index].voteCount
        );
    }

    function startVoting() public onlyOwner votingNotStarted {
        votingStatus = 1;

        emit VotingStatusChanged("STARTED");
    }

    function endVoting() public onlyOwner votingStarted {
        votingStatus = 2;

        emit VotingStatusChanged("FINISHED");
    }

    function getVotingStatus() public view returns (string memory) {
        if (votingStatus == 0) {
            return "NOT_STARTED";
        } else if (votingStatus == 1) {
            return "STARTED";
        } else {
            return "FINISHED";
        }
    }

    function vote(uint _vote) public notVotedYet votingStarted {
        require(_vote >= 0 && _vote < candidatesNumber, "Candidato invalido");

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _vote;
        candidates[_vote].voteCount = candidates[_vote].voteCount + 1;

        emit VoteAdded(msg.sender, _vote);
    }

    function reset() public onlyOwner {
        votingStatus = 0;
        emit VotingStatusChanged("NOT_STARTED");
    }
}
