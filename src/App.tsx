import React, { useState } from 'react';
import WorldTime from './components/WorldTime/WorldTime';

import './App.css';

function App() {
  const [permission, setPermission] = useState(false);

  if (!permission) {
    return (
      <div className='App'>
        <div className='container-permission'>
          <div className='container-text'>
            <p>
              <strong>
                Для отображения часовых поясов будет выполнена загрузка данных из сети интернет.
              </strong>
            </p>
          </div>
          <div className='container-text'>
            <p>
              Часы добавляются нажатием на "+". Максимальное количество ограничено 24 шт.
            </p>
          </div>
          <div className='container-button'>
            <button
              className='button-permission'
              onClick={() => setPermission(true)}
            >
              Принять
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
        <WorldTime />
    </div>
  );
}

export default App;
