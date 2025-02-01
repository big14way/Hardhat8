// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClassRegistration {
    // Admin management
    address private admin;
    
    // Student mapping (studentID -> Student struct)
    mapping(uint256 => Student) private students;
    
    // Event emitted when a student is registered
    event StudentRegistered(uint256 studentID, string name);
    
    // Event emitted when a student is removed
    event StudentRemoved(uint256 studentID);
    
    // Struct to represent a student
    struct Student {
        uint256 studentID;
        string name;
        bool isActive;
    }
    
    // Modifier to restrict access to admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    // Constructor to set initial admin
    constructor() {
        admin = msg.sender;
    }
    
    // Register a new student
    function registerStudent(uint256 _studentID, string memory _name) 
        public 
        onlyAdmin 
    {
        require(!students[_studentID].isActive, "Student ID already exists");
        
        students[_studentID] = Student({
            studentID: _studentID,
            name: _name,
            isActive: true
        });
        
        emit StudentRegistered(_studentID, _name);
    }
    
    // Remove a student
    function removeStudent(uint256 _studentID) 
        public 
        onlyAdmin 
    {
        require(students[_studentID].isActive, "Student ID does not exist");
        
        students[_studentID].isActive = false;
        emit StudentRemoved(_studentID);
    }
    
    // Get student details by ID
    function getStudentById(uint256 _studentID) 
        public 
        view 
        returns (uint256, string memory, bool) 
    {
        return (
            students[_studentID].studentID,
            students[_studentID].name,
            students[_studentID].isActive
        );
    }
}