// src/components/AdminDashboard.jsx
import { useState } from 'react';

const AdminDashboard = ({ contract, account, loading, students }) => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');

  const handleRegister = async () => {
    try {
      if (!contract || loading) return;
      
      const tx = await contract.registerStudent(
        studentId,
        studentName
      );
      
      // Wait for transaction confirmation
      await tx.wait();
      
      // Clear form
      setStudentId('');
      setStudentName('');
      
      alert('Student registered successfully!');
    } catch (error) {
      alert('Error registering student: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Admin Dashboard
      </h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
        />
        
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
        />
        
        <button
          onClick={handleRegister}
          style={{
            padding: '12px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
        >
          Register Student
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;