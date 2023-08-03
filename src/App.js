// App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import ManagerExpenseTable from './components/ManagerExpenseTable/ManagerExpenseTable';
import Hero from './components/Hero/Hero';

import { CSVLink } from 'react-csv'; 
function App() {
  const [data, setData] = useState(null);
  const [csvData, setCsvData] = useState([]);

  return (
    <div className="App" style={{ textAlign: "center", marginBottom: "200px"}}>

      <Hero/>
      <FileUpload setData={setData} setCsvData={setCsvData} />
      {csvData.length > 0 && (
        <CSVLink
          data={csvData}
          filename={"manager_expenses.csv"}
          className="downloadLink"
          style={{ 
            background: "#F7F7F8",
            border: "none",
            color: "#4B286D",
            padding: "10px 20px",
            textDecoration: "none",
            textAlign: "center",
            display: "inline-block",
            borderRadius: "5px",
            marginTop: "20px",
            fontSize: "25px",
        }}
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
