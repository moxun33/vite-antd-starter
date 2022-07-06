/**
 * Created By xun  on 2018-11-29 14:30.
 * Description: AsyncComponent
 */
import React, { Component } from 'react';
import { Spin } from 'antd';

interface IProps {
  v?: string;
}
interface IState {
  component: React.ClassicComponentClass | null;
}
const AsyncComponent = (importComponent: () => Promise<Record<any, any>>) => {
  // eslint-disable-next-line react/display-name
  return class extends Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);

      this.state = {
        component: null
      };
    }

    componentDidMount() {
      importComponent().then((cmp: Record<any, any>) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      //C ? <C {...this.props} /> :
      return C ? (
        <C {...this.props} />
      ) : (
        <div style={{ position: 'fixed', top: '40%', left: '50%' }}>
          {' '}
          <Spin />
        </div>
      );
    }
  };
};
export default AsyncComponent;
