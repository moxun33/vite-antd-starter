import zh_CN from 'antd/es/locale-provider/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import { ConfigProvider } from 'antd';
import resso from 'resso';

import App from './App';

//import { MxLoading } from './comps/Loading';

//Spin.setDefaultIndicator(<MxLoading />);

//const root = ReactDOM.createRoot(document.getElementById('root')!);
ReactDOM.render(
  <>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>
  </>,
  document.getElementById('root')
);
resso.config({ batch: ReactDOM.unstable_batchedUpdates });
