import { EventCenter, EVENTS_TYPE } from './consts/events';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Main from './pages/index';
import { Alert } from 'antd';

import { BrowserRouter } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    EventCenter.on(EVENTS_TYPE.GLOBAL_SPINNING, (show: boolean) => {
      // console.log(show, 'show global spinning');
      setLoading(show || false);
    });
    return () => {
      EventCenter.off(EVENTS_TYPE.GLOBAL_SPINNING, () => 0);
    };
  }, []);

  return (
    <div className="App">
      <Alert.ErrorBoundary>
        <BrowserRouter>
          <Spin
            spinning={loading}
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
