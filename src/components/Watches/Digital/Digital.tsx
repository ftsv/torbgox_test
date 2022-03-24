import React from 'react';
import IDate from '../../../models/IDate';
import { TimeProps } from '../Watches';

import styles from './Digital.module.css';

const Digital: React.FC<TimeProps> = (props) => {
  const {
    hours,
    minutes,
    seconds,
  } = props;
  const addZeroToElement = (num: number): (number | string) => {
    return (num < 10) ? `0${num}` : num ;
  }

  return (
    <div className={styles.digital}>
      <div className={styles.hours}>
        {addZeroToElement(hours)}
      </div>
      <div className={styles.minutes}>
        {addZeroToElement(minutes)}
      </div>
      <div className={styles.seconds}>
        {addZeroToElement(seconds)}
      </div>
    </div>
  )
}

export default Digital;