import React, { useEffect, useRef } from 'react';
import IDate from '../../../models/IDate';

import cn from 'classnames';
import styles from './Dial.module.css';
import { TimeProps } from '../Watches';


const Dial: React.FC<TimeProps> = (props)=> {
  const {
    hours,
    minutes,
    seconds,
  } = props;
  const arrowSecond = useRef<HTMLDivElement>(null);
  const arrowMinute = useRef<HTMLDivElement>(null);
  const arrowHour = useRef<HTMLDivElement>(null);

  const setTime = (): void => {
    const secondsDeg = ((seconds / 60) * 360) + 90;
    arrowSecond.current!.style.transform = `rotate(${secondsDeg}deg)`;

    const minutesDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    arrowMinute.current!.style.transform = `rotate(${minutesDeg}deg)`;

    const hoursDeg = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    arrowHour.current!.style.transform = `rotate(${hoursDeg}deg)`;
  }

  useEffect(() => {
    setTime();
  }, [props]);

  return (
    <div className={styles.dial}>
      <div className={styles['dial-outer-face']}>
        <div className={cn(styles.mark, styles['mark-one'])}></div>
        <div className={cn(styles.mark, styles['mark-two'])}></div>
        <div className={cn(styles.mark, styles['mark-four'])}></div>
        <div className={cn(styles.mark, styles['mark-five'])}></div>
        <div className={styles['dial-inner-face']}>
          <div 
            className={cn(styles.arrow, styles['arrow-hour'])}
            ref={arrowHour}
          >
          </div>
          <div 
            className={cn(styles.arrow, styles['arrow-minute'])}
            ref={arrowMinute}
          >
          </div>
          <div 
            className={cn(styles.arrow, styles['arrow-second'])}
              ref={arrowSecond}
          >
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dial;