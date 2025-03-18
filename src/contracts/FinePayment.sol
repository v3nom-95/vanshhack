// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FinePayment is Ownable, ReentrancyGuard {
    struct Fine {
        uint256 amount;
        string reason;
        uint256 dueDate;
        uint256 appealDeadline;
        string regulationCode;
        string category;
        bool isPaid;
        address payer;
        uint256 paymentDate;
    }

    mapping(string => Fine) public fines;
    string[] public fineIds;
    IERC20 public paymentToken;

    event FineCreated(
        string indexed fineId,
        uint256 amount,
        string reason,
        uint256 dueDate,
        uint256 appealDeadline,
        string regulationCode,
        string category
    );

    event FinePaid(
        string indexed fineId,
        address indexed payer,
        uint256 amount,
        uint256 paymentDate
    );

    event FineAppealed(
        string indexed fineId,
        address indexed appellant,
        string reason
    );

    constructor(address _paymentToken) {
        paymentToken = IERC20(_paymentToken);
    }

    function createFine(
        string memory _fineId,
        uint256 _amount,
        string memory _reason,
        uint256 _dueDate,
        uint256 _appealDeadline,
        string memory _regulationCode,
        string memory _category
    ) external onlyOwner {
        require(_amount > 0, "Amount must be greater than 0");
        require(_dueDate > block.timestamp, "Due date must be in the future");
        require(_appealDeadline > block.timestamp && _appealDeadline < _dueDate, "Invalid appeal deadline");

        fines[_fineId] = Fine({
            amount: _amount,
            reason: _reason,
            dueDate: _dueDate,
            appealDeadline: _appealDeadline,
            regulationCode: _regulationCode,
            category: _category,
            isPaid: false,
            payer: address(0),
            paymentDate: 0
        });

        fineIds.push(_fineId);

        emit FineCreated(
            _fineId,
            _amount,
            _reason,
            _dueDate,
            _appealDeadline,
            _regulationCode,
            _category
        );
    }

    function payFine(string memory _fineId) external nonReentrant {
        Fine storage fine = fines[_fineId];
        require(!fine.isPaid, "Fine already paid");
        require(block.timestamp <= fine.dueDate, "Fine is overdue");
        require(
            paymentToken.transferFrom(msg.sender, address(this), fine.amount),
            "Payment transfer failed"
        );

        fine.isPaid = true;
        fine.payer = msg.sender;
        fine.paymentDate = block.timestamp;

        emit FinePaid(_fineId, msg.sender, fine.amount, block.timestamp);
    }

    function appealFine(string memory _fineId, string memory _reason) external {
        Fine storage fine = fines[_fineId];
        require(!fine.isPaid, "Cannot appeal paid fine");
        require(block.timestamp <= fine.appealDeadline, "Appeal deadline passed");

        emit FineAppealed(_fineId, msg.sender, _reason);
    }

    function getFine(string memory _fineId) external view returns (Fine memory) {
        return fines[_fineId];
    }

    function getAllFines() external view returns (string[] memory) {
        return fineIds;
    }

    function withdrawFunds() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No funds to withdraw");
        require(
            paymentToken.transfer(owner(), balance),
            "Withdrawal transfer failed"
        );
    }
} 