import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { watchesSlice } from '../../store/reducers/watchesSlice';
import Watches from '../Watches/Watches';

import styles from './WorldTime.module.css'

const WorldTime = () => {
  const { date, local, clocks } = useAppSelector((state) => state.watchesReducer);
  const { watchesTimer, addClocks, changeClocks } =  watchesSlice.actions;
  const dispatch = useAppDispatch();

  const options = [
  {
    timezone: `${local}`,
    name: 'Местное время'
  },
  {
    timezone: "+2",
    name: "Калиниград"
  },
  {
    timezone: "+3",
    name: "Москва"
  },
  {
    timezone: "+4",
    name: "Самара"
  },
  {
    timezone: "+5",
    name: "Екатеринбург"
  }];

  const changeClockTimezone = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value, selectedOptions } = e.target;
    dispatch(
      changeClocks({
        timezone: value,
        name: selectedOptions[0].text,
        index
      })
    );
  }

  useEffect(() => {
    const interval = setInterval(() => (
      dispatch(watchesTimer())
    ), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {clocks.map((item, i) => <div>
        <Watches
          key={item.name + i + item.timezone}
          date={date}
          timezone={item.timezone}
          local={local} 
        />
        <div className={styles['dropdown-container']}>
          <select

            defaultValue={clocks[i].timezone}
            onChange={(e) => changeClockTimezone(e, i)}
          >
            {options.map((o) => 
            <option
              key={o.name}
              value={o.timezone}
            >
              {o.name}
            </option>)}
          </select>
        </div>
      </div>)}
      <div className={styles['new-watches']}>
        <button
          className={styles['add-clock']}
          onClick={() => dispatch(addClocks({timezone: local, name: ''}))}
          disabled={clocks.length < 24 ? false: true}
        > + 
        </button>
      </div>
    </div>
  )
}

export default WorldTime;