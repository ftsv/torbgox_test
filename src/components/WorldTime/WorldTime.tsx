import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { timezoneApi } from '../../services/timezoneService';
import { watchesSlice } from '../../store/reducers/watchesSlice';
import FetchingMessage from '../FetchingMessage/FetchingMessage';
import Watches from '../Watches/Watches';

import styles from './WorldTime.module.css'

const WorldTime = () => {
  const dispatch = useAppDispatch();
  const { date, local, clocks } = useAppSelector((state) => state.watchesReducer);
  const { watchesTimer, addClocks, changeClocks } =  watchesSlice.actions;
  const { data: timezones, isFetching, isError } = timezoneApi.useFetchTimezonesQuery('');

  const changeClockTimezone = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value, selectedOptions } = e.target;
    dispatch(
      changeClocks({
        timezone: value,
        name: selectedOptions[0].text,
        index
      })
    );
  };

  useEffect(() => {
    timezones?.length && dispatch(addClocks(timezones[0]));
    timezones?.length && dispatch(addClocks(timezones[0]));
    const interval = setInterval(() => (
      dispatch(watchesTimer())
    ), 1000);
    return () => clearInterval(interval);
  }, [timezones]);

    if (isError) {
    return (
      <FetchingMessage messageType='error'>
        Ошибка при загрузке данных
      </FetchingMessage>
    );
  }

  if (isFetching) {
    return (
      <FetchingMessage messageType='loading'>
        Загрузка данных
      </FetchingMessage>
    );
  }

  return (
    <div className={styles.container}>
      {clocks.map((item, i) => <div>
        <Watches
          key={item.id}
          date={date}
          timezone={item.timezone}
          local={local} 
        />
        <div className={styles['dropdown-container']}>
          <select

            defaultValue={clocks[i].timezone}
            onChange={(e) => changeClockTimezone(e, i)}
          >
            {timezones && timezones.map((o) => 
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
          onClick={() => timezones?.length && dispatch(addClocks(timezones[0]))}
          disabled={(clocks.length < 25) ? false: true}
        > + 
        </button>
      </div>
    </div>
  )
}

export default WorldTime;