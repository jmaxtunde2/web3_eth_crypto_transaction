// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction {
    uint256 public transactionCounter;

    // event
    event Transfer(address from, address receiver, uint amount, string message, uint256 timeStamp, string keyword);
    // transaction structure

    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timeStamp;
        string keyword;
    }

    // array of struct transfer
    TransferStruct[] transactions;

    // functions
    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCounter +=1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory){
        return transactions;
    }

    function getTransactionCounter() public view returns (uint256){
        return transactionCounter;
    }
}