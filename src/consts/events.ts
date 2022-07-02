/**
 * Created by xun on  2022/5/30 15:36.
 * description: events
 */
import * as EventEmitter from 'events';

export const EventCenter = new EventEmitter();
export const EVENTS_TYPE = {
  GLOBAL_SPINNING: 'GLOBAL_SPINNING',
  UPDATE_PROJECT_INFO: 'UPDATE_PROJECT_INFO',
  UPDATE_GIT_BRANCHES: 'UPDATE_GIT_BRANCHES',
  UPDATE_CODE_REVIEW: 'UPDATE_CODE_REVIEW',
  GET_EXECUTABLE_UPDATES: 'GET_EXECUTABLE_UPDATES',
  LOAD_API_DOCS_CONF: 'LOAD_API_DOCS_CONF'
};
