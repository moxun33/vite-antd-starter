/**
 * Created by xun on 2021/5/7 14:32.
 * description: AdminHeaders
 */

import React, { Component } from 'react';
import { NavHeaderLayout } from '@/comps/Common/Nav/header';

export default class AdminHeaders extends Component<never, never> {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return <NavHeaderLayout wrapClassName={'admin-header-row'} />;
  }
}
