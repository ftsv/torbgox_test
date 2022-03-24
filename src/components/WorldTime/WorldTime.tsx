import React, { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { watchesSlice } from '../../store/reducers/watchesSlice';
import Watches from '../Watches/Watches';

const WorldTime = () => {
  const { date, local, clocks } = useAppSelector((state) => state.watchesReducer);
  const { watchesTimer, addClocks, changeClocks } =  watchesSlice.actions;
  const dispatch = useAppDispatch();

  const array = [
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
  }]

  useEffect(() => {
    const interval = setInterval(() => (
      dispatch(watchesTimer())
    ), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  console.log(clocks);
  }, [clocks])
  return (
    <div style={{ display: 'flex'}}>
      <div>
        <button
          onClick={() => dispatch(addClocks({timezone: local, name: ''}))}
          disabled={clocks.length < 24 ? false: true}
        > + 
        </button>
      </div>
      {clocks.map((item, i) => <>
        <Watches key={item.name} date={date} timezone={item.timezone} local={local} />
        <select 
          name="" 
          id="" 
          defaultValue={clocks[i].timezone}
        >
          {array.map((option, key) => 
          <option
            key={option.name}
            value={option.timezone}
            onChange={() => dispatch(changeClocks({timezone: option.timezone, name: option.name, index: i}))}
          >
            {option.name} {option.timezone}
          </option>)}
        </select>
      </>)}
    </div>
  )
}

export default WorldTime;