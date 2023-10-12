import {createSnackbarQueue, SnackbarQueue} from '@rmwc/snackbar';
import React, {FC, useEffect} from 'react';

import {useStores} from '../../hooks';
import s from './styles.module.scss';

export const ErrorSnackbar: FC = () => {
  const {errorStore} = useStores();
  const {messages, notify} = createSnackbarQueue();

  useEffect(() => {
    const subscription = errorStore.error$.subscribe(error => {
      notify({
        body: <div className={s.messageBody}>{error}</div>,
        dismissIcon: true,
        timeout: -1,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SnackbarQueue messages={messages} />
  );
};
