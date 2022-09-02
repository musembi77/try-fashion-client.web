import React from 'react';
import styles from '../styles/Home.module.css'

export default function Loading(){
    return(
        <div styles={{height: '', width:'',backgroundColor:'blue',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className={styles.loading}>
                <div className={styles.div}></div>
                <div className={styles.div}></div>
                <div className={styles.div}></div>
            </div>
        </div>
    )
}