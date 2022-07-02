import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div id={'notfound-page'} style={{ padding: 30, background: 'white' }}>
      <div style={{ textAlign: 'center', marginTop: 50, marginBottom: 10 }}>
        <img src={'/assets/common/404.gif'} />
        <h2 style={{}}>页面不存在</h2>
        <div style={{ textAlign: 'center' }}>
          <Link to={'/'}>
            <Button
              className={'bs-primary-btn'}
              style={{ width: 180, height: 40, marginRight: 10 }}
              type="primary">
              <span>返回首页</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
