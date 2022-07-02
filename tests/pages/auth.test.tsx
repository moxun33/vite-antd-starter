import '../mocks/matchMedia.mock';
import { render, screen } from '@testing-library/react';
import React from 'react';
import LoginForm from '../../src/pages/Auth/LoginForm';

/**
 * Created by xun on  2022/7/2 16:52.
 * description: auth.test
 */
describe('Auth Pages', () => {
  test('renders LoginForm component', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('用户名')).toBeInTheDocument();
  });
});
