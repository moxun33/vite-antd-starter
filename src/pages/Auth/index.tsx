import { useEffect, useRef, useState } from 'react';
import LoginForm from './LoginForm';
import React from 'react';
import { useSnapshot } from 'valtio';
import { useHistory } from 'react-router-dom';
import store from '@/stores/app-store';

/**
 * Created by xun on  2021/8/23 16:24.
 * description: index
 */
const AuthIndex = () => {
  const [loading, setLoading] = useState(false);
  const snap = useSnapshot(store);
  const history = useHistory();

  useEffect(() => {
    if (snap.authed) {
      history.replace('/');
    }
  }, []);

  return (
    <div className={'auth-page'}>
      <LoginForm />
    </div>
  );
};
export default AuthIndex;
