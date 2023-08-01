// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from './fileupload.module.css';

const FileUpload = ({ setData, setCsvData }) => {
  const [files, setFiles] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(""); 

  const submitFiles = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    axios
      .post("https://fastapi-manager-expenses-4c9f96c04be4.herokuapp.com/uploadfiles2", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setData(response.data);
        // Prepare data for CSV
        const csvData = response.data ? Object.entries(response.data.all_results).flatMap(([year, managers]) => {
          return Object.entries(managers).map(([manager, expenses]) => {
            return {
              year,
              manager,
              ...expenses,
              total: response.data.total_results[year][manager]
            };
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
