import { time } from 'console';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import IDate from '../../models/IDate';
import { watchesSlice } from '../../store/reducers/watchesSlice';
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
        let { hours, minutes, seconds} = props.date;
        hours = hours + Number(props.timezone) - Number(props.local);
        if ( hours > 24) {
          hours -= 24;
        }
        if ( hours < 0) {
          hours += 24;
        }
        setLocalTime(() => ({hours, minutes, seconds}));
  }, [props.date])
  return (
    <div className={styles.container}>
      <div>
      <Dial {...localTime} />
      <Digital {...localTime} />
      </div>
    </div>
  )
}

export default Watches;