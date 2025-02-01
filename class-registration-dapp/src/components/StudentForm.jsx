// src/components/StudentForm.jsx
import { useState, useEffect } from 'react';

const StudentForm = ({ contract, loading, students }) => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    // Update student count whenever students array changes
    setStudentCount(students.length);
  }, [students]);

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

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>
          Student Registration Form
        </h2>
        <div style={{
          color: '#666',
          fontSize: '14px'
        }}>
          Total Registered Students: {studentCount}
        </div>
      </div>

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

export default StudentForm;