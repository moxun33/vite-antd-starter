import { useEffect, useRef, useState } from 'react';
import LoginForm from './LoginForm';
import React from 'react';
/**
 * Created by xun on  2021/8/23 16:24.
 * description: index
 */
const AuthIndex = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={'auth-page'}>
      <LoginForm />
    </div>
  );
};
export default AuthIndex;
