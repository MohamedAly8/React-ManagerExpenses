// boilerplate react component
import React from 'react';
import styles from './hero.module.css';

const Hero = () => (
    <div className={styles.heroContainer}>
        
        <img src={"Telus-Logo.png"} alt="Telus Logo" className={styles.heroImage} />
        <h1 className={styles.heroTitle}>Annual Expense Report</h1>
        <p className={styles.heroDescription}>Upload your files to generate a report</p>
        <p className={styles.heroReqs}>Required Columns: Vendor Name/Employee/Appl.Name, Doc. Date, ValCOArCur</p>
        
    </div>
);

export default Hero;

