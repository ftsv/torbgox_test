import React from 'react';
import styles from './FetchingMessage.module.css';

interface FetchingMessageProps {
  messageType: 'error' | 'loading';
}

const FetchingMessage: React.FC<FetchingMessageProps> = (props) => {
  const { messageType, children } = props;

  return (
    <div className={styles.container}>
        <div className={styles['container-message']}>
          <div className={styles[`${messageType}`]}>
            <p >
              {children}
            </p>
          </div>
        </div>
      </div>
  );
}

export default FetchingMessage;