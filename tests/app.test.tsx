/**
 * Created by xun on  2022/7/2 15:53.
 * description: app.test
 */
import './mocks/matchMedia.mock';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
describe('App', () => {
  test('renders App component', () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName('App').length).toBe(1);
  });
});
