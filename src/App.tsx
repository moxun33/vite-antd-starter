import store from '@/stores/app-store';
import { useSnapshot } from 'valtio';
import { Spin } from 'antd';
import React from 'react';
import Main from './pages/index';
import { Alert } from 'antd';

import { BrowserRouter } from 'react-router-dom';
function App() {
  const snap = useSnapshot(store);

  return (
    <div className="App">
      <Alert.ErrorBoundary>
        <BrowserRouter>
          <Spin
            spinning={snap.loading}
            tip={'正在处理请求，请耐心等候。'}
            style={{ zIndex: 99999, maxHeight: '100vh' }}>
            <Main />
          </Spin>
        </BrowserRouter>
      </Alert.ErrorBoundary>
    </div>
  );
}

export default App;
