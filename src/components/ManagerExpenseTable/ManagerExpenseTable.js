// ManagerExpenseTable.js
import React from 'react';
import styles from './managerexpensetable.module.css';

// Create a NumberFormat object for US locale with minimum 2 decimal places
const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const ManagerExpenseTable = ({ data }) => (
  data && Object.entries(data).map(([year, expenses]) => (
    ['employee_expenses', 'vendor_expenses'].map(type => {
      // Compute the yearly total for each month
      const yearlyTotals = Array.from({length: 12}, (_, i) => i + 1)
        .reduce((totals, month) => {
          totals[month] = Object.values(expenses[type]).reduce((total, monthlyExpenses) => total + Number(monthlyExpenses[month] || 0), 0);
          return totals;
        }, {});

      yearlyTotals['Total'] = Object.values(yearlyTotals).reduce((total, value) => total + value, 0);

      return (
        <div key={`${year}-${type}`} className={styles.tableContainer}>
          <h2 className={styles.yearHeader}>{`${year} - ${type.replace('_', ' ')}`}</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* if type is employee expenses th is employee else vendor */}
                <th>{type === 'employee_expenses' ? 'Employee' : 'Vendor'}</th>
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
              {Object.entries(expenses[type]).map(([name, monthlyExpenses]) => (
                <tr key={name}>
                  <td>{name}</td>
                  {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                    <td key={month}>{monthlyExpenses[month] !== '0.00' ? numberFormat.format(Number(monthlyExpenses[month])) : '-'}</td>
                  ))}
                  <td>{monthlyExpenses['Total'] !== '0.00' ? numberFormat.format(Number(monthlyExpenses['Total'])) : '-'}</td>
                </tr>
              ))}
              <tr className={styles.totalsRow}>
                <td>Totals</td>
                {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                  <td className={styles.totals} key={month}>{numberFormat.format(yearlyTotals[month]) !== '0.00' ? numberFormat.format(yearlyTotals[month]) : '-'}</td>
                ))}
                <td>{numberFormat.format(yearlyTotals['Total'])}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    })
  ))
);

export default ManagerExpenseTable;
