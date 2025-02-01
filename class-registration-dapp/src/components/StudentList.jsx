// src/components/StudentList.jsx
import { useState, useEffect } from 'react';

const StudentList = ({ contract, loading }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (!contract || loading) return;

    const fetchStudents = async () => {
      try {
        // Get all StudentRegistered events
        const studentEvents = await contract.filters.StudentRegistered();
        const events = await contract.queryFilter(studentEvents);
        
        // Convert events to student list
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
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [contract, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '20px auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Registered Students
      </h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {students.map(student => (
          <div key={student.id} style={{
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '16px' }}>ID: {student.id}</span>
            <span style={{ fontSize: '16px' }}>{student.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;