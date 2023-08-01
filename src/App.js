// App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import ManagerExpenseTable from './components/ManagerExpenseTable/ManagerExpenseTable';
import Hero from './components/Hero/Hero';
import styles from './App.css';


import { CSVLink } from 'react-csv'; 
function App() {
  const [data, setData] = useState(null);
  const [csvData, setCsvData] = useState([]);

  return (
    <div className="App">

      <Hero/>
      <FileUpload setData={setData} setCsvData={setCsvData} />
      {csvData.length > 0 && (
        <CSVLink
          data={csvData}
          filename={"manager_expenses.csv"}
          className="downloadLink"
          target="_blank"
        >
          Download CSV
        </CSVLink>
      )}
      <ManagerExpenseTable data={data} />
      
    </div>
  );
}

export default App;
