/**
 * Created by xun on  2021/12/17 14:42.
 * description: Loading
 */
import React from 'react';
export const MxLoading: React.FC = () => {
  return (
    <div className={'mx-loading'}>
      <div className="com__box">
        <div className="loading">
          <div className="shape shape-4">
            <div className="shape-4-top"></div>
            <div className="shape-4-bottom"></div>
            <div className="shape-4-eye"></div>
          </div>
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </div>
  );
};
