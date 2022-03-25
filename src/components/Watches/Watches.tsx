import React, { useEffect, useState } from 'react';
import IDate from '../../models/IDate';
import Dial from './Dial/Dial';
import Digital from './Digital/Digital';

import styles from './Watches.module.css';

interface WatchesProps {
  timezone: string;
  local: string
}

export interface TimeProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Watches: React.FC<WatchesProps & IDate> = (props) => {
  const [localTime, setLocalTime] = useState(props.date);

  useEffect(() => {
    let { hours, minutes, seconds } = props.date;
    
    hours = hours + Number(props.timezone) - Number(props.local);
    
    if ( hours > 24) {
      hours -= 24;
    }
    if ( hours < 0) {
      hours += 24;
    }
    setLocalTime(() => ({hours, minutes, seconds}));
  }, [props.date]);

  return (
    <div className={styles.container}>
      <Dial {...localTime} />
      <Digital {...localTime} />
    </div>
  )
}

export default Watches;