// src/App.jsx
import ContractConnector from './components/ContractConnector';
import StudentForm from './components/StudentForm';

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <ContractConnector>
        {({ contract, account, loading, students }) => (
          <>
            <StudentForm 
              contract={contract} 
              loading={loading}
              students={students}
            />
          </>
        )}
      </ContractConnector>
    </div>
  );
};

export default App;