// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './fileupload.module.css';

const FileUpload = ({ setData, setCsvData }) => {
  const [uploadMessage, setUploadMessage] = useState(""); 
  const [files, setFiles] = useState([]);

  const submitFiles = (event) => {
    event.preventDefault();

    const formData = new FormData();
  
    formData.append('file', files[0]);
  

    axios
      .post("http://localhost:8000/uploadfiles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        // Prepare data for CSV
        const csvData = response.data ? Object.entries(response.data).flatMap(([year, expenses]) => {
          return ['employee_expenses', 'vendor_expenses'].flatMap(type => {
            return Object.entries(expenses[type]).map(([name, monthlyExpenses]) => {
              return {
                year,
                type,
                name,
                ...monthlyExpenses
              };
            });
          });
        }) : [];
        setCsvData(csvData);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitFiles} className={styles.fileuploadContainer}>
        <input
          id="file-upload"  
          type="file"
          multiple
          onChange={(event) => {
            setFiles(event.target.files);
            // Set upload message when new files are selected
            const fileNames = Array.from(event.target.files).map(file => file.name).join(", ");
            setUploadMessage(`Selected ${event.target.files.length} file(s): ${fileNames}`);
          }}
          className={styles.fileuploadInput}
        />

        
        <div className={styles.buttonsContainer}>
          <label htmlFor="file-upload" className={styles.fileuploadLabel}>
            Choose Files
          </label>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </div>
      </form>

      {uploadMessage && 
        <p className={styles.uploadMessage}>{uploadMessage}</p>
      }
    </div>
  );
};

export default FileUpload;
