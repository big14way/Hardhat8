// src/components/ContractConnector.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ContractConnector = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (typeof window === 'undefined') return;

      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          });
          
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          
          const currentAccount = accounts[0];
          setAccount(currentAccount);
          
          const contractInstance = new ethers.Contract(
            '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            // Your contract ABI here
            [
                
                    {
                      "inputs": [],
                      "stateMutability": "nonpayable",
                      "type": "constructor"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "studentID",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "string",
                          "name": "name",
                          "type": "string"
                        }
                      ],
                      "name": "StudentRegistered",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "studentID",
                          "type": "uint256"
                        }
                      ],
                      "name": "StudentRemoved",
                      "type": "event"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_studentID",
                          "type": "uint256"
                        }
                      ],
                      "name": "getStudentById",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        },
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_studentID",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "_name",
                          "type": "string"
                        }
                      ],
                      "name": "registerStudent",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_studentID",
                          "type": "uint256"
                        }
                      ],
                      "name": "removeStudent",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    }
                
              // ... rest of your ABI
            ],
            signer
          );
          
          setContract(contractInstance);
          
          // Set up event listener for new student registrations
          contractInstance.on('StudentRegistered', (studentId, name) => {
            setStudents(prev => [...prev, {
              id: studentId.toString(),
              name
            }]);
          });
          
          // Fetch existing students
          await fetchExistingStudents(contractInstance);
        } catch (error) {
          console.error('Failed to connect:', error);
        }
      }
      setLoading(false);
    };

    init();
  }, []);

  const fetchExistingStudents = async (contract) => {
    try {
      const studentEvents = await contract.filters.StudentRegistered();
      const events = await contract.queryFilter(studentEvents);
      
      const studentList = await Promise.all(
        events.map(async (event) => {
          const [studentId, name] = event.args;
          return {
            id: studentId.toString(),
            name
          };
        })
      );
      setStudents(studentList);
    } catch (error) {
      console.error('Error fetching existing students:', error);
    }
  };

  return children({ contract, account, loading, students });
};

export default ContractConnector;