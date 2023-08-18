// ManagerExpenseTable.js
import React from 'react';
import styles from './managerexpensetable.module.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';


// Create a NumberFormat object for US locale with minimum 2 decimal places
const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const colorPalette = [
  '#FF6B6B',  // Reddish
  '#4ECDC4',  // Teal
  '#FFD166',  // Yellowish
  '#26547C',  // Dark Blue
  '#06D6A0',  // Light Green
  '#FF9F1C',  // Orange
  '#5E548E',  // Purple
  '#FA7921',  // Tangerine
  '#D7263D',  // Brick Red
  '#007F5F',  // Deep Turquoise
  '#F64740',  // Coral
  '#3A506B',  // Blue Gray
  '#1B998B',  // Jade
  '#2E294E',  // Dark Purple
  '#F46036',  // Vermilion
  '#2CDA9D',  // Mint
  '#6B4226',  // Sienna
  '#FFC857'   // Goldenrod
];





const generateChartData = (expenses) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month, index) => {
      const monthData = { month };
      Object.entries(expenses).forEach(([name, monthlyExpenses]) => {
          const value = parseFloat(monthlyExpenses[index + 1]) || 0;
          if (value !== 0) {
              monthData[name] = value;
          }
      });
      return monthData;
  });
};


const ManagerExpenseTable = ({ data }) => (
  data && Object.entries(data).map(([year, expenses]) => (
    ['employee_expenses', 'vendor_expenses'].map(type => {

      const yearlyTotals = Array.from({length: 12}, (_, i) => i + 1)
        .reduce((totals, month) => {
          totals[month] = Object.values(expenses[type]).reduce((total, monthlyExpenses) => total + Number(monthlyExpenses[month] || 0), 0);
          return totals;
        }, {});

      yearlyTotals['Total'] = Object.values(yearlyTotals).reduce((total, value) => total + value, 0);

      return (
        <div key={`${year}-${type}`} className={styles.tableContainer}>
          <h2 className={styles.yearHeader}>{`${year} - ${type.replace('_', ' ')}`}</h2>


          <div className={styles.chartContainer}>
          <BarChart width={window.innerWidth * 0.8} height={500} data={generateChartData(expenses[type])}>
    <CartesianGrid strokeDasharray="2 5" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    {Object.keys(expenses[type]).filter(name => {
        return generateChartData(expenses[type]).some(data => data[name] !== undefined);
    }).map((name, index) => (
        <Bar key={name} dataKey={name} fill={colorPalette[index % colorPalette.length]} barSize={8}/>
    ))}
</BarChart>

          </div>
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
                    // if monthlyExpenses[month] is not 0.00 or not a number display '-' else display the number
                    <td key={month}>{monthlyExpenses[month] && monthlyExpenses[month] !== '0.00'  ? numberFormat.format(Number(monthlyExpenses[month])) : '-'}</td>
        
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
