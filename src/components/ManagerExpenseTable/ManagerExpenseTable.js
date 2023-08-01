// ManagerExpenseTable.js
import React from 'react';
import styles from './managerexpensetable.module.css';

const ManagerExpenseTable = ({ data }) => (
  data && Object.entries(data.all_results).map(([year, managers]) => (
    <div key={year} className={styles.tableContainer}>
      <h2 className={styles.yearHeader}>{year}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Manager</th>
            <th>Jan</th>
            <th>Feb</th>
            <th>Mar</th>
            <th>Apr</th>
            <th>May</th>
            <th>Jun</th>
            <th>Jul</th>
            <th>Aug</th>
            <th>Sep</th>
            <th>Oct</th>
            <th>Nov</th>
            <th>Dec</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(managers).map(([manager, expenses]) => (
            <tr key={manager}>
              <td>{manager}</td>
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(month => (
                <td key={month}>{expenses[month] || '-'}</td>
              ))}
              <td>{data.total_results[year][manager]}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>



  ))
);

export default ManagerExpenseTable;
