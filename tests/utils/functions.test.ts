/**
 * Created by xun on  2022/7/2 17:10.
 * description: functions.test
 */
import { isJsonStrValid, splitValidArray } from '../../src/utils/function';
describe('Tests Utils functions', () => {
  test('isJsonStrValid valid', () => {
    expect(isJsonStrValid('{}')).toBeTruthy();
  });
  test('isJsonStrValid not valid', () => {
    expect(isJsonStrValid('--')).toBeFalsy();
  });
  test('splitValidArray By /', () => {
    expect(splitValidArray('/app/test').length).toBe(2);
  });
});
